import type { Metadata } from "next";
import "./globals.css";
import { ContentProvider } from "@/context/ContentContext";
import LiveEditor from "@/components/admin/LiveEditor";

export const metadata: Metadata = {
  title: "Colette Baron-Reid — Experience Your Magic",
  description:
    "Colette Baron-Reid is a bestselling author, Oracle expert, spiritual intuitive, and personal transformation thought leader.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <ContentProvider>
          {children}
          <LiveEditor />
        </ContentProvider>
      </body>
    </html>
  );
}
