
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/types";
import { useNavigate } from "react-router-dom";
import { FileText, Settings } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const navigate = useNavigate();

  const statusColors = {
    active: "bg-green-500",
    maintenance: "bg-yellow-500",
    inactive: "bg-gray-500",
  };

  const statusText = {
    active: "Activo",
    maintenance: "En Mantenimiento",
    inactive: "Inactivo",
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-flotatrack-50">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            {vehicle.brand} {vehicle.model}
          </CardTitle>
          <Badge className={statusColors[vehicle.status]}>
            {statusText[vehicle.status]}
          </Badge>
        </div>
        <p className="text-sm text-gray-500">{vehicle.plate}</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Tipo:</span>
            <span className="text-sm font-medium">{vehicle.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Año:</span>
            <span className="text-sm font-medium">{vehicle.year}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Conductor:</span>
            <span className="text-sm font-medium">{vehicle.driver || "No asignado"}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 border-t">
        <Button variant="outline" size="sm" onClick={() => navigate(`/vehicles/${vehicle.id}`)}>
          <FileText className="mr-2 h-4 w-4" /> Detalles
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}>
          <Settings className="mr-2 h-4 w-4" /> Editar
        </Button>
      </CardFooter>
    </Card>
  );
}
