import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function defaultAvatarIndexFromId(id: string | undefined) {
  if (!id) return 0;
  try {
    return Number(BigInt(id) % 5n);
  } catch {
    const n = parseInt(id, 10);
    return Number.isFinite(n) ? Math.abs(n) % 5 : 0;
  }
}

function buildAvatarUrl(user: any) {
  if (user?.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
  }
  // Fallback para avatar padrão 0-4 baseado no ID
  const idx = defaultAvatarIndexFromId(user?.id);
  return `https://cdn.discordapp.com/embed/avatars/${idx}.png?size=256`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const guildId = searchParams.get("guildId") || process.env.DISCORD_GUILD_ID;
  const token = process.env.DISCORD_BOT_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "DISCORD_BOT_TOKEN não configurado no ambiente" }, { status: 400 });
  }
  if (!guildId) {
    return NextResponse.json({ error: "guildId ausente. Informe via query ou defina DISCORD_GUILD_ID" }, { status: 400 });
  }

  const perPage = 1000;
  let after: string | undefined = undefined;
  const all: any[] = [];

  try {
    for (let page = 0; page < 20; page++) {
      const url = new URL(`https://discord.com/api/v10/guilds/${guildId}/members`);
      url.searchParams.set("limit", String(perPage));
      if (after) url.searchParams.set("after", after);

      const res = await fetch(url, {
        headers: {
          Authorization: `Bot ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json(
          { error: `Falha ao consultar Discord: ${res.status} ${res.statusText}`, detail: text },
          { status: res.status }
        );
      }

      const chunk = (await res.json()) as any[];
      all.push(...chunk);

      if (chunk.length < perPage) break;
      after = chunk[chunk.length - 1]?.user?.id;
      if (!after) break;
    }

    // Excluir bots e mapear
    const members = all
      .filter((m) => !m?.user?.bot)
      .map((m) => {
        const user = m?.user ?? {};
        const name = m?.nick || user?.global_name || user?.username || "Membro";
        const id = user?.id || Math.random().toString(36).slice(2);
        const avatarUrl = buildAvatarUrl(user);
        return { id, name, avatarUrl };
      });

    return NextResponse.json({ count: members.length, members });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erro desconhecido" }, { status: 500 });
  }
}