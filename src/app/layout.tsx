import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import GoogleAd from '@/components/GoogleAd';

export const metadata: Metadata = {
  title: {
    default: 'NeonIME - Your Anime & Manga Universe',
    template: '%s - NeonIME',
  },
  description: 'An SEO-friendly and responsive anime and manga browsing web application, powered by the Jikan API. Discover, explore, and get recommendations for your next favorite series.',
  verification: {
    google: 'googlea5a1d26a19250148',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9187440931404634" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9187440931404634" crossOrigin="anonymous" strategy="afterInteractive" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9187440931404634"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
          <GoogleAd slot="7694311040" format="fluid" layout="in-article" />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
