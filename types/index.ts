export type UserRole = "staff" | "admin" | "manager";

export interface User {
  uid: string;
  name: string;
  role: UserRole;
  email: string;
}

export type IncidentType = "Fire" | "Medical" | "Security" | "Harassment";
export type IncidentStatus = "open" | "acknowledged" | "resolved";
export type IncidentSeverity = "high" | "medium" | "low";

export interface Incident {
  id: string;
  roomNumber: string;
  type: IncidentType;
  notes?: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  source: "guest" | "staff";
  assignedTo?: string; // staff name or uid
  createdAt: number; // timestamp
  acknowledgedAt?: number; // timestamp
  resolvedAt?: number; // timestamp
}

export interface Settings {
  hotelName: string;
  phones: string[]; // List of phone numbers to alert
}
