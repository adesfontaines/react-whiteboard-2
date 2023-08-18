import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { locales } from "../i18n/settings";
import { dir } from "i18next";
import { NextAuthProvider } from "../providers/nextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whiteboard App",
  description: "React whiteboard app made by Antonin Desfontaines",
};

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <NextAuthProvider>
      <html lang={lng} dir={dir(lng)}>
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>WhiteboardCanvas</title>
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </NextAuthProvider>
  );
}
