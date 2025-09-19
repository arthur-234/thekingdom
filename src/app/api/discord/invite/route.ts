import { NextRequest } from "next/server";

// GET /api/discord/invite
// Retorna contagens aproximadas de membros e online a partir de um código de convite público do Discord.
// Não requer autenticação.
export async function GET(_req: NextRequest) {
  const code = process.env.DISCORD_INVITE_CODE;
  if (!code) {
    return new Response(
      JSON.stringify({ error: "Missing DISCORD_INVITE_CODE env" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  try {
    const url = `https://discord.com/api/v10/invites/${code}?with_counts=true&with_expiration=true`;
    const res = await fetch(url, { cache: "no-store", headers: { accept: "application/json" } });
    if (!res.ok) {
      const text = await res.text();
      return new Response(
        JSON.stringify({ error: "Failed to fetch invite", status: res.status, detail: text }),
        { status: 502, headers: { "content-type": "application/json", "cache-control": "no-store" } }
      );
    }
    const data = await res.json();

    const payload = {
      approximate_member_count: data?.approximate_member_count ?? null,
      approximate_presence_count: data?.approximate_presence_count ?? null,
      guild: {
        id: data?.guild?.id ?? null,
        name: data?.guild?.name ?? null,
        description: data?.guild?.description ?? null,
      },
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Unexpected error", message: String(err?.message || err) }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}