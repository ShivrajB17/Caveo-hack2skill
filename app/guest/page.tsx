"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { ShieldAlert, Flame, Stethoscope, UserX, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { DEMO_MODE, mockIncidents } from "@/lib/demo";

function GuestSOSForm() {
  const searchParams = useSearchParams();
  const room = searchParams.get("room") || "Unknown";

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEmergency = async (type: string) => {
    setSelectedType(type);
  };

  const handleSubmit = async () => {
    if (!selectedType || isSubmitting) return;
    setIsSubmitting(true);

    if (DEMO_MODE) {
      setTimeout(() => {
        mockIncidents.unshift({
          id: `DEMO-${Math.floor(Math.random() * 1000)}`,
          roomNumber: room,
          type: selectedType,
          status: "open",
          createdAt: Date.now()
        } as any);
        setIsSubmitting(false);
        setSubmitted(true);
      }, 600);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "incidents"), {
        roomNumber: room,
        type: selectedType,
        notes,
        status: "open",
        severity: "high",
        source: "guest",
        createdAt: serverTimestamp()
      });
      
      if (!DEMO_MODE) {
        fetch("/api/sms/send-alert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomNumber: room, type: selectedType, id: docRef.id })
        }).catch(console.error);
      }

      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitted(true);
      }, 50);

    } catch (error) {
      console.error(error);
      alert("Failed to submit SOS. Please try again or call the front desk.");
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in zoom-in duration-500">
        <CheckCircle2 className="h-24 w-24 text-green-500" />
        <h2 className="text-3xl font-bold text-white">Help is on the way.</h2>
        <p className="text-zinc-400 max-w-md">
          Our security team has been notified and is responding to Room {room}. Please stay safe.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter text-white">Emergency Assistance</h1>
        <p className="text-zinc-400">Room {room}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <EmergencyButton
          type="Fire"
          icon={<Flame className="h-8 w-8 mb-2" />}
          selected={selectedType === "Fire"}
          onClick={() => handleEmergency("Fire")}
          color="bg-orange-500 hover:bg-orange-600 border-orange-500"
        />
        <EmergencyButton
          type="Medical"
          icon={<Stethoscope className="h-8 w-8 mb-2" />}
          selected={selectedType === "Medical"}
          onClick={() => handleEmergency("Medical")}
          color="bg-blue-500 hover:bg-blue-600 border-blue-500"
        />
        <EmergencyButton
          type="Security"
          icon={<AlertTriangle className="h-8 w-8 mb-2" />}
          selected={selectedType === "Security"}
          onClick={() => handleEmergency("Security")}
          color="bg-yellow-500 hover:bg-yellow-600 border-yellow-500 text-black"
        />
        <EmergencyButton
          type="Harassment"
          icon={<UserX className="h-8 w-8 mb-2" />}
          selected={selectedType === "Harassment"}
          onClick={() => handleEmergency("Harassment")}
          color="bg-purple-500 hover:bg-purple-600 border-purple-500"
        />
      </div>

      <div className="space-y-4 bg-zinc-900/50 p-6 rounded-xl border border-white/5">
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-zinc-300">Additional details (optional)</Label>
          <Input
            id="notes"
            placeholder="e.g., Asthma attack, need inhaler"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-black/50 border-white/10 text-white h-12"
          />
        </div>

        <Button
          className="w-full h-14 text-lg font-bold shadow-[0_0_15px_rgba(220,38,38,0.3)] bg-red-600 hover:bg-red-700 text-white"
          disabled={!selectedType || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Sending SOS..." : "SUBMIT SOS ALERT"}
        </Button>
      </div>
    </div>
  );
}

function EmergencyButton({ type, icon, selected, onClick, color }: { type: string, icon: React.ReactNode, selected: boolean, onClick: () => void, color: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 ${selected
          ? `${color} text-white shadow-lg shadow-black/50 scale-105`
          : `bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800 hover:border-white/20 hover:text-white`
        }`}
    >
      {icon}
      <span className="font-semibold">{type}</span>
    </button>
  )
}

export default function GuestSOSPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="px-6 h-16 flex items-center border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-red-500" />
          <span className="font-bold text-xl text-white">Caveo</span>
          {DEMO_MODE && (
            <span className="ml-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-xs font-bold rounded-md border border-yellow-500/50">DEMO MODE</span>
          )}
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Suspense fallback={<div className="text-zinc-400 animate-pulse">Loading secure connection...</div>}>
          <GuestSOSForm />
        </Suspense>
      </main>
    </div>
  );
}
