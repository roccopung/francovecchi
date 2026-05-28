//@ts-nocheck

export async function GET({ url }) {
  const isProduction = url.hostname === "";

  const robots = isProduction
    ? `# robots.txt for 

User-agent: *
Allow: /

Sitemap: https:///sitemap.xml`
    : `# Disallow all crawling on preview/staging deployments

User-agent: *
Disallow: /`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
