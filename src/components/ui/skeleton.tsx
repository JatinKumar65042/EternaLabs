import { cn } from "@/lib/utils"

interface SkeletonProps extends React.ComponentProps<"div"> {
  variant?: "pulse" | "shimmer";
}

function Skeleton({ className, variant = "shimmer", ...props }: SkeletonProps) {
  const baseClasses = "rounded-md bg-gray-800/50";

  const variantClasses = {
    pulse: "animate-pulse",
    shimmer: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent"
  };

  return (
    <div
      data-slot="skeleton"
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  )
}

export { Skeleton }
