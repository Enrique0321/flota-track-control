
export interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  status: 'active' | 'maintenance' | 'inactive';
  driver?: string;
}

export interface FuelRecord {
  id: string;
  vehicleId: string;
  date: string;
  odometer: number;
  fuelAmount: number;
  fuelCost: number;
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  fullTank: boolean;
  notes?: string;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  date: string;
  odometer: number;
  type: string;
  description: string;
  cost: number;
  provider?: string;
}

export interface DashboardStats {
  totalVehicles: number;
  activeVehicles: number;
  totalKilometers: number;
  totalFuelConsumption: number;
  avgFuelEfficiency: number;
}
