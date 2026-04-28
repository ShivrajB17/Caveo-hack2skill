import Link from "next/link";
import { ShieldAlert, ArrowRight, Activity, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="px-6 lg:px-14 h-20 flex items-center border-b border-white/10 glass-nav">
        <Link className="flex items-center justify-center gap-2" href="#">
          <ShieldAlert className="h-8 w-8 text-red-500" />
          <span className="font-bold text-2xl tracking-tighter text-white">Caveo</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-white text-white/70 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-white text-white/70 transition-colors" href="/login">
            Staff Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-48 relative overflow-hidden flex justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black -z-10" />
          <div className="container px-4 md:px-6 text-center max-w-5xl mx-auto">
            <div className="flex flex-col items-center space-y-8">
              <Badge variant="outline" className="text-red-400 border-red-500/30 bg-red-500/10 backdrop-blur-sm px-4 py-1.5 text-sm">
                Next-Gen Crisis Communication
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white">
                Protect your guests with <span className="text-red-500 drop-shadow-sm">real-time</span> response.
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-2xl/relaxed">
                Caveo is the emergency communication hub for hospitality venues. Connect guests, staff, and management instantly when seconds matter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
                <Link href="/guest?room=204" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white rounded-full h-14 px-8 text-lg shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                    Demo Guest SOS <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10">
                    Staff Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-24 bg-zinc-950 flex justify-center border-t border-white/5">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">Enterprise-Grade Reliability</h2>
              <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">Designed for high-trust environments where every second counts.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Activity className="h-10 w-10 text-blue-500" />}
                title="Live Monitoring"
                description="Real-time dashboard updates ensure your security team sees incidents the moment they happen."
              />
              <FeatureCard 
                icon={<Clock className="h-10 w-10 text-yellow-500" />}
                title="Instant Alerts"
                description="Automated SMS notifications to key personnel via Twilio, ensuring zero delay in response."
              />
              <FeatureCard 
                icon={<Users className="h-10 w-10 text-green-500" />}
                title="Management Analytics"
                description="Track response times and incident categories to continuously improve venue safety."
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/10 bg-black flex flex-col md:flex-row justify-center text-center">
        <p className="text-sm text-zinc-500 flex items-center justify-center gap-1 w-full max-w-6xl">
          © 2026 Caveo Inc. All rights reserved. <span className="mx-2">|</span> Emergency Communication Hub
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors shadow-lg shadow-black/50">
      <div className="p-4 rounded-full bg-white/5 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  )
}

function Badge({ children, className, variant }: { children: React.ReactNode, className?: string, variant?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}>
      {children}
    </span>
  )
}
