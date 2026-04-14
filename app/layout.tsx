import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LayoutShell } from "@/components/LayoutShell";
import Script from "next/script";
import "./globals.css";


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bondhu Motor and Electric | Best Electric Scooty in Dholahat & Jumainaskar",
  description: "Find the best electric scooty near me at Bondhu Motor and Electric. We are the official TARMAC dealer in Jumainaskar Hat, South 24 Parganas. Book your test ride today!",
  applicationName: "Bondhu Motor and Electric",
  appleWebApp: {
    title: "Bondhu Motor and Electric",
    capable: true,
    statusBarStyle: "default",
  },
  keywords: "best electric scooty near me, best electric scooty in dholahat, best electric scooty in jumainaskar,best electric scooter in jumainaskar, electric scooter South 24 Parganas, TARMAC electric scooty, buy electric scooter West Bengal",
  alternates: {
    canonical: "https://bondhumotorandelectronic.netlify.app"
  },
  openGraph: {
    title: "Bondhu Motor and Electric | Best Electric Scooty in Dholahat",
    description: "Official TARMAC EV showroom in Jumainaskar Hat. Find the best electric scooty near me.",
    url: "https://bondhumotorandelectronic.netlify.app",
    siteName: "Bondhu Motor and Electric",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bondhu Motor and Electric",
    description: "Official TARMAC EV showroom in Jumainaskar Hat.",
  },
  verification: {
    google: "f5CPPUuLQaLzpOG0wgnNvBxlsg3IxKNZkyE-6H2nGRk",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Website Schema for Site Name indexing
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Bondhu Motor and Electric",
    "alternateName": ["Bondhu Motor", "Bondhu Electric"],
    "url": "https://bondhumotorandelectronic.netlify.app"
  };

  // LocalBusiness schema with explicit targeting
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Bondhu Motor and Electric",
    "url": "https://bondhumotorandelectronic.netlify.app",
    "telephone": "+916297944059",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jumainaskar Hat",
      "addressLocality": "Dholahat, South 24 Parganas",
      "addressRegion": "West Bengal",
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Su 08:00-20:00",
    "description": "Looking for the best electric scooty near me? We are the official dealer for TARMAC in Dholahat and Jumainaskar.",
    "areaServed": ["Dholahat", "Jumainaskar", "South 24 Parganas"]
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col font-body transition-colors duration-300">
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScroll>
            <LayoutShell>{children}</LayoutShell>
          </SmoothScroll>
        </ThemeProvider>
      </body>

    </html>
  );
}
