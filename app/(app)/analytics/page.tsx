"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, ShieldCheck, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Incident } from "@/types";

export default function AnalyticsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "incidents"), (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          ...d,
          createdAt: d.createdAt?.toMillis() || Date.now(),
          acknowledgedAt: d.acknowledgedAt?.toMillis(),
          resolvedAt: d.resolvedAt?.toMillis(),
        } as Incident;
      });
      setIncidents(data);
    });
    return () => unsubscribe();
  }, []);

  const todayStart = new Date().setHours(0, 0, 0, 0);
  const incidentsToday = incidents.filter(i => i.createdAt >= todayStart).length;
  
  const openCount = incidents.filter(i => i.status !== "resolved").length;
  const resolvedCount = incidents.filter(i => i.status === "resolved").length;

  const resolvedIncidents = incidents.filter(i => i.status === "resolved" && i.resolvedAt);
  const avgResponseTimeMs = resolvedIncidents.length > 0
    ? resolvedIncidents.reduce((acc, i) => acc + (i.resolvedAt! - i.createdAt), 0) / resolvedIncidents.length
    : 0;
  
  const avgMins = Math.floor(avgResponseTimeMs / 60000);
  const avgSecs = Math.floor((avgResponseTimeMs % 60000) / 1000);
  const avgResponseTimeStr = avgResponseTimeMs > 0 ? `${avgMins}m ${avgSecs}s` : "0m 0s";

  const categories = {
    Medical: incidents.filter(i => i.type === "Medical").length,
    Security: incidents.filter(i => i.type === "Security").length,
    Fire: incidents.filter(i => i.type === "Fire").length,
    Harassment: incidents.filter(i => i.type === "Harassment").length,
  };
  const totalCat = Object.values(categories).reduce((a, b) => a + b, 0);
  const getCatPercent = (val: number) => totalCat > 0 ? Math.round((val / totalCat) * 100) : 0;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Analytics</h1>
        <p className="text-zinc-400">Track and optimize incident response performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Incidents Today" value={incidentsToday.toString()} icon={<Activity className="h-4 w-4 text-blue-500" />} />
        <MetricCard title="Avg Response Time" value={avgResponseTimeStr} icon={<Clock className="h-4 w-4 text-yellow-500" />} />
        <MetricCard title="Currently Open" value={openCount.toString()} icon={<AlertTriangle className="h-4 w-4 text-red-500" />} />
        <MetricCard title="Resolved" value={resolvedCount.toString()} icon={<ShieldCheck className="h-4 w-4 text-green-500" />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-zinc-950 border-white/10">
          <CardHeader>
            <CardTitle>Response Times (Last 7 Days)</CardTitle>
            <CardDescription>Average time to resolve an incident per day.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-end justify-between pt-4 pb-2 px-2 border-b border-white/10">
              {[4, 3, 5, 2, 6, 3, 2].map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="relative w-12 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-500/50 rounded-t-md transition-all duration-300" style={{ height: `${val * 40}px` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-xs px-2 py-1 rounded text-white whitespace-nowrap">
                      {val} mins
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">Day {i + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-zinc-950 border-white/10">
          <CardHeader>
            <CardTitle>Incident Categories</CardTitle>
            <CardDescription>Breakdown by emergency type.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <CategoryBar label="Medical" value={getCatPercent(categories.Medical)} color="bg-blue-500" />
              <CategoryBar label="Security" value={getCatPercent(categories.Security)} color="bg-yellow-500" />
              <CategoryBar label="Fire" value={getCatPercent(categories.Fire)} color="bg-orange-500" />
              <CategoryBar label="Harassment" value={getCatPercent(categories.Harassment)} color="bg-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <Card className="bg-zinc-950 border-white/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  )
}

function CategoryBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-white">{label}</span>
        <span className="text-zinc-400">{value}%</span>
      </div>
      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
