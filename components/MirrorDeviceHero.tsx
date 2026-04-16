"use client";

import Image from "next/image";

const sizeClass: Record<"hero" | "feature", string> = {
  hero: "min-h-[220px] h-[min(52vh,640px)] max-h-[680px]",
  feature: "min-h-[280px] h-[min(72vh,760px)] max-h-[760px]",
};

/**
 * Mise en valeur de la photo officielle : fond « studio » (bleus très doux)
 * aligné sur l’image, sans cadre crème qui ternit le rendu chrome / reflets.
 */
export default function MirrorDeviceHero({ size = "feature" }: { size?: "hero" | "feature" }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-[1.35rem] sm:rounded-[1.75rem] md:rounded-[2rem] ${sizeClass[size]}`}
    >
      {/* Cible lumineuse façon shooting produit — tons froids alignés sur la photo */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 85% 65% at 50% 28%, rgba(255, 255, 255, 0.95) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 70% 60%, rgba(186, 220, 255, 0.22) 0%, transparent 50%),
            radial-gradient(ellipse 55% 45% at 15% 75%, rgba(214, 232, 248, 0.35) 0%, transparent 45%),
            linear-gradient(165deg, #f5f9fc 0%, #eef4fa 40%, #e8f0f8 100%)
          `,
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.85),
            0 1px 0 rgba(74, 102, 133, 0.08),
            0 28px 56px -12px rgba(26, 26, 26, 0.11),
            0 12px 28px -16px rgba(30, 58, 95, 0.08)
          `,
        }}
      />
      {/* Image : maximum de surface utile, peu de marge */}
      <div className="relative z-[1] h-full w-full px-1 pb-1 pt-1 sm:px-3 sm:pb-2 sm:pt-2 md:px-5 md:pb-3 md:pt-3">
        <Image
          src="/miroir360.png"
          alt="Miroir 360° — barre télescopique et miroirs orientés pour voir toute la tête"
          fill
          sizes="(max-width: 768px) 100vw, min(1200px, 92vw)"
          className="object-contain object-center drop-shadow-[0_2px_24px_rgba(15,23,42,0.06)]"
          priority
          quality={95}
        />
      </div>
      {/* Fondu vers le fond brume du site — même famille que la photo (blanc / bleu très pâle) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-24 rounded-b-[inherit] sm:h-28"
        style={{
          background: "linear-gradient(to top, rgba(243, 246, 249, 0.98) 0%, rgba(243, 246, 249, 0.45) 48%, transparent 100%)",
        }}
      />
    </div>
  );
}
