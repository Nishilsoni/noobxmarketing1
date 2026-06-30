"use client";

import * as React from "react";
import Script from "next/script";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const KEY = "noobx-consent";
type Consent = "granted" | "denied";

/** Consent-gated analytics (DPDP Act / GDPR friendly).
 *  Scripts (GA4, Clarity, Meta Pixel) load ONLY after explicit consent.
 *  The banner is shown until the visitor chooses. IDs come from env vars,
 *  so everything is a no-op until those are configured. */
export function Analytics() {
  // "loading" prevents a banner flash before we've read localStorage.
  const [consent, setConsent] = React.useState<Consent | null | "loading">(
    "loading",
  );

  React.useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      setConsent(v === "granted" || v === "denied" ? (v as Consent) : null);
    } catch {
      setConsent(null);
    }
  }, []);

  function choose(v: Consent) {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* storage may be blocked — still update UI */
    }
    setConsent(v);
  }

  return (
    <>
      {consent === "granted" && <AnalyticsScripts />}

      <AnimatePresence>
        {consent === null && (
          <motion.aside
            role="dialog"
            aria-label="Cookie consent"
            aria-live="polite"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-sm"
          >
            <div className="glass-strong rounded-2xl border border-hairline-strong p-5 shadow-[0_16px_50px_-12px_rgba(0,0,0,0.75)]">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-nebula-500/15 text-nebula-300">
                  <Cookie className="size-5" aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-sm font-semibold text-white">
                    We value your privacy
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-stardust">
                    We use cookies to understand how the Noobverse is used and to
                    improve your experience. You can accept or decline analytics.
                    See our{" "}
                    <a
                      href="/privacy"
                      className="text-nebula-300 underline-offset-2 hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => choose("denied")}
                >
                  Decline
                </Button>
                <Button
                  size="sm"
                  variant="gradient"
                  className="flex-1"
                  onClick={() => choose("granted")}
                >
                  Accept
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function AnalyticsScripts() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const clarity = process.env.NEXT_PUBLIC_CLARITY_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {clarity && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarity}");
          `}
        </Script>
      )}

      {pixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixel}'); fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
