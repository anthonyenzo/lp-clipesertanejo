import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "brazhits.com.br";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const ogImage = `${protocol}://${host}/og.png`;

  return {
    title: "Pack de Clipes Sertanejos Full HD | BrazHits",
    description: "+500 clipes sertanejos em Full HD, organizados e prontos para carro, TV, PC e festas. Acesso vitalício e atualizações mensais.",
    icons: { icon: "/logo-brazhits.png", shortcut: "/logo-brazhits.png", apple: "/logo-brazhits.png" },
    openGraph: {
      title: "+500 Clipes Sertanejos em Full HD | BrazHits",
      description: "Transforme qualquer tela em um show sertanejo. Acesso vitalício, download fácil e atualizações mensais.",
      type: "website",
      locale: "pt_BR",
      images: [{ url: ogImage, width: 1736, height: 909, alt: "BrazHits — mais de 500 clipes sertanejos em Full HD" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "+500 Clipes Sertanejos em Full HD | BrazHits",
      description: "Clipes em 1080p para carro, TV, PC e festas — mesmo sem internet.",
      images: [ogImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}