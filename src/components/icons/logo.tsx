import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>NeonIME Logo</title>
      <path d="M4 20V4L14 15.5V20H20V4H14L4 15.5V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
