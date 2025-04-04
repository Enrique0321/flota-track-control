
import { Button } from "@/components/ui/button";
import FuelRecordForm from "@/components/records/fuel-record-form";
import { FuelRecord } from "@/types";
import { mockVehicles } from "@/lib/mock-data";
import { useNavigate } from "react-router-dom";

export default function NewRecordPage() {
  const navigate = useNavigate();

  const handleSubmit = (data: FuelRecord) => {
    // Aquí se guardaría el registro en la base de datos
    console.log("Registro agregado:", data);
    
    // Redirigir a la página de registros
    setTimeout(() => {
      navigate("/records");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Nuevo Registro de Combustible</h1>
        <Button variant="outline" onClick={() => navigate("/records")}>
          Cancelar
        </Button>
      </div>

      <div className="bg-white rounded-md shadow p-6">
        <FuelRecordForm vehicles={mockVehicles} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
