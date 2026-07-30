import type { Metadata } from "next";
import { Cairo, Cormorant_Garamond, Manrope } from "next/font/google";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { LOCALE_COOKIE } from "@/lib/i18n";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const arabic = Cairo({
  variable: "--font-arabic-family",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

// Runs before hydration so the first paint already has the right
// dir/lang — avoids a visible LTR-to-RTL flash when locale is "ar".
const localeScript = `(function(){try{var m=document.cookie.match(/(?:^|; )${LOCALE_COOKIE}=([^;]*)/);var v=m&&m[1];var locale=(v==="en"||v==="ar")?v:"fr";document.documentElement.lang=locale;document.documentElement.dir=locale==="ar"?"rtl":"ltr"}catch(e){}})()`;

export const metadata: Metadata = {
  title: {
    default: "Lafif — Mode élégante au Maroc",
    template: "%s · Lafif",
  },
  description:
    "Lafif, boutique de mode modest au Maroc. Hijabs, ensembles, robes et essentials. Paiement à la livraison.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      dir="ltr"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${arabic.variable} h-full`}
    >
      <head>
        <script
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: localeScript }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <LanguageProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
