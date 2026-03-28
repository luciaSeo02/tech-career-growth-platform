import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

import type { Metadata } from "next";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Career Platform",
  description:
    "Accelerate your tech career. Track applications, identify skill gaps, and get personalized recommendations.",
  keywords: ["career", "tech jobs", "skill gap", "job tracker", "developer"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${geistMono.variable}`}>
      <body
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AuthProvider>
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
