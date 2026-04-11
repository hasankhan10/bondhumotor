import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
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
  keywords: "best electric scooty near me, best electric scooty in dholahat, best electric scooty in jumainaskar, electric scooter South 24 Parganas, TARMAC electric scooty, buy electric scooter West Bengal",
  alternates: {
    canonical: "https://www.bondhumotorelectric.com"
  },
  openGraph: {
    title: "Bondhu Motor and Electric | Best Electric Scooty in Dholahat",
    description: "Official TARMAC EV showroom in Jumainaskar Hat. Find the best electric scooty near me.",
    url: "https://www.bondhumotorelectric.com",
    siteName: "Bondhu Motor and Electric",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bondhu Motor and Electric",
    description: "Official TARMAC EV showroom in Jumainaskar Hat.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness schema with explicit targeting
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Bondhu Motor and Electric",
    "url": "https://www.bondhumotorelectric.com",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScroll>
            <Navbar />
            <main className="flex-1 flex flex-col pt-24">{children}</main>
            <Footer />
            <WhatsAppButton />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
