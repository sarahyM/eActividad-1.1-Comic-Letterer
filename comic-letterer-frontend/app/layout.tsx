import type { Metadata } from "next";
import { Bangers } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/ui/footer";
import "../styles/globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
});

export const metadata: Metadata = {
  title: "Comic Letterer Dashboard",
  description: "Manage your comic lettering projects efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bangers.variable}>
      <body>
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
