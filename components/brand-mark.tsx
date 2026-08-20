import Image from "next/image";
import Link from "next/link";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

/**
 * Vector lockup, converted from logos/*.pdf. The .png lockups are retired.
 * `dark` = the indigo lockup for light grounds; `light` = the white lockup
 * for indigo grounds. Never place the indigo lockup on a dark ground.
 * Minimum width is enforced by the --logo-min-width token.
 */
export function BrandMark({
  tone = "dark",
  className,
  priority = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={copy.nav.homeLabel}
      className={cn("inline-block", className)}
    >
      <Image
        src={tone === "dark" ? "/brand/logo-dark.svg" : "/brand/logo-light.svg"}
        alt={copy.global.logoAlt}
        width={760}
        height={304}
        priority={priority}
        unoptimized
        className="h-auto w-full"
      />
    </Link>
  );
}
