"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Plus, X } from "lucide-react";

export default function SettingsPage() {
  const [hotelName, setHotelName] = useState("Grand Plaza Hotel");
  const [phones, setPhones] = useState(["+1234567890", "+0987654321"]);
  const [newPhone, setNewPhone] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addPhone = () => {
    if (newPhone && !phones.includes(newPhone)) {
      setPhones([...phones, newPhone]);
      setNewPhone("");
    }
  };

  const removePhone = (phone: string) => {
    setPhones(phones.filter(p => p !== phone));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-zinc-400">Configure your venue details and notification preferences.</p>
      </div>

      <Card className="bg-zinc-950 border-white/10">
        <CardHeader>
          <CardTitle>Venue Details</CardTitle>
          <CardDescription>Basic information about your property.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 max-w-md">
            <Label htmlFor="hotelName" className="text-zinc-300">Venue Name</Label>
            <Input 
              id="hotelName" 
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              className="bg-black border-white/10 text-white"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700 text-white">
            {saved ? <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Saved</span> : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-zinc-950 border-white/10">
        <CardHeader>
          <CardTitle>Alert Configuration</CardTitle>
          <CardDescription>Manage who receives SMS alerts via Twilio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-zinc-300">Active Alert Numbers</Label>
            <div className="space-y-2 mt-2">
              {phones.map(phone => (
                <div key={phone} className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-black max-w-md">
                  <span className="text-white font-mono">{phone}</span>
                  <button onClick={() => removePhone(phone)} className="text-zinc-500 hover:text-red-500 transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {phones.length === 0 && <p className="text-zinc-500 text-sm">No phone numbers configured.</p>}
            </div>
          </div>
          
          <div className="flex gap-2 max-w-md items-end">
            <div className="space-y-2 flex-1">
              <Label htmlFor="newPhone" className="text-zinc-300">Add New Number</Label>
              <Input 
                id="newPhone" 
                placeholder="+1 (555) 000-0000"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="bg-black border-white/10 text-white"
              />
            </div>
            <Button onClick={addPhone} variant="outline" className="border-white/10 hover:bg-white/5">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-950 border-white/10">
        <CardHeader>
          <CardTitle>Twilio API Integration</CardTitle>
          <CardDescription>
            SMS routing is handled securely via server actions. API keys are loaded from environment variables to prevent exposure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-black border border-white/5 font-mono text-xs text-zinc-400 space-y-2">
            <div>TWILIO_ACCOUNT_SID = **************</div>
            <div>TWILIO_AUTH_TOKEN = **************</div>
            <div>TWILIO_PHONE_NUMBER = **************</div>
            <div className="text-yellow-500/80 mt-2">To update these credentials, modify the .env.local file on your deployment server (e.g. Vercel dashboard).</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
