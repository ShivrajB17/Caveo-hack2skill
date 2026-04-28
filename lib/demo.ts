export const DEMO_MODE = true;

export const mockIncidents = [
  { id: "A101", roomNumber: "204", type: "Fire", status: "open", createdAt: Date.now() - 120000 },
  { id: "A102", roomNumber: "311", type: "Medical", status: "acknowledged", createdAt: Date.now() - 300000, acknowledgedAt: Date.now() - 150000 },
  { id: "A103", roomNumber: "118", type: "Security", status: "resolved", createdAt: Date.now() - 86400000, resolvedAt: Date.now() - 80000000 }
];
