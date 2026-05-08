import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export const useDownload = () => {
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: async ({ url, quality, title }: { url: string; quality: string, title: string }) => {
      setProgress(10); // Start
      
      const { data, error } = await supabase.functions.invoke('download-video', {
        body: { url, quality },
      });

      if (error) {
        throw new Error(error.message || 'Download failed');
      }

      setProgress(50); // Processing

      // Convert response to blob
      const blob = data; // Supabase invoke should return the body as is if not JSON
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${title.replace(/[^\w\s]/gi, '')}_${quality}.mp4`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      
      setProgress(100); // Done
      setTimeout(() => setProgress(0), 2000); // Reset progress after some time
    },
  });

  return { ...mutation, progress };
};
