import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface VideoInfo {
  videoId: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  qualities: string[];
  url?: string;
}

export const useVideoInfo = () => {
  return useMutation({
    mutationFn: async (url: string) => {
      const { data, error } = await supabase.functions.invoke('get-video-info', {
        body: { url },
      });

      if (error) {
        throw new Error(error.message || 'Failed to fetch video information');
      }

      return data as VideoInfo;
    },
  });
};
