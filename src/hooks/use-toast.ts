export const useToast = () => {
  const toast = ({ title, description, variant }: { title: string, description?: string, variant?: string }) => {
    // Simple alert-based toast for this prototype
    alert(`${title}\n${description || ''}\n[Variant: ${variant || 'default'}]`);
  };

  return { toast };
};
