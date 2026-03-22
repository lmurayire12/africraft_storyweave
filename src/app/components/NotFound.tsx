import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "./ui/button";

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-slate-900">404</h1>
        <h2 className="mb-2 text-2xl font-semibold text-slate-700">Page Not Found</h2>
        <p className="mb-8 text-slate-600">The page you are looking for does not exist.</p>
        <Link to="/">
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Home className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </Link>
      </div>
    </div>
  );
}
