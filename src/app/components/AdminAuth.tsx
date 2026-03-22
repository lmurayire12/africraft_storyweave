import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createAdminAccount, isAdminSignedIn, signInAdmin } from "../auth/adminAuth";

type AuthMode = "signin" | "signup";

export function AdminAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAdminSignedIn()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const result = signInAdmin(signInEmail.trim(), signInPassword);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate("/admin", { replace: true });
  }

  function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill all fields.");
      return;
    }

    const result = createAdminAccount({
      name: name.trim(),
      email: email.trim(),
      password,
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
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <Card className="p-6">
        <h1 className="mb-1 text-2xl font-bold text-slate-900">Admin Portal</h1>
        <p className="mb-6 text-sm text-slate-600">Sign in or create an admin account.</p>

        <div className="mb-6 grid grid-cols-2 rounded-md border border-slate-200 bg-slate-50 p-1">
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
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
              Create Account
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
