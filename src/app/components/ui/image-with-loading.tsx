import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function ImageWithLoading({ src, alt, className, onLoad, onError }: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 ${className}`}>
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <div className="h-8 w-8 rounded bg-slate-200" />
          <span className="text-xs">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
          <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
}