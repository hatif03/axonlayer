import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { JetBrains_Mono as FontMono } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { ToastContainer } from "react-toastify";
import { cn } from "@/lib/utils";

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const pressStart2P = localFont({
  src: "../public/fonts/PressStart2P-Regular.ttf",
  variable: "--font-press-start-2p",
  display: "block",
});
export const metadata: Metadata = {
  title: "AxonLayer",
  description:
    "A decentralized advertising platform for publishers and advertisers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-mono antialiased",
          fontMono.variable,
          pressStart2P.variable,
        )}
        suppressHydrationWarning={true}
      >
        <Providers>
          {/* <Header /> */}
          <main>
            {children}
          </main>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}