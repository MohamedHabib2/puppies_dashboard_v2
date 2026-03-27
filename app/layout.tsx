"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-cyan-500/30`}>
        <div className="bg-mesh" />
        
        {/* Mobile Header */}
        <div className="md:hidden glass border-b p-4 flex items-center justify-between sticky top-0 z-40 bg-background/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-cyan-500/20 flex items-center justify-center">
              <span className="text-cyan-400 font-bold text-xs">P</span>
            </div>
            <span className="font-bold text-sm tracking-widest">PUPPIES</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex min-h-screen relative z-10">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <main className="flex-1 overflow-x-hidden p-4 md:p-8 lg:p-12">
            {children}
          </main>
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </body>
    </html>
  );
}
