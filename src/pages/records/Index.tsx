
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockFuelRecords, mockVehicles } from "@/lib/mock-data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecordsPage() {
  const navigate = useNavigate();
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Obtener placa de vehículo por ID
  const getVehiclePlate = (vehicleId: string) => {
    const vehicle = mockVehicles.find((v) => v.id === vehicleId);
    return vehicle ? vehicle.plate : "Desconocido";
  };

  // Obtener marca y modelo de vehículo por ID
  const getVehicleInfo = (vehicleId: string) => {
    const vehicle = mockVehicles.find((v) => v.id === vehicleId);
    return vehicle
      ? `${vehicle.brand} ${vehicle.model}`
      : "Vehículo no encontrado";
  };

  // Filtrar registros por vehículo y fechas
  const filteredRecords = mockFuelRecords.filter((record) => {
    const matchesVehicle =
      vehicleFilter === "all" || record.vehicleId === vehicleFilter;
    
    const recordDate = new Date(record.date);
    const matchesStartDate = startDate
      ? recordDate >= new Date(startDate)
      : true;
    const matchesEndDate = endDate
      ? recordDate <= new Date(endDate)
      : true;

    return matchesVehicle && matchesStartDate && matchesEndDate;
  });

  // Obtener tipo de combustible formateado
  const getFuelType = (type: string) => {
    const fuelTypes = {
      gasoline: "Gasolina",
      diesel: "Diesel",
      electric: "Eléctrico",
      hybrid: "Híbrido",
    };
    return fuelTypes[type as keyof typeof fuelTypes] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Registros de Combustible</h1>
        <Button onClick={() => navigate("/records/new")}>
          Nuevo Registro
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Vehículo</label>
              <Select
                value={vehicleFilter}
                onValueChange={setVehicleFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar vehículo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los vehículos</SelectItem>
                  {mockVehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.plate} - {vehicle.brand} {vehicle.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Fecha inicial</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Fecha final</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de registros */}
      <Card>
        <CardHeader>
          <CardTitle>Registros</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRecords.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Vehículo</TableHead>
                    <TableHead>Placa</TableHead>
                    <TableHead>Kilometraje</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Costo</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{getVehicleInfo(record.vehicleId)}</TableCell>
                      <TableCell>{getVehiclePlate(record.vehicleId)}</TableCell>
                      <TableCell>{record.odometer.toLocaleString()} km</TableCell>
                      <TableCell>{getFuelType(record.fuelType)}</TableCell>
                      <TableCell>{record.fuelAmount} L</TableCell>
                      <TableCell>${record.fuelCost.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => 
                            navigate(`/records/${record.id}/edit`)
                          }
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No se encontraron registros para los criterios de búsqueda.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
