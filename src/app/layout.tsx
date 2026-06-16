import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});
import { ContentProvider } from "@/context/ContentContext";
import LiveEditorLoader from "@/components/admin/LiveEditorLoader";
import CustomStyles from "@/components/CustomStyles";
import { SITE_LANGUAGE, SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getCachedContent, getCachedContentForLang } from "@/lib/db";

export const revalidate = 3600;

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
    getCachedContent(),
    getCachedContentForLang("en"),
    getCachedContentForLang("ua"),
  ]);
  return (
    <html lang="cs" className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <link rel="preconnect" href="https://qmioor33ehuegiuc.public.blob.vercel-storage.com" />
        <link rel="preload" as="image" href="/optimized/images/astera-logo.webp" type="image/webp" />
        <link
          rel="preload"
          as="image"
          imageSrcSet="/optimized/uploads/astera-upload-1777542736772-d2souok25x7-331w.webp 331w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-480w.webp 480w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-662w.webp 662w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-828w.webp 828w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-1200w.webp 1200w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-1600w.webp 1600w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-1787w.webp 1787w"
          imageSizes="100vw"
          type="image/webp"
          fetchPriority="high"
        />
        <Script id="gtag-consent-init" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',wait_for_update:500});`}
        </Script>
      </head>
      <body className="min-h-screen">
        <ContentProvider initialContent={{ cs, en, ua }}>
          <CustomStyles />
          {children}
          <LiveEditorLoader />
        </ContentProvider>
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KT8C6RFM');`}
        </Script>
      </body>
    </html>
  );
}
