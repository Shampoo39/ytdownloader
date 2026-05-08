import { useState } from "react"
import { Download, Zap, MonitorPlay, Shield } from "lucide-react"
import { UrlInput } from "@/components/UrlInput"
import { VideoPreview } from "@/components/VideoPreview"
import { FeatureCard } from "@/components/FeatureCard"
import { cn } from "@/lib/utils"
import { useVideoInfo, VideoInfo } from "@/hooks/useVideoInfo"

export default function Index() {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const videoInfoMutation = useVideoInfo()

  const handleUrlSubmit = async (url: string) => {
    try {
      setVideoInfo(null)
      const data = await videoInfoMutation.mutateAsync(url)
      setVideoInfo({ ...data, url })
    } catch (error) {
      console.error("Error fetching video info:", error)
    }
  }

  return (
    <div className={cn("min-h-screen relative overflow-hidden bg-background")}>
      {/* Ambient background glow */}
      <div className={cn("absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none")} />

      <main className={cn("max-w-4xl mx-auto px-6 py-16 sm:py-24 space-y-16 relative z-10")}>
        {/* Hero Section */}
        <section className={cn("text-center space-y-6")}>
          <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-slide-up")}>
            <Download className={cn("w-4 h-4")} />
            Free YouTube Downloader
          </div>
          
          <div className={cn("space-y-4 animate-slide-up")} style={{ animationDelay: "100ms" }}>
            <h1 className={cn("text-5xl sm:text-7xl font-display font-bold tracking-tight leading-[1.1]")}>
              Download YouTube <br />
              <span className={cn("gradient-text")}>Videos in 1080p</span>
            </h1>
            <p className={cn("text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto")}>
              Paste any YouTube link and download high-quality videos instantly. 
              No signup required, completely free to use.
            </p>
          </div>
        </section>

        {/* URL Input */}
        <section className={cn("animate-slide-up")} style={{ animationDelay: "200ms" }}>
          <UrlInput onSubmit={handleUrlSubmit} isLoading={videoInfoMutation.isPending} />
        </section>

        {/* Result or Features */}
        <section className={cn("animate-slide-up")} style={{ animationDelay: "300ms" }}>
          {videoInfo ? (
            <VideoPreview video={videoInfo} />
          ) : (
            <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 pt-8")}>
              <FeatureCard 
                icon={Zap}
                title="Lightning Fast"
                description="Download videos in seconds with our high-speed processing engine."
              />
              <FeatureCard 
                icon={MonitorPlay}
                title="Full HD Quality"
                description="Get crisp 1080p video quality for the best viewing experience."
              />
              <FeatureCard 
                icon={Shield}
                title="Safe & Secure"
                description="No ads, no malware, and your privacy is always protected."
              />
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className={cn("pt-16 border-t border-border/50 text-center space-y-4")}>
          <p className={cn("text-muted-foreground text-sm")}>
            TubeGrab © {new Date().getFullYear()} — For personal use only. Respect content creators' rights.
          </p>
        </footer>
      </main>
    </div>
  )
}
