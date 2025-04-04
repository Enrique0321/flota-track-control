
import { Button } from "@/components/ui/button";
import { mockVehicles } from "@/lib/mock-data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VehicleCard from "@/components/vehicles/vehicle-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Vehicle } from "@/types";

export default function VehiclesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filtrar vehículos por término de búsqueda y estado
  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicle.driver &&
        vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || vehicle.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Vehículos</h1>
        <Button onClick={() => navigate("/vehicles/new")}>
          Agregar Vehículo
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Buscar por placa, marca, modelo..."
          className="max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="maintenance">En Mantenimiento</SelectItem>
            <SelectItem value="inactive">Inactivos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de vehículos */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVehicles.map((vehicle: Vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No se encontraron vehículos que coincidan con los criterios de búsqueda.
          </p>
        </div>
      )}
    </div>
  );
}
