import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <p className="text-sm text-slate-600">Loading...</p>
      </div>
    </div>
  );
}