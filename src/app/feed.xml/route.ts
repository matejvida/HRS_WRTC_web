import { getAllNewsPosts, generateRssFeedXml } from '@/lib/news-loader';

export const dynamic = 'error';

export async function GET() {
  const articles = getAllNewsPosts();
  const xml = generateRssFeedXml(articles);

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
