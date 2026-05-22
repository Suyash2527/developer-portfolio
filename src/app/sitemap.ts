import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use the SITE_URL env variable if available, otherwise fallback to the firebase default domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL !== 'http://localhost:3000' 
    ? process.env.NEXT_PUBLIC_SITE_URL 
    : 'https://suyash-chaudhari.web.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ];
}
