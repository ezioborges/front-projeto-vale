import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/src/providers/QueryProvider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ConectaTalento - Plataforma de Empregabilidade Inclusiva",
  description:
    "Conectamos profissionais a empresas que valorizam diversidade e acolhimento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${plusJakarta.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
