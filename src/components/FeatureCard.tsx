import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export const FeatureCard = ({ icon: Icon, title, description, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "glass-card p-6 rounded-xl space-y-4 hover:border-primary/30 transition-colors duration-300",
      className
    )}>
      <div className={cn("w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center")}>
        <Icon className={cn("w-6 h-6 text-primary")} />
      </div>
      <div className={cn("space-y-2")}>
        <h3 className={cn("font-display font-semibold text-xl")}>{title}</h3>
        <p className={cn("text-muted-foreground text-sm leading-relaxed")}>
          {description}
        </p>
      </div>
    </div>
  )
}
