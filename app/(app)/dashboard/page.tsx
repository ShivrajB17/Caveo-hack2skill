"use client";

import { useState, useEffect } from "react";
import { Check, Clock, AlertCircle, AlertTriangle, Flame, Stethoscope, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import { Incident, IncidentStatus } from "@/types";

import { collection, onSnapshot, doc, updateDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DEMO_MODE, mockIncidents as globalMockIncidents } from "@/lib/demo";

export default function DashboardPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("open");

  useEffect(() => {
    if (DEMO_MODE) {
      setIncidents(globalMockIncidents as Incident[]);
      const interval = setInterval(() => {
        setIncidents([...globalMockIncidents as Incident[]]);
      }, 1000);
      return () => clearInterval(interval);
    }

    const q = query(collection(db, "incidents"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
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

    const interval = setInterval(() => {
      // Force re-render for timers
      setIncidents(prev => [...prev]);
    }, 60000);
    
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: IncidentStatus) => {
    if (DEMO_MODE) {
      const incidentIndex = globalMockIncidents.findIndex(inc => inc.id === id);
      if (incidentIndex !== -1) {
        globalMockIncidents[incidentIndex].status = newStatus;
        if (newStatus === "acknowledged") (globalMockIncidents[incidentIndex] as any).acknowledgedAt = Date.now();
        if (newStatus === "resolved") (globalMockIncidents[incidentIndex] as any).resolvedAt = Date.now();
        setIncidents([...globalMockIncidents as Incident[]]);
      }
      toast(`Incident ${newStatus}`, "success");
      return;
    }

    try {
      const incidentRef = doc(db, "incidents", id);
      const updates: any = { status: newStatus };
      if (newStatus === "acknowledged") updates.acknowledgedAt = serverTimestamp();
      if (newStatus === "resolved") updates.resolvedAt = serverTimestamp();
      await updateDoc(incidentRef, updates);
      toast(`Incident ${newStatus}`, "success");
    } catch (err) {
      console.error("Failed to update status", err);
      toast("Failed to update incident status.", "error");
    }
  };

  const filteredIncidents = incidents.filter(inc => {
    if (filter === "open") return inc.status !== "resolved";
    if (filter === "resolved") return inc.status === "resolved";
    return true;
  });

  const getStatusBadge = (status: IncidentStatus) => {
    switch (status) {
      case "open": return <Badge className="bg-red-500 hover:bg-red-600 animate-pulse">Critical / Open</Badge>;
      case "acknowledged": return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Acknowledged</Badge>;
      case "resolved": return <Badge className="bg-green-500 hover:bg-green-600">Resolved</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Fire": return <Flame className="h-4 w-4 text-orange-500" />;
      case "Medical": return <Stethoscope className="h-4 w-4 text-blue-500" />;
      case "Security": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "Harassment": return <UserX className="h-4 w-4 text-purple-500" />;
      default: return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Live Dashboard</h1>
          <p className="text-zinc-400">Manage real-time guest emergencies.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={filter === "open" ? "default" : "outline"} onClick={() => setFilter("open")} className={filter === "open" ? "bg-red-600 text-white hover:bg-red-700" : ""}>
            Active
          </Button>
          <Button variant={filter === "resolved" ? "default" : "outline"} onClick={() => setFilter("resolved")}>
            Resolved
          </Button>
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
            All
          </Button>
        </div>
      </div>

      <Card className="bg-zinc-950 border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Recent Incidents</CardTitle>
          <CardDescription>Live feed of all SOS alerts across the venue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-zinc-400">Incident</TableHead>
                <TableHead className="text-zinc-400">Room</TableHead>
                <TableHead className="text-zinc-400">Type</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400">Timer</TableHead>
                <TableHead className="text-zinc-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncidents.length === 0 && (
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableCell colSpan={6} className="text-center py-8 text-zinc-500">
                    No incidents found matching your filter.
                  </TableCell>
                </TableRow>
              )}
              {filteredIncidents.map((incident) => (
                <TableRow key={incident.id} className="border-white/10 hover:bg-zinc-900/50">
                  <TableCell className="font-medium text-white">{incident.id}</TableCell>
                  <TableCell className="text-zinc-300">{incident.roomNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-zinc-300">
                      {getTypeIcon(incident.type)}
                      {incident.type}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(incident.status)}</TableCell>
                  <TableCell className="text-zinc-400">
                    {incident.status === "resolved" 
                      ? "Closed" 
                      : <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {Math.floor((Date.now() - incident.createdAt) / 60000)} mins ago</span>}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {incident.status === "open" && (
                        <Button size="sm" variant="outline" className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10" onClick={() => handleStatusUpdate(incident.id, "acknowledged")}>
                          Acknowledge
                        </Button>
                      )}
                      {incident.status !== "resolved" && (
                        <Button size="sm" variant="outline" className="border-green-500/50 text-green-500 hover:bg-green-500/10" onClick={() => handleStatusUpdate(incident.id, "resolved")}>
                          <Check className="h-4 w-4 mr-1" /> Resolve
                        </Button>
                      )}
                      {incident.status === "resolved" && (
                        <Button size="sm" variant="ghost" disabled>Archived</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
