import { siteConfig } from "@/lib/site";
import { services } from "@/data/services";
import { faqs } from "@/data/faq";
import type { BlogPost } from "@/types";

const url = siteConfig.url;

/** Organization + brand identity. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url,
    logo: `${url}/icon-512.png`,
    image: `${url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    foundingDate: String(siteConfig.foundingYear),
    sameAs: Object.values(siteConfig.socials),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
  };
}

/** LocalBusiness / ProfessionalService for local SEO. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}/#localbusiness`,
    name: siteConfig.name,
    image: `${url}${siteConfig.ogImage}`,
    url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    areaServed: "Worldwide",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "187",
      bestRating: "5",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}

/** WebSite schema with sitelinks search action. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${url}/#organization` },
    inLanguage: "en-US",
  };
}

/** OfferCatalog of services. */
export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Digital Marketing Services",
    itemListElement: services.map((s, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.summary,
        provider: { "@id": `${url}/#organization` },
        serviceType: s.name,
        areaServed: "Worldwide",
      },
    })),
  };
}

/** FAQPage rich snippet. */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** BreadcrumbList for a given trail. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${url}${it.path}`,
    })),
  };
}

/** BlogPosting / Article schema for a post. */
export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@id": `${url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}/blog/${post.slug}` },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en-US",
  };
}
