type ImagePlaceholderProps = {
  label?: string;
  aspect?: "hero" | "product" | "wide" | "square";
  className?: string;
};

const aspectClass = {
  hero: "aspect-[4/5] md:aspect-[16/9] min-h-[70vh] md:min-h-[85vh]",
  product: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  square: "aspect-square",
};

export function ImagePlaceholder({
  label = "Image à venir",
  aspect = "product",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden bg-placeholder ${aspectClass[aspect]} ${className}`}
      aria-label={label}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(135deg, var(--hero-from) 0%, var(--placeholder) 45%, var(--hero-to) 100%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
        <span className="font-display text-sm tracking-[0.2em] uppercase text-muted">
          Lafif
        </span>
        <span className="text-xs tracking-wide text-muted/80">{label}</span>
      </div>
    </div>
  );
}
