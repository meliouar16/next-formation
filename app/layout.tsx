import Footer from "@/composants/layout/Footer";
import Header from "@/composants/layout/Header";
import ScrollTop from "@/composants/layout/ScrollTop";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body className={`bg-light flex flex-col min-h-dvh ${inter.className}`}>
        <Header />
        {children}
        <ScrollTop />
        <Footer />
      </body>
    </html>
  );
}
