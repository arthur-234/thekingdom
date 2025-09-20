"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type CardItem = {
  title: string;
  src: string;
};

// Tipo específico para membros do Discord
export type DiscordMemberCard = {
  id: string;
  name: string;
  avatarUrl: string;
  status?: string;
  game?: { name: string };
};

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: CardItem;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image src={card.src} alt={card.title} className="object-cover absolute inset-0 w-full h-full" fill />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

// Componente específico para membros do Discord
export const DiscordMemberCard = React.memo(
  ({
    member,
    index,
    hovered,
    setHovered,
  }: {
    member: DiscordMemberCard;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-xl relative bg-gray-900 dark:bg-gray-800 overflow-hidden h-64 md:h-72 w-full transition-all duration-300 ease-out border border-gray-700 dark:border-gray-600",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      {/* Foto quadrada preenchendo o card */}
      <div className="relative w-full h-full">
        <Image 
          src={member.avatarUrl} 
          alt={member.name} 
          fill
          className="object-cover"
        />
        
        {/* Overlay escuro para melhor legibilidade do texto */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Status indicator */}
         {member.status && (
           <div className={cn(
             "absolute top-3 right-3 w-3 h-3 rounded-full border-2 border-white shadow-lg",
             member.status === "online" && "bg-green-500",
             member.status === "idle" && "bg-yellow-500",
             member.status === "dnd" && "bg-red-500",
             member.status === "offline" && "bg-gray-500"
           )} />
         )}
         
         {/* Conteúdo do card */}
         <div className="absolute inset-0 p-4 flex flex-col justify-end text-left">
           <h3 className="text-lg md:text-xl font-bold text-white mb-1 drop-shadow-lg">
             {member.name}
           </h3>
           
           {member.game && (
             <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-black/60 text-white backdrop-blur-sm border border-white/20 w-fit">
               🎮 {member.game.name}
             </div>
           )}
         </div>
        
        {/* Hover overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )} />
      </div>
    </div>
  )
);

DiscordMemberCard.displayName = "DiscordMemberCard";

export function FocusCards({ cards }: { cards: CardItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card key={card.title + index} card={card} index={index} hovered={hovered} setHovered={setHovered} />
      ))}
    </div>
  );
}

export function DiscordFocusCards({ members }: { members: DiscordMemberCard[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto md:px-8 w-full">
      {members.map((member, index) => (
        <DiscordMemberCard 
          key={member.id} 
          member={member} 
          index={index} 
          hovered={hovered} 
          setHovered={setHovered} 
        />
      ))}
    </div>
  );
}