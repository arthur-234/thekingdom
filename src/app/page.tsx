import { HeroSection } from "@/components/hero-section";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { CometCard } from "@/components/ui/comet-card";

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* Seção Sobre unificada na Home */}
      <section id="sobre" className="min-h-svh px-6 py-24 md:py-32 scroll-mt-16">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-100">
              Sobre o The Kingdom
            </h1>
            <p className="mt-4 text-neutral-300/90 leading-relaxed">
              Um servidor para jogar, conversar e fazer amigos. Partidas casuais e competitivas, salas de voz, eventos e canais temáticos por era Medieval — ambiente acolhedor e sem toxicidade.
            </p>
            <p className="mt-3 text-neutral-400 leading-relaxed">
              Comunidade aberta para todos os níveis — casual e competitivo — com foco em amizade, respeito e boa conversa. PC, console ou mobile: aqui tem lugar pra você.
            </p>
          </div>

          <div className="mx-auto">
            <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-6 bg-white dark:bg-zinc-900">
              <PixelatedCanvas
                src={"https://i.ibb.co/8D5yTgDf/ca5b096d-5c2d-4f78-b283-9b159b64bb1e-1.jpg"}
                width={400}
                height={500}
                cellSize={3}
                dotScale={0.9}
                shape="square"
                backgroundColor="#0b0b0b"
                dropoutStrength={0.4}
                interactive
                distortionStrength={3}
                distortionRadius={80}
                distortionMode="swirl"
                followSpeed={0.2}
                jitterStrength={4}
                jitterSpeed={4}
                sampleAverage
                tintColor="#FFFFFF"
                tintStrength={0.2}
                className="rounded-xl border border-neutral-800 shadow-lg"
              />
              <div className="mt-4">
                <p className="text-neutral-100 text-base">The Kingdom</p>
                <p className="text-neutral-400 text-sm">Aurora Technology Society - BDarkBR</p>
              </div>
            </BackgroundGradient>
          </div>
        </div>
      </section>

      {/* Seção Criadores */}
      <section id="criadores" className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-100">Criadores</h2>
            <p className="mt-1 text-sm text-neutral-400">Conheça os donos do servidor.</p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 justify-items-center">
            {/* Card: BDarkBR (CometCard) */}
            <CometCard className="group">
              <button
                type="button"
                className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 md:my-20 md:p-4"
                aria-label="View invite F7RA"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "none",
                  opacity: 1,
                }}
              >
                <div className="mx-2 flex-1">
                  <div className="relative mt-2 aspect-[3/4] w-full">
                    <img
                      loading="lazy"
                      className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75 saturate-0 transition-all duration-300 ease-out group-hover:saturate-100 group-hover:contrast-100"
                      alt="Invite background"
                      src={"https://i.ibb.co/XkW6VTpN/assets-task-01jzx0v4m8e8svz9b1d6jmtehr-1752246986-img-1.webp"}
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                        opacity: 1,
                      }}
                    />
                    {/* Nome centralizado sobre a imagem */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-white text-sm md:text-base drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)]">BDarkBR</span>
                    </div>
                  </div>
                </div>
                {/* Descrição na base do card */}
                <div className="mt-2 flex flex-shrink-0 items-center justify-center p-4 font-mono">
                  <div className="text-xs text-gray-300 opacity-80 text-center">Em um mundo de possibilidades, você é a chave para desvendar o futuro.</div>
                </div>
              </button>
            </CometCard>

            {/* Card: Verdantfe (CometCard) */}
            <CometCard className="group">
              <button
                type="button"
                className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 md:my-20 md:p-4"
                aria-label="View invite F7RA"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "none",
                  opacity: 1,
                }}
              >
                <div className="mx-2 flex-1">
                  <div className="relative mt-2 aspect-[3/4] w-full">
                    <img
                      loading="lazy"
                      className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75 saturate-0 transition-all duration-300 ease-out group-hover:saturate-100 group-hover:contrast-100"
                      alt="Invite background"
                      src={"https://i.ibb.co/Q3jsBMxk/470986237-18137926804371369-1150390996611522281-n-1.jpg"}
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                        opacity: 1,
                      }}
                    />
                    {/* Nome centralizado sobre a imagem */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-white text-sm md:text-base drop-shadow-[0_1px_6px_rgba(0,0,0,0.75)]">Verdantfe</span>
                    </div>
                  </div>
                </div>
                {/* Descrição na base do card */}
                <div className="mt-2 flex flex-shrink-0 items-center justify-center p-4 font-mono">
                  <div className="text-xs text-gray-300 opacity-80 text-center">Tudo é possível se você acreditar que é possível.</div>
                </div>
              </button>
            </CometCard>
          </div>
        </div>
      </section>
    </main>
  );
}
