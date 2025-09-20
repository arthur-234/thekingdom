"use client";

import { useEffect, useMemo, useState } from "react";
import { DiscordFocusCards, DiscordMemberCard } from "@/components/ui/focus-cards";

// Removido: PixelatedCanvas

type MemberCard = {
  id: string;
  name: string;
  bio: string;
  imageDataUrl: string; // http(s) ou dataURL local
  token: string;
  createdAt: number;
  updatedAt: number;
};

// Tipo para membros do Widget do Discord
type WidgetMember = {
  id: string;
  username: string;
  avatar_url: string;
  status?: string;
  game?: { name: string };
};

// Novo: tipo vindo da API oficial de membros (sem bots)
type APIMember = {
  id: string;
  name: string;
  avatarUrl: string;
};

const STORAGE_KEY = "tk_member_cards_v1";

function loadCards(): MemberCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MemberCard[]) : [];
  } catch {
    return [];
  }
}

function saveCards(cards: MemberCard[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }
}

export default function MembrosPage() {
  const [cards, setCards] = useState<MemberCard[]>([]);
  // Membros do Widget (não vamos separar por online, só agregar no museu)
  const [widgetMembers, setWidgetMembers] = useState<WidgetMember[]>([]);
  const [loadingWidget, setLoadingWidget] = useState(true);

  // Novo: membros oficiais da guild (sem bots)
  const [apiMembers, setApiMembers] = useState<APIMember[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    setCards(loadCards());
  }, []);

  useEffect(() => {
    saveCards(cards);
  }, [cards]);

  // Buscar Widget do Discord (para agregar no "museu")
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/discord/widget", { cache: "no-store" });
        if (!res.ok) throw new Error("widget fetch failed");
        const data = await res.json();
        if (!cancelled) {
          const arr = Array.isArray(data?.members) ? (data.members as unknown[]) : [];
          const mapped: WidgetMember[] = arr.map((x) => ({
            id: String(x.id),
            username: String(x.username ?? "Usuário"),
            avatar_url: String(x.avatar_url ?? ""),
            status: x.status,
            game: x.game,
          }));
          setWidgetMembers(mapped);
        }
      } catch {
        // se falhar, seguimos apenas com os locais
      } finally {
        if (!cancelled) setLoadingWidget(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Novo: buscar TODOS os membros da The Kingdom (excluindo bots) via API oficial
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/discord/members", { cache: "no-store" });
        if (!res.ok) throw new Error("members fetch failed");
        const data = await res.json();
        const arr = Array.isArray(data?.members) ? (data.members as APIMember[]) : [];
        if (!cancelled) setApiMembers(arr);
      } catch {
        // caso falhe, o museu ficará vazio (evita mostrar dados incorretos)
      } finally {
        if (!cancelled) setLoadingMembers(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Construir cards para o "museu" combinando dados da API oficial com status do widget
  const museumCards = useMemo(() => {
    const list: DiscordMemberCard[] = apiMembers.map((m) => {
      // Buscar dados do widget para este membro (status e jogo)
      const widgetData = widgetMembers.find(w => w.id === m.id);
      
      return { 
        id: m.id, 
        name: m.name, 
        avatarUrl: m.avatarUrl,
        status: widgetData?.status,
        game: widgetData?.game
      };
    });
    // Ordenar por nome A-Z para efeito de "museu"
    list.sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }));
    return list;
  }, [apiMembers, widgetMembers]);

  return (
    <main className="min-h-svh px-6 py-8 md:py-16">
      <div className="mx-auto max-w-6xl grid gap-6">
        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-neutral-100">Museu de Membros da TK</h2>
              <p className="text-sm text-neutral-400">Todos os membros da The Kingdom (bots excluídos).</p>
            </div>
          </div>

          {/* Discord Focus Cards */}
          <div className="mt-8">
            {museumCards.length === 0 && !loadingMembers ? (
              <div className="text-neutral-400 text-sm text-center py-12">Ainda não há membros para exibir.</div>
            ) : loadingMembers ? (
              <div className="text-neutral-400 text-sm text-center py-12">Carregando membros...</div>
            ) : (
              <DiscordFocusCards members={museumCards} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}