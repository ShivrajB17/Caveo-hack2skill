"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { DEMO_MODE } from "@/lib/demo";
import { Loader2 } from "lucide-react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEMO_MODE ? { uid: "demo-user", email: "admin@caveo.com" } as User : null);
  const [loading, setLoading] = useState(!DEMO_MODE);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (DEMO_MODE) return;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (!currentUser && pathname?.startsWith("/dashboard")) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
      </div>
    );
  }

  if (!user && pathname !== "/login" && pathname !== "/guest" && pathname !== "/") {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}
