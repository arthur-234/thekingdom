import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isAllowed(url: URL) {
  const allowedHosts = new Set(["cdn.discordapp.com", "media.discordapp.net"]);
  return allowedHosts.has(url.hostname);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = searchParams.get("u");
    if (!raw) return NextResponse.json({ error: "Missing 'u' param" }, { status: 400 });

    let target: URL;
    try {
      target = new URL(raw);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (!isAllowed(target)) {
      return NextResponse.json({ error: "Host not allowed" }, { status: 400 });
    }

    const res = await fetch(target.toString(), { cache: "no-store" });
    if (!res.ok || !res.body) {
      const text = await res.text().catch(() => "");
      return NextResponse.json({ error: `Upstream error ${res.status}`, detail: text }, { status: 502 });
    }

    const contentType = res.headers.get("content-type") || "application/octet-stream";
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Cache-Control", "public, max-age=3600");

    return new NextResponse(res.body, { headers, status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Proxy error" }, { status: 500 });
  }
}