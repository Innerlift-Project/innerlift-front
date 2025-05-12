import type { Metadata } from "next";
import { Sora, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from './provider';

// Load Sora font
const sora = Sora({
  variable: "--font-text",
  subsets: ["latin"],
});

// Load Bricolage Grotesque font
const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-header",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InnerLift",
  description: "InnerLift - A platform for personal growth and development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${bricolageGrotesque.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
