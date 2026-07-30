import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function Logo({
  className,
  priority,
  sizes = "240px",
}: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Lafif Brand"
      width={1949}
      height={358}
      priority={priority}
      sizes={sizes}
      unoptimized
      className={className}
    />
  );
}
