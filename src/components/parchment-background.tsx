import React from "react"

interface ParchmentBackgroundProps {
  children: React.ReactNode
  className?: string
  minHeight?: string
}

const ParchmentBackground = React.forwardRef<HTMLDivElement, ParchmentBackgroundProps>(
  ({ children, className = "", minHeight = "min-h-[90vh]" }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative bg-[url('/ui/parchement.png')] bg-no-repeat bg-contain bg-center flex flex-col items-center ${minHeight} ${className} overflow-hidden`}
        style={{
          backgroundSize: "contain",
          backgroundPosition: "center",
          filter: "contrast(1.1) brightness(1.02)",
        }}
      >
        {children}
      </div>
    )
  },
)

ParchmentBackground.displayName = "ParchmentBackground"

export { ParchmentBackground }
