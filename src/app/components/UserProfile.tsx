import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { getCurrentUser, signOutUser, isUserSignedIn } from "../auth/userAuth";

export function UserProfile() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!isUserSignedIn()) {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);

  function handleSignOut() {
    signOutUser();
    navigate("/", { replace: true });
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <Card className="p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="mb-1 text-3xl font-bold text-slate-900">My Account</h1>
            <p className="text-slate-600">{user.name}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-slate-700">Email</div>
            <div className="text-slate-900">{user.email}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-700">Phone</div>
            <div className="text-slate-900">{user.phone}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-700">Full Name</div>
            <div className="text-slate-900">{user.name}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-700">Preferred Authentication Method</div>
            <div className="text-slate-900">{user.preferredAuthMethod === "email" ? "Email" : "Phone (SMS)"}</div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Quick Links</h2>
          <div className="space-y-2">
            <Link to="/" className="block text-amber-600 hover:text-amber-700">
              Back to Marketplace
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
