import { cn } from "../../../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "default" | "lg";
};

export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        variant === "outline" ? "border border-slate-300 bg-white hover:bg-slate-50" : "bg-slate-900 text-white hover:bg-slate-800",
        size === "lg" ? "h-11 px-5 text-sm" : "h-10 px-4 text-sm",
        className
      )}
      {...props}
    />
  );
}
