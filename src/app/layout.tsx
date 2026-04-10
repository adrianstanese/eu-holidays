import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "European Holiday Calendar 2024-2035 | Compare 44 Countries",
  description: "Compare public holidays across 44 European countries from 2024 to 2035. Working days calculator, bridge day optimizer, team alerts, .ics export. Free tool for distributed teams.",
  keywords: "european holidays, public holidays europe, holiday calendar 2026, working days calculator, bridge days, bank holidays, distributed teams, holiday comparison",
  openGraph: {
    title: "European Holiday Calendar 2024-2035",
    description: "Compare public holidays across 44 European countries. Working days calculator, bridge day optimizer, team alerts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
