import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 40"
      width="120"
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
        Nxmlis
        <tspan fill="hsl(var(--primary))">c</tspan>
        ore
      </text>
    </svg>
  );
}
