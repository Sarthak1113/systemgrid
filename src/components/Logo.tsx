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
      {/* Light Mode Logo */}
      <img
        src="/logo-light.png"
        alt="SystemGrid - Cloud Architecture & Systems Engineering Intelligence"
        width={width}
        height={height}
        decoding="async"
        fetchPriority="high"
        className="block dark:hidden h-8 w-auto object-contain"
      />
      {/* Dark Mode Logo */}
      <img
        src="/logo-dark.png"
        alt="SystemGrid - Cloud Architecture & Systems Engineering Intelligence"
        width={width}
        height={height}
        decoding="async"
        fetchPriority="high"
        className="hidden dark:block h-8 w-auto object-contain"
      />
    </div>
  );
}
