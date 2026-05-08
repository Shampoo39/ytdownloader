import { useState } from "react"
import { Link2, Search, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface UrlInputProps {
  onSubmit: (url: string) => void
  isLoading: boolean
}

export const UrlInput = ({ onSubmit, isLoading }: UrlInputProps) => {
  const [url, setUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url)
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
    } catch (err) {
      console.error("Failed to read clipboard:", err)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "glass-card p-2 rounded-2xl flex items-center gap-2 transition-all duration-300 focus-within:glow-red-sm max-w-2xl mx-auto w-full",
        isLoading && "opacity-70 pointer-events-none"
      )}
    >
      <div className={cn("pl-4 flex items-center text-muted-foreground")}>
        <Link2 className={cn("w-5 h-5")} />
      </div>
      
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste YouTube URL here..."
        className={cn("flex-1 bg-transparent border-none outline-none py-3 text-foreground placeholder:text-muted-foreground")}
      />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handlePaste}
        className={cn("hidden sm:inline-flex text-muted-foreground hover:text-foreground")}
      >
        Paste
      </Button>

      <Button
        type="submit"
        variant="hero"
        size="default"
        disabled={isLoading || !url.trim()}
        className={cn("rounded-xl px-6")}
      >
        {isLoading ? (
          <Loader2 className={cn("w-4 h-4 animate-spin mr-2")} />
        ) : (
          <Search className={cn("w-4 h-4 mr-2")} />
        )}
        Get Video
      </Button>
    </form>
  )
}
