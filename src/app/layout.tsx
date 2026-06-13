import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ContentProvider } from "@/context/ContentContext";
import LiveEditor from "@/components/admin/LiveEditor";
import CustomStyles from "@/components/CustomStyles";
import { SITE_LANGUAGE, SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getAllContent, getAllContentForLang } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Astera Light | výklad karet, očista prostoru a intuitivní vedení",
    template: "%s | Astera Light",
  },
  description:
    "Astera Light nabízí výklady karet, očistu prostor, energetickou práci a jemné intuitivní vedení pro klidnější domov i život.",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "cs-CZ": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Astera Light | výklad karet, očista prostoru a intuitivní vedení",
    description:
      "Výklady karet, očista prostor, energetická práce a intuitivní vedení pro klidnější domov i život.",
    locale: SITE_LOCALE,
  },
  twitter: {
    card: "summary_large_image",
    title: "Astera Light | výklad karet a intuitivní vedení",
    description:
      "Jemné intuitivní vedení, výklad karet, očista prostoru a práce s energií.",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: "Výklad karet, očista prostoru, energetická práce a intuitivní vedení.",
      inLanguage: SITE_LANGUAGE,
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: "Intuitivní průvodkyně, autorka a lektorka práce s kartami",
      sameAs: [
        "https://www.facebook.com/asteralight",
        "https://www.instagram.com/asteralight",
        "https://www.youtube.com/asteralight",
      ],
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [cs, en, ua] = await Promise.all([
    getAllContent(),
    getAllContentForLang("en"),
    getAllContentForLang("ua"),
  ]);
  return (
    <html lang="cs">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="image"
          href="/optimized/uploads/astera-upload-1777542736772-d2souok25x7-662w.webp"
          media="(max-width: 640px)"
          type="image/webp"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script id="gtag-consent-init" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',wait_for_update:500});`}
        </Script>
      </head>
      <body className="min-h-screen">
        <ContentProvider initialContent={{ cs, en, ua }}>
          <CustomStyles />
          {children}
          <LiveEditor />
        </ContentProvider>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KT8C6RFM');`}
        </Script>
      </body>
    </html>
  );
}
