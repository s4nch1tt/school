import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import AIChatbot from "@/components/AIChatbot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "S.E.C. Railway Hr. Sec. School No. 2",
  description: "Excellence in Education. Near Bilaspur Railway Station.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <AuthProvider>
          <Header />
          <main className="min-h-[calc(100vh-theme(spacing.20))]">
            {children}
          </main>
          <AIChatbot />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
