import "./globals.css";
import { Nunito, Raleway } from "next/font/google";
import NavBar from "./components/NavBar";
import Providers from "./providers/providers";

export const raleway = Raleway({ subsets: ["latin"], display: "swap" });
export const nunito = Nunito({ subsets: ["latin"], display: "swap" });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
