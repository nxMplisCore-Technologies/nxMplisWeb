import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      aria-label="Anvaya Smart"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 230 40"
      width="138"
      height="24"
      {...props}
    >
      <text
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill="hsl(var(--foreground))"
        x="0"
        y="30"
      >
        Anvaya
        <tspan fill="hsl(var(--primary))"> Smart</tspan>
      </text>
    </svg>
  );
}
