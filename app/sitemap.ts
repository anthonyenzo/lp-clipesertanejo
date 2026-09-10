import type { MetadataRoute } from "next";
import { LAST_MODIFIED, PAGE_URL } from "@/lib/site";

export const dynamic = "force-static";

const indexedImages = [
  "hero-packs/sertanejo-2026.jpg",
  "hero-packs/classicos-sertanejos.jpg",
  "hero-packs/forro-2026.jpg",
  "hero-packs/pagodes-2026.jpg",
  "hero-packs/louvores-2026.jpg",
  "hero-packs/rock-nacional.jpg",
  "hero-packs/mpb-antigas.jpg",
  "hero-packs/rock-internacional.jpg",
  "edu-fundador-brazhits.jpg",
].map((path) => `${PAGE_URL}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: PAGE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
      images: indexedImages,
    },
  ];
}
