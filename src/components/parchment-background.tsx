import React from "react";

interface ParchmentBackgroundProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
}

const ParchmentBackground = React.forwardRef<
  HTMLDivElement,
  ParchmentBackgroundProps
>(({ children, className = "", minHeight = "min-h-[500px]" }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto ${minHeight} ${className}`}
      style={{
        height: "auto", // Allow content to determine height
      }}
    >
      {/* Parchment background image - using multiple layers for better scaling */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/ui/parchement.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%", // Stretch to fill container
          backgroundPosition: "center",
          filter: "contrast(1.1) brightness(1.02)",
        }}
      />

      {/* Content container with responsive padding that keeps content within paper boundaries */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20">
        {/* Inner content area with max width to prevent overflow */}
        <div className="w-full max-w-full h-full flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

ParchmentBackground.displayName = "ParchmentBackground";

export { ParchmentBackground };
