import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GENEXT ENGLISH SPEAKING CLASSES | Pardi, Nagpur | Mr. Roshan Sir",
  description: "Speak with confidence from day one. Nagpur's trusted Spoken English Academy near Bhawani Hospital, Pardi. Personal coaching by Mr. Roshan Sir since 2011.",
  keywords: ["English Speaking Classes Pardi Nagpur", "Spoken English Nagpur", "Roshan Sir English Nagpur", "Genext English Academy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased bg-[#0B0D13] text-slate-100 selection:bg-amber-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
