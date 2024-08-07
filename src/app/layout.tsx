import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import MainFooter from "~/components/layout/main-footer";
import MainHeader from "~/components/layout/main-header";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Notes Editor",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Readonly<Props>) {
  return (
    <html lang="en" className={`${GeistMono.variable} ${GeistSans.variable}`}>
      <body className="dark flex min-h-screen flex-col bg-background font-geist-sans text-foreground">
        <MainHeader />
        {props.children}
        <MainFooter />
      </body>
    </html>
  );
}
