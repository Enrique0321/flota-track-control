
import VehicleForm from "@/components/vehicles/vehicle-form";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/types";
import { useNavigate } from "react-router-dom";

export default function NewVehiclePage() {
  const navigate = useNavigate();

  const handleSubmit = (data: Vehicle) => {
    // Aquí se guardaría el vehículo en la base de datos
    console.log("Vehículo agregado:", data);
    
    // Redirigir a la página de vehículos
    setTimeout(() => {
      navigate("/vehicles");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Agregar Vehículo</h1>
        <Button variant="outline" onClick={() => navigate("/vehicles")}>
          Cancelar
        </Button>
      </div>

      <div className="bg-white rounded-md shadow p-6">
        <VehicleForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
