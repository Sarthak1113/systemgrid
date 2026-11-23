import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = '', width = 180, height = 34 }: LogoProps) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* SystemGrid Light Mode Vector SVG Logo */}
      <img
        src="/systemgrid-logo-light.svg"
        alt="SystemGrid - Cloud Architecture & Systems Engineering Intelligence"
        width={width}
        height={height}
        className="block dark:hidden h-8 w-auto object-contain"
        fetchPriority="high"
      />
      {/* SystemGrid Dark Mode Vector SVG Logo */}
      <img
        src="/systemgrid-logo-dark.svg"
        alt="SystemGrid - Cloud Architecture & Systems Engineering Intelligence"
        width={width}
        height={height}
        className="hidden dark:block h-8 w-auto object-contain"
        fetchPriority="high"
      />
    </div>
  );
}
