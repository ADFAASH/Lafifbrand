import type { Metadata } from "next";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: "Notre histoire",
  description: "Découvrez l'histoire de Lafif, mode élégante au Maroc.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="relative">
        <ImagePlaceholder
          aspect="wide"
          label="Image — À propos de Lafif"
          className="min-h-[45vh]"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent">
          <div className="mx-auto w-full max-w-7xl px-4 pb-12 md:px-8">
            <h1 className="font-display text-5xl text-white md:text-6xl">
              Notre histoire
            </h1>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-2xl px-4 py-16 md:px-8">
        <p className="font-display text-2xl leading-relaxed text-foreground md:text-3xl">
          Lafif est née d&apos;une envie simple : offrir aux femmes au Maroc une
          mode élégante, confortable et accessible — sans compromis sur la
          qualité.
        </p>
        <div className="mt-10 space-y-5 text-sm leading-relaxed text-muted md:text-base">
          <p>
            Chaque pièce est sélectionnée pour son tombé, sa matière et sa
            polyvalence au quotidien. Des hijabs premium aux ensembles fluides,
            notre collection s&apos;adresse à celles qui veulent se sentir bien,
            tout simplement.
          </p>
          <p>
            Nous livrons partout au Maroc et proposons le paiement à la
            livraison : une expérience d&apos;achat claire, locale et de
            confiance.
          </p>
          <p>
            Remplacez ce texte par votre vraie histoire de marque lorsque vous
            serez prête. Ajoutez aussi vos photos d&apos;atelier, d&apos;équipe
            ou de boutiques dans les emplacements prévus.
          </p>
        </div>
      </article>
    </div>
  );
}
