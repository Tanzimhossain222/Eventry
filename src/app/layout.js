import { Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import "./globals.css";
import { dbConnect } from "@/backend/services/mongo";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventry - Event Management",
  description: "Eventry is a platform for managing events.",
};

export default async function RootLayout({ children }) {
  dbConnect();
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
