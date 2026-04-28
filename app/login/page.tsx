"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { DEMO_MODE } from "@/lib/demo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (DEMO_MODE) {
      setTimeout(() => {
        toast("Logged in (Demo Mode)", "success");
        router.push("/dashboard");
      }, 500);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast("Successfully logged in", "success");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black -z-10" />
      
      <Card className="w-full max-w-md bg-zinc-950 border-white/10 shadow-2xl">
        <CardHeader className="space-y-3 text-center relative">
          {DEMO_MODE && (
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-[10px] font-bold rounded border border-yellow-500/50">
              DEMO
            </div>
          )}
          <div className="flex justify-center mb-2">
            <ShieldAlert className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Staff Login</CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your credentials to access the secure dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md text-center">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="staff@hotel.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black border-white/10 text-white focus-visible:ring-red-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black border-white/10 text-white focus-visible:ring-red-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Log In"
              )}
            </Button>
            
            <div className="text-center text-xs text-zinc-500 pt-4">
              <p>Authorized personnel only</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
