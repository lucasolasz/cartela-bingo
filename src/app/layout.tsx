import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bingo Card Generator 🎱 | Play Online for Free",
  description:
    "Generate your own random bingo card instantly! Click numbers to mark them and celebrate with confetti when you win. Perfect for parties and fun online games!",
  keywords: [
    "bingo",
    "bingo card generator",
    "free bingo",
    "bingo online",
    "bingo game",
    "play bingo",
    "bingo 75 numbers",
    "random bingo card",
    "printable bingo",
  ],
  openGraph: {
    title: "Bingo Card Generator 🎱 | Play Online for Free",
    description:
      "Generate random bingo cards, mark numbers, and enjoy confetti animations when you hit BINGO! Try it for free now!",
    url: "https://bingocard.ltech.app.br/",
    siteName: "Bingo Card Generator",
    images: [
      {
        url: "https://bingocard.ltech.app.br/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bingo Card Generator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bingo Card Generator 🎱 | Play Online for Free",
    description:
      "Generate a random bingo card, mark numbers and celebrate with confetti when you win!",
    images: ["https://bingocard.ltech.app.br/og-image.jpg"],
    creator: "@your_twitter",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: "Lucas Olasz", url: "https://bingocard.ltech.app.br/" }],
  category: "Games",
  metadataBase: new URL("https://bingocard.ltech.app.br/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
