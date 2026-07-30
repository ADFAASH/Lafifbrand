import type { Metadata } from "next";
import { Cairo, Cormorant_Garamond, Manrope } from "next/font/google";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";
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
const localeScript = `(function(){try{var m=document.cookie.match(/(?:^|; )${LOCALE_COOKIE}=([^;]*)/);var v=m&&m[1];var locale=(v==="en"||v==="fr"||v==="ar")?v:"ar";document.documentElement.lang=locale;document.documentElement.dir=locale==="ar"?"rtl":"ltr"}catch(e){}})()`;

export const metadata: Metadata = {
  title: {
    default: "لافيف — أناقة عصرية في المغرب",
    template: "%s · لافيف",
  },
  description:
    "لافيف، متجر أزياء محتشمة في المغرب. حجابات، أطقم، فساتين وقطع أساسية. الدفع عند الاستلام.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
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
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
