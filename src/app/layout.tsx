import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://lovesea.example.com'),
  title: "LOVE SEA | Actress & Model",
  description: "A showcase of talent, emotion, and dedication.",
  openGraph: {
    title: "LOVE SEA | Actress & Model",
    description: "A showcase of talent, emotion, and dedication.",
    type: "website",
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LOVE SEA | Actress & Model',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "LOVE SEA | Actress & Model",
    description: "A showcase of talent, emotion, and dedication.",
    images: ['/opengraph-image.jpg'],
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale || 'ja'} className={`${outfit.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans text-white" suppressHydrationWarning>
        <div className="bg-grainy" />
        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
