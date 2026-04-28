import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Caveo | Emergency Communication Hub",
  description: "Real-time crisis communication platform for hospitality venues.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans min-h-screen bg-background text-foreground antialiased selection:bg-red-500/30">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
