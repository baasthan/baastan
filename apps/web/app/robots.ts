import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  /**
   * Note: This needs to be changed while moving to any other hosting provider. This value should be available during build time
   */
  const sitemapUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/sitemap.xml`
    : "http://localhost:3000/sitemap.xml";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: sitemapUrl,
  };
}
