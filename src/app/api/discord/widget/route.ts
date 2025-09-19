import { NextRequest } from "next/server";

// GET /api/discord/widget
// Retorna o JSON público do Widget do Discord para um Guild ID.
// Importante: Ative o "Server Widget" nas configurações do servidor Discord.
export async function GET(_req: NextRequest) {
  const guildId = process.env.DISCORD_GUILD_ID;
  if (!guildId) {
    return new Response(
      JSON.stringify({ error: "Missing DISCORD_GUILD_ID env" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  try {
    const res = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`, {
      // Evita cache para refletir mudanças rapidamente
      cache: "no-store",
      headers: { "accept": "application/json" },
      // timeout curto por segurança (em ambiente edge o Next lida diferente)
      // @ts-ignore
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(
        JSON.stringify({ error: "Failed to fetch widget", status: res.status, detail: text }),
        { status: 502, headers: { "content-type": "application/json", "cache-control": "no-store" } }
      );
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "content-type": "application/json",
        // Evitar cache em CDN/Browser para maior frescor
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