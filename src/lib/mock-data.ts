
import { Vehicle, FuelRecord, MaintenanceRecord, DashboardStats } from "@/types";

export const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    plate: "ABC-1234",
    brand: "Toyota",
    model: "Hilux",
    year: 2020,
    type: "Pickup",
    status: "active",
    driver: "Juan Pérez"
  },
  {
    id: "v2",
    plate: "XYZ-5678",
    brand: "Ford",
    model: "Transit",
    year: 2019,
    type: "Van",
    status: "active",
    driver: "María García"
  },
  {
    id: "v3",
    plate: "DEF-9012",
    brand: "Volkswagen",
    model: "Amarok",
    year: 2021,
    type: "Pickup",
    status: "maintenance",
    driver: "Carlos Rodríguez"
  },
  {
    id: "v4",
    plate: "GHI-3456",
    brand: "Nissan",
    model: "NP300",
    year: 2018,
    type: "Pickup",
    status: "active",
    driver: "Laura Sánchez"
  },
  {
    id: "v5",
    plate: "JKL-7890",
    brand: "Mercedes-Benz",
    model: "Sprinter",
    year: 2022,
    type: "Van",
    status: "inactive",
    driver: "Roberto Martínez"
  },
];

export const mockFuelRecords: FuelRecord[] = [
  {
    id: "f1",
    vehicleId: "v1",
    date: "2023-03-01",
    odometer: 15000,
    fuelAmount: 40,
    fuelCost: 800,
    fuelType: "gasoline",
    fullTank: true,
    notes: "Recarga completa"
  },
  {
    id: "f2",
    vehicleId: "v1",
    date: "2023-03-15",
    odometer: 15500,
    fuelAmount: 35,
    fuelCost: 700,
    fuelType: "gasoline",
    fullTank: true
  },
  {
    id: "f3",
    vehicleId: "v2",
    date: "2023-03-05",
    odometer: 22000,
    fuelAmount: 50,
    fuelCost: 1050,
    fuelType: "diesel",
    fullTank: true
  },
  {
    id: "f4",
    vehicleId: "v3",
    date: "2023-03-10",
    odometer: 18000,
    fuelAmount: 45,
    fuelCost: 945,
    fuelType: "diesel",
    fullTank: false,
    notes: "Recarga parcial"
  },
  {
    id: "f5",
    vehicleId: "v4",
    date: "2023-03-12",
    odometer: 30000,
    fuelAmount: 30,
    fuelCost: 600,
    fuelType: "gasoline",
    fullTank: true
  },
];

export const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: "m1",
    vehicleId: "v1",
    date: "2023-02-15",
    odometer: 14500,
    type: "Preventivo",
    description: "Cambio de aceite y filtros",
    cost: 1200,
    provider: "Taller Mecánico Central"
  },
  {
    id: "m2",
    vehicleId: "v3",
    date: "2023-03-08",
    odometer: 17800,
    type: "Correctivo",
    description: "Reparación sistema de frenos",
    cost: 3500,
    provider: "Servicio Oficial Volkswagen"
  },
];

export const mockDashboardStats: DashboardStats = {
  totalVehicles: 5,
  activeVehicles: 3,
  totalKilometers: 100500,
  totalFuelConsumption: 200,
  avgFuelEfficiency: 12.5,
};

export function getVehicle(id: string): Vehicle | undefined {
  return mockVehicles.find(v => v.id === id);
}

export function getVehicleFuelRecords(vehicleId: string): FuelRecord[] {
  return mockFuelRecords.filter(r => r.vehicleId === vehicleId);
}

export function getVehicleMaintenanceRecords(vehicleId: string): MaintenanceRecord[] {
  return mockMaintenanceRecords.filter(r => r.vehicleId === vehicleId);
}
