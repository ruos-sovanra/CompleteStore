
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavbarComponent from "@/Components/navbar/NavbarComponent";
import {ErrorBoundary} from "next/dist/client/components/error-boundary";
import {Suspense} from "react";
import Loading from "@/app/(user)/loading";
import Error from "@/app/(user)/error";
import FooterComponent from "@/Components/footer/FooterComponent";
import SessionWrapper from "@/app/SessionProvider";
import StoreProvider from "@/app/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'CSTAD Ecommerce',
    openGraph: {
        title: 'CSTAD Ecommerce',
        description: 'An e-commerce website is one that allows people to buy and sell physical goods, services, and digital products over the internet rather than at a brick-and-mortar location',
        images: "https://st.depositphotos.com/2021695/1972/i/450/depositphotos_19724845-stock-illustration-various-shoes.jpg"
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <SessionWrapper>
      <body className={inter.className}>
      <StoreProvider>
      <header>
        <NavbarComponent />
      </header>
      <ErrorBoundary errorComponent={Error}>
          <Suspense fallback={<Loading/>}>{children}</Suspense>
      </ErrorBoundary>
      </StoreProvider>
      <footer>
          <FooterComponent />
      </footer>
      </body>
        </SessionWrapper>
    </html>
  );
}
