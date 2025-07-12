import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  /**
   * Note: This needs to be changed while moving to any other hosting provider. This value should be available during build time
   */
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

  return [
    {
      url: baseUrl,
      changeFrequency: "daily",
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "daily",
      lastModified: new Date().toISOString(),
      priority: 1,
    },
  ];
}
