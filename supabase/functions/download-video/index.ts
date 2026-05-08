import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import ytdl from "npm:ytdl-core"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const downloadSchema = z.object({
  url: z.string().regex(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/),
  quality: z.enum(['1080p', '720p', '480p', '360p'])
})

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  try {
    const { url, quality } = await req.json()
    const validation = downloadSchema.safeParse({ url, quality })
    
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid request parameters' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const info = await ytdl.getInfo(url)
    const format = ytdl.chooseFormat(info.formats, { 
      quality: 'highestvideo',
      filter: (f) => f.container === 'mp4' && f.height === parseInt(quality)
    }) || ytdl.chooseFormat(info.formats, { quality: 'highest' })

    const stream = ytdl(url, { format })
    const filename = `${info.videoDetails.title.replace(/[^\w\s]/gi, '')}.mp4`

    // Log the download attempt
    const { data: downloadRow, error: insertError } = await supabase
      .from('downloads')
      .insert({
        video_id: info.videoDetails.videoId,
        url,
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails[0].url,
        duration: info.videoDetails.lengthSeconds,
        quality,
        status: 'ready'
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error logging download:', insertError)
    }

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })

  } catch (error) {
    // Log the failure if we have enough info
    try {
      const { url, quality } = await req.clone().json()
      await supabase.from('downloads').insert({
        url,
        quality,
        status: 'failed'
      })
    } catch (e) {
      console.error('Failed to log error to database:', e)
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
