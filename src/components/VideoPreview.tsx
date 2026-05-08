import { useState } from "react"
import { Clock, Eye, Download } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface VideoInfo {
  title: string
  thumbnail: string
  duration: string
  views: string
  qualities: string[]
}

interface VideoPreviewProps {
  video: VideoInfo
}

export const VideoPreview = ({ video }: VideoPreviewProps) => {
  const [selectedQuality, setSelectedQuality] = useState(video.qualities[0])

  return (
    <div className={cn("glass-card rounded-2xl overflow-hidden animate-slide-up max-w-2xl mx-auto w-full")}>
      <div className={cn("relative aspect-video w-full group")}>
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className={cn("w-full h-full object-cover")}
        />
        <div className={cn("absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-xs flex items-center gap-1 font-medium")}>
          <Clock className={cn("w-3 h-3")} />
          {video.duration}
        </div>
      </div>

      <div className={cn("p-6 space-y-6")}>
        <div className={cn("space-y-2")}>
          <h2 className={cn("font-display font-semibold text-2xl line-clamp-2 leading-tight")}>
            {video.title}
          </h2>
          <div className={cn("flex items-center gap-2 text-muted-foreground text-sm")}>
            <Eye className={cn("w-4 h-4")} />
            {video.views} views
          </div>
        </div>

        <div className={cn("space-y-3")}>
          <p className={cn("text-sm font-medium text-muted-foreground uppercase tracking-wider")}>Select Quality</p>
          <div className={cn("flex flex-wrap gap-2")}>
            {video.qualities.map((quality) => (
              <button
                key={quality}
                onClick={() => setSelectedQuality(quality)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  selectedQuality === quality
                    ? "bg-primary text-primary-foreground glow-red-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {quality}
              </button>
            ))}
          </div>
        </div>

        <Button 
          variant="hero" 
          size="hero" 
          className={cn("w-full group")}
        >
          <Download className={cn("w-5 h-5 mr-2 group-hover:translate-y-0.5 transition-transform")} />
          Download {selectedQuality}
        </Button>
      </div>
    </div>
  )
}
