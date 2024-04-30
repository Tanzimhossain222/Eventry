import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventry - Event Management",
  description: "Eventry is a platform for managing events.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
