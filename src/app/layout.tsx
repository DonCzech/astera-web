import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ContentProvider } from "@/context/ContentContext";
import LiveEditor from "@/components/admin/LiveEditor";
import CustomStyles from "@/components/CustomStyles";

const BASE = "https://asteralight.cz";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: "Colette Baron-Reid — Experience Your Magic",
  description:
    "Colette Baron-Reid is a bestselling author, Oracle expert, spiritual intuitive, and personal transformation thought leader.",
  alternates: {
    canonical: BASE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: BASE,
    siteName: "Colette Baron-Reid",
    title: "Colette Baron-Reid — Experience Your Magic",
    description:
      "Colette Baron-Reid is a bestselling author, Oracle expert, spiritual intuitive, and personal transformation thought leader.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Colette Baron-Reid — Experience Your Magic",
    description:
      "Colette Baron-Reid is a bestselling author, Oracle expert, spiritual intuitive, and personal transformation thought leader.",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "Colette Baron-Reid",
      description: "Oracle expert, author and spiritual intuitive.",
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${BASE}/#person`,
      name: "Colette Baron-Reid",
      url: BASE,
      jobTitle: "Author, Oracle Expert & Spiritual Intuitive",
      sameAs: [
        "https://www.facebook.com/colettebaronreid",
        "https://www.instagram.com/colettebaronreid",
        "https://www.youtube.com/colettebaronreid",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <ContentProvider>
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
