import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QuizProvider } from "./component/QuizProvider";
import { AuthProvider } from "./component/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AuthProvider>
        <QuizProvider>
          <body className={`${inter.className} max-w-3xl mx-auto text-slate-900`}>{children}</body>
        </QuizProvider>
      </AuthProvider>
    </html>
  );
}
