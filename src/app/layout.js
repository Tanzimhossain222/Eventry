import { Inter } from "next/font/google";

import { dbConnect } from "@/backend/services/mongo";
import Navbar from "@/components/Navbar";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventry - Event Management",
  description: "Eventry is a platform for managing events.",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <div className="py-8">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
