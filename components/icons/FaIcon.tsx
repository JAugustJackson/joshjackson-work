import type { SVGProps } from "react";
import { faIcons } from "./fa-data";

export type FaIconName = keyof typeof faIcons;

type Props = Omit<SVGProps<SVGSVGElement>, "width" | "height" | "viewBox"> & {
  icon: FaIconName;
  /** Glyph height in px; width follows the icon's proportions. */
  size?: number;
  title?: string;
};

export function FaIcon({ icon, size = 16, title, ...rest }: Props) {
  const glyph = faIcons[icon];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${glyph.w} ${glyph.h}`}
      width={(size * glyph.w) / glyph.h}
      height={size}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {"secondary" in glyph ? <path d={glyph.secondary} opacity={0.4} /> : null}
      <path d={glyph.d} />
    </svg>
  );
}
