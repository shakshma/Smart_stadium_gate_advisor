export type CrowdLevel = 'Low' | 'Medium' | 'High';

export interface GateData {
  id: string;
  name: string;
  crowdLevel: CrowdLevel;
  waitTime: number; // in minutes
  status: 'Open' | 'Closed';
  lastUpdate: string;
}

export interface Post {
  id: string;
  author: 'User' | 'Organizer';
  content: string;
  timestamp: string;
  role: string;
}

export const INITIAL_GATES: GateData[] = [
  { id: 'A', name: 'Gate A', crowdLevel: 'Low', waitTime: 5, status: 'Open', lastUpdate: new Date().toISOString() },
  { id: 'B', name: 'Gate B', crowdLevel: 'Medium', waitTime: 15, status: 'Open', lastUpdate: new Date().toISOString() },
  { id: 'C', name: 'Gate C', crowdLevel: 'High', waitTime: 30, status: 'Open', lastUpdate: new Date().toISOString() },
];

export function calculateBestGate(gates: GateData[]): { gate: GateData; reason: string } {
  const openGates = gates.filter(g => g.status === 'Open');
  if (openGates.length === 0) return { gate: gates[0], reason: "All gates are currently closed." };
  
  const sorted = [...openGates].sort((a, b) => a.waitTime - b.waitTime);
  const best = sorted[0];
  
  return {
    gate: best,
    reason: `Gate ${best.id} currently has the shortest wait time of approximately ${best.waitTime} minutes.`
  };
}
