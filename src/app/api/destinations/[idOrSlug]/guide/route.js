export const dynamic = 'force-dynamic';
export const revalidate = 0;

const sanitizeFileName = (value = 'destination-guide.pdf') =>
  String(value)
    .trim()
    .replace(/[^\w.\-()+@ ]/g, '_') || 'destination-guide.pdf';

export async function GET(_request, { params }) {
  const resolvedParams = await params;
  const idOrSlug = String(resolvedParams.idOrSlug || '').trim();

  if (!idOrSlug) {
    return Response.json({ message: 'Destination not found' }, { status: 404 });
  }

  const apiBase = String(process.env.API_URL || '').replace(/\/+$/, '');
  if (!apiBase) {
    return Response.json(
      { message: 'API base URL is not configured' },
      { status: 500 },
    );
  }

  const upstream = await fetch(
    `${apiBase}/api/destinations/${encodeURIComponent(idOrSlug)}/guide`,
    {
      cache: 'no-store',
      redirect: 'follow',
    },
  );

  if (!upstream.ok || !upstream.body) {
    return Response.json(
      { message: 'Destination guide not found' },
      { status: upstream.status || 404 },
    );
  }

  const headers = new Headers();
  headers.set(
    'Content-Type',
    upstream.headers.get('content-type') || 'application/pdf',
  );
  headers.set('Cache-Control', 'private, no-store');
  headers.set(
    'Content-Disposition',
    upstream.headers.get('content-disposition') ||
      `attachment; filename="${sanitizeFileName(`${idOrSlug}-guide.pdf`)}"`,
  );

  return new Response(upstream.body, {
    status: 200,
    headers,
  });
}
