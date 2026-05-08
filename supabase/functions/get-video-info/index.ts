import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts"
import ytdl from "npm:ytdl-core"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const urlSchema = z.object({
  url: z.string().regex(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)
})

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()
    const validation = urlSchema.safeParse({ url })
    
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid YouTube URL' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const info = await ytdl.getInfo(url)
    const videoDetails = {
      videoId: info.videoDetails.videoId,
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
      duration: Math.floor(parseInt(info.videoDetails.lengthSeconds) / 60) + ":" + (parseInt(info.videoDetails.lengthSeconds) % 60).toString().padStart(2, '0'),
      views: info.videoDetails.viewCount,
      qualities: [...new Set(info.formats.filter(f => f.hasVideo && f.height).map(f => f.height + 'p'))].sort((a, b) => parseInt(b) - parseInt(a))
    }

    return new Response(
      JSON.stringify(videoDetails),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
