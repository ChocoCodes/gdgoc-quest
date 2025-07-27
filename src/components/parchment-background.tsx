import type React from "react";

interface ParchmentBackgroundProps {
  children: React.ReactNode;
  className?: string;
  minHeight?: string; // Optional prop for min-height, defaults to 'min-h-[90vh]'
}

const ParchmentBackground = ({
  children,
  className = "",
  minHeight = "min-h-[90vh]",
}: ParchmentBackgroundProps) => {
  return (
    <div
      className={`relative bg-[url('/ui/parchement.png')] bg-no-repeat bg-contain bg-center flex flex-col items-center ${minHeight} ${className}`}
      style={{
        backgroundSize: "contain",
        backgroundPosition: "center",
        filter: "contrast(1.1) brightness(1.02)",
      }}
    >
      {children}
    </div>
  );
};

export { ParchmentBackground };
