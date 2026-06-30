"use client";

import * as React from "react";
import { getCalApi } from "@calcom/embed-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const NAMESPACE = "consultation";

/** Opens a Cal.com booking popup (free Calendly alternative), themed to
 *  match the site. Falls back to opening the booking URL in a new tab when
 *  the configured link isn't a Cal.com link (e.g. Google Calendar). */
export function BookingButton({ children, ...props }: ButtonProps) {
  const { calLink, url } = siteConfig.booking;
  const useEmbed = Boolean(calLink) && url.includes("cal.com");

  React.useEffect(() => {
    if (!useEmbed) return;
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#6c63ff" },
          light: { "cal-brand": "#6c63ff" },
        },
      });
    })();
  }, [useEmbed]);

  if (useEmbed) {
    return (
      <Button
        data-cal-namespace={NAMESPACE}
        data-cal-link={calLink}
        data-cal-config={`{"layout":"month_view","theme":"dark"}`}
        {...props}
      >
        {children}
      </Button>
    );
  }

  // Fallback: open whatever scheduling link is configured.
  return (
    <Button asChild {...props}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Button>
  );
}
