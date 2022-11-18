import type { Context } from "@netlify/edge-functions";

export default async function handler(req: Request, context: Context) {
  const body = { ok: true };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
