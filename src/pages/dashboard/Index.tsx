
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/dashboard/stat-card";
import { mockDashboardStats, mockVehicles } from "@/lib/mock-data";
import VehicleStatusChart from "@/components/dashboard/vehicle-status-chart";
import FuelConsumptionChart from "@/components/dashboard/fuel-consumption-chart";
import { Car, Database, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const navigate = useNavigate();

  // Preparar datos para el gráfico de estado de vehículos
  const vehicleStatusData = [
    {
      name: "Activos",
      value: mockVehicles.filter((v) => v.status === "active").length,
      color: "#0284c7",
    },
    {
      name: "En Mantenimiento",
      value: mockVehicles.filter((v) => v.status === "maintenance").length,
      color: "#f59e0b",
    },
    {
      name: "Inactivos",
      value: mockVehicles.filter((v) => v.status === "inactive").length,
      color: "#6b7280",
    },
  ];

  // Datos de muestra para el gráfico de consumo de combustible
  const fuelConsumptionData = [
    { month: "Ene", gasoline: 320, diesel: 240 },
    { month: "Feb", gasoline: 300, diesel: 280 },
    { month: "Mar", gasoline: 340, diesel: 300 },
    { month: "Abr", gasoline: 280, diesel: 260 },
    { month: "May", gasoline: 320, diesel: 290 },
    { month: "Jun", gasoline: 360, diesel: 310 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => navigate("/vehicles/new")}>
            Agregar Vehículo
          </Button>
          <Button onClick={() => navigate("/records/new")}>
            Nuevo Registro
          </Button>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Vehículos"
          value={mockDashboardStats.totalVehicles}
          icon={<Car className="h-4 w-4" />}
          description="Flota registrada"
        />
        <StatCard
          title="Vehículos Activos"
          value={mockDashboardStats.activeVehicles}
          icon={<Database className="h-4 w-4" />}
          description="En operación"
          trend={{ value: 10, isPositive: true }}
        />
        <StatCard
          title="Kilómetros Totales"
          value={mockDashboardStats.totalKilometers.toLocaleString()}
          description="Distancia recorrida"
          trend={{ value: 5.5, isPositive: true }}
        />
        <StatCard
          title="Consumo de Combustible"
          value={`${mockDashboardStats.totalFuelConsumption} L`}
          icon={<Calendar className="h-4 w-4" />}
          description="Total consumido"
          trend={{ value: 2.3, isPositive: false }}
        />
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Estado de Vehículos</CardTitle>
          </CardHeader>
          <CardContent>
            <VehicleStatusChart data={vehicleStatusData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Consumo de Combustible</CardTitle>
          </CardHeader>
          <CardContent>
            <FuelConsumptionChart data={fuelConsumptionData} />
          </CardContent>
        </Card>
      </div>

      {/* Actividad reciente */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center border-b pb-2">
              <div className="flex-1">
                <p className="font-medium">Recarga de combustible</p>
                <p className="text-sm text-muted-foreground">
                  Vehículo: Toyota Hilux (ABC-1234)
                </p>
              </div>
              <div className="text-sm text-muted-foreground">Hoy, 10:30 AM</div>
            </div>
            <div className="flex items-center border-b pb-2">
              <div className="flex-1">
                <p className="font-medium">Mantenimiento programado</p>
                <p className="text-sm text-muted-foreground">
                  Vehículo: Ford Transit (XYZ-5678)
                </p>
              </div>
              <div className="text-sm text-muted-foreground">Ayer, 2:15 PM</div>
            </div>
            <div className="flex items-center border-b pb-2">
              <div className="flex-1">
                <p className="font-medium">Nuevo vehículo agregado</p>
                <p className="text-sm text-muted-foreground">
                  Mercedes-Benz Sprinter (JKL-7890)
                </p>
              </div>
              <div className="text-sm text-muted-foreground">20/03/2023, 9:00 AM</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
