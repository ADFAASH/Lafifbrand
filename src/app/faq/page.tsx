import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes — livraison, commandes et retours Lafif.",
};

const faqs = [
  {
    id: "commande",
    q: "Comment commander ?",
    a: "Choisissez un produit, sélectionnez la couleur et la taille, puis cliquez sur « Acheter maintenant ». Indiquez votre nom complet, adresse, ville et téléphone. Nous vous livrons au Maroc avec paiement à la réception.",
  },
  {
    id: "livraison",
    q: "Où livrez-vous ?",
    a: "Lafif livre uniquement au Maroc. Les délais varient selon la ville (généralement 1 à 4 jours ouvrés).",
  },
  {
    id: "paiement",
    q: "Quels modes de paiement acceptez-vous ?",
    a: "Paiement à la livraison (espèces) uniquement pour le moment. Aucune carte bancaire n'est demandée en ligne.",
  },
  {
    id: "retours",
    q: "Puis-je retourner un article ?",
    a: "Oui, sous conditions (article non porté, étiquettes intactes) dans les 7 jours suivant la réception. Contactez-nous pour organiser l'échange ou le retour.",
  },
  {
    id: "tailles",
    q: "Comment choisir ma taille ?",
    a: "Reportez-vous aux tailles indiquées sur chaque fiche produit (S, M, L, XL). En cas de doute, contactez-nous avec vos mensurations — nous vous conseillerons.",
  },
  {
    id: "contact",
    q: "Comment vous contacter ?",
    a: "Écrivez-nous à contact@lafif.ma ou via Instagram. Indiquez votre numéro de commande si vous en avez un.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
      <p className="text-xs tracking-[0.25em] uppercase text-muted">Aide</p>
      <h1 className="mt-2 font-display text-5xl">FAQ</h1>
      <p className="mt-4 text-muted">
        Tout ce qu&apos;il faut savoir pour commander chez Lafif.
      </p>

      <div className="mt-12 divide-y divide-border border-y border-border">
        {faqs.map((faq) => (
          <section key={faq.id} id={faq.id} className="scroll-mt-28 py-8">
            <h2 className="font-display text-2xl">{faq.q}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              {faq.a}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
