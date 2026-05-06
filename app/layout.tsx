import type { Metadata } from "next";
import { Inter, Roboto, Fira_Sans } from "next/font/google";
import "./globals.css";
import "./reset.css";
import Providers from "./providers";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ['400', '600', '700', '900']
});

export const metadata: Metadata = {
  title: "Aços Hub",
  description: "Sistema Auxiliar dos processos da Aços Vital",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className={`${robotoSans.variable} ${interSans.variable} ${firaSans.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
