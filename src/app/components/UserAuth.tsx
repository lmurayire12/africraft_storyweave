import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createUserAccount, isUserSignedIn, signInUser } from "../auth/userAuth";
import { signInAdmin, isAdminSignedIn } from "../auth/adminAuth";

type AuthMode = "signin" | "signup";

export function UserAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredAuthMethod, setPreferredAuthMethod] = useState<"email" | "phone">("email");

  useEffect(() => {
    if (isAdminSignedIn()) {
      navigate("/admin", { replace: true });
    }
    if (isUserSignedIn()) {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const email = signInEmail.trim();
    const password = signInPassword;

    // Try admin sign-in first so admin credentials route to the admin portal.
    const adminResult = signInAdmin(email, password);
    if (adminResult.ok) {
      navigate("/admin", { replace: true });
      return;
    }

    // Otherwise try user sign-in
    const result = signInUser(email, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/profile", { replace: true });
  }

  function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim() || !password.trim() || !phone.trim()) {
      setError("Please fill all fields.");
      return;
    }

    const result = createUserAccount({
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim(),
      preferredAuthMethod,
    });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setSuccess("Account created successfully. You can now sign in.");
    setMode("signin");
    setSignInEmail(email.trim());
    setSignInPassword("");
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setPreferredAuthMethod("email");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <Card className="p-6">
        <h1 className="mb-1 text-2xl font-bold text-slate-900">Welcome to AfriCraft</h1>
        <p className="mb-6 text-sm text-slate-600">Sign in or create an account to get started.</p>

        <div className="mb-6">
          <div className="grid grid-cols-2 rounded-md border border-slate-200 bg-slate-50 p-1">
            <button
              className={`rounded px-3 py-2 text-sm font-medium ${mode === "signin" ? "bg-white text-slate-900 shadow" : "text-slate-600"}`}
              onClick={() => {
                setMode("signin");
                setError("");
                setSuccess("");
              }}
              type="button"
            >
              Sign In
            </button>
            <button
              className={`rounded px-3 py-2 text-sm font-medium ${mode === "signup" ? "bg-white text-slate-900 shadow" : "text-slate-600"}`}
              onClick={() => {
                setMode("signup");
                setError("");
                setSuccess("");
              }}
              type="button"
            >
              Create Account
            </button>
          </div>

          <div className="mt-3 flex justify-center">
            <button
              onClick={() => navigate("/admin/auth")}
              className="rounded-md px-3 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50"
              type="button"
            >
              Seller account
            </button>
          </div>
        </div>

        {error && <p className="mb-4 rounded bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
        {success && <p className="mb-4 rounded bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p>}

        {mode === "signin" ? (
          <form className="space-y-3" onSubmit={handleSignIn}>
            <Input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
              Sign In
            </Button>
          </form>
        ) : (
          <form className="space-y-3" onSubmit={handleSignUp}>
            <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="tel" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="mb-3 text-sm font-medium text-slate-700">How would you like to receive authentication?</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="authMethod"
                    value="email"
                    checked={preferredAuthMethod === "email"}
                    onChange={() => setPreferredAuthMethod("email")}
                    className="h-4 w-4 cursor-pointer accent-amber-600"
                  />
                  <span className="text-sm text-slate-700">Email</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="authMethod"
                    value="phone"
                    checked={preferredAuthMethod === "phone"}
                    onChange={() => setPreferredAuthMethod("phone")}
                    className="h-4 w-4 cursor-pointer accent-amber-600"
                  />
                  <span className="text-sm text-slate-700">Phone (SMS)</span>
                </label>
              </div>
            </div>
            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
              Create Account
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
