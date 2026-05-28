//@ts-nocheck
import { client } from "$lib/sanity/client";
import groq from "groq";

// Configuration
const BASE_URL = "https://";
const STATIC_ROUTES = ["/", "/about"];

// Dynamic route queries - simplified to get only slug and lastmod data
// const DYNAMIC_ROUTES_QUERIES = {
// 	work: groq`*[_type == "project" && defined(slug.current)] {
//     "slug": slug.current,
//     "lastmod": _updatedAt,
//     "title": title
//   }`
// };

export async function GET() {
  try {
    // Fetch all dynamic route data in parallel
    // const dynamicDataPromises = Object.entries(DYNAMIC_ROUTES_QUERIES).map(
    // 	async ([routeType, query]) => {
    // 		const data = await client.fetch(query);
    // 		return { routeType, data };
    // 	}
    // );

    // const dynamicResults = await Promise.all(dynamicDataPromises);

    // Build URL entries
    const urlEntries = [
      // Static routes
      ...STATIC_ROUTES.map((route) => generateUrlXml(route)),

      // Dynamic routes
      // ...dynamicResults.flatMap(({ routeType, data }) =>
      // 	data.map((item) => generateUrlXml(`/${routeType}/${item.slug}`, item.lastmod))
      // )
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join("\n")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}

function generateUrlXml(path, lastmod = null) {
  const url = `${BASE_URL}${path}`;
  const lastmodXml = lastmod
    ? `
  <lastmod>${new Date(lastmod).toISOString()}</lastmod>`
    : "";

  return `  <url>
    <loc>${url}</loc>${lastmodXml}
  </url>`;
}
