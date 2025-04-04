
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { FuelRecord, Vehicle } from "@/types";

const fuelRecordSchema = z.object({
  vehicleId: z.string().min(1, "Seleccione un vehículo"),
  date: z.string().min(1, "La fecha es obligatoria"),
  odometer: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "El kilometraje debe ser un número positivo",
  }),
  fuelAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "La cantidad de combustible debe ser un número positivo",
  }),
  fuelCost: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "El costo debe ser un número positivo o cero",
  }),
  fuelType: z.enum(["gasoline", "diesel", "electric", "hybrid"]),
  fullTank: z.boolean().default(false),
  notes: z.string().optional(),
});

interface FuelRecordFormProps {
  vehicles: Vehicle[];
  initialData?: Partial<FuelRecord>;
  onSubmit: (data: FuelRecord) => void;
  selectedVehicleId?: string;
}

export default function FuelRecordForm({
  vehicles,
  initialData,
  onSubmit,
  selectedVehicleId,
}: FuelRecordFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof fuelRecordSchema>>({
    resolver: zodResolver(fuelRecordSchema),
    defaultValues: {
      vehicleId: initialData?.vehicleId || selectedVehicleId || "",
      date: initialData?.date || new Date().toISOString().split("T")[0],
      odometer: initialData?.odometer ? String(initialData.odometer) : "",
      fuelAmount: initialData?.fuelAmount ? String(initialData.fuelAmount) : "",
      fuelCost: initialData?.fuelCost ? String(initialData.fuelCost) : "",
      fuelType: initialData?.fuelType || "gasoline",
      fullTank: initialData?.fullTank || false,
      notes: initialData?.notes || "",
    },
  });

  const handleSubmit = (data: z.infer<typeof fuelRecordSchema>) => {
    setIsSubmitting(true);
    try {
      // Convert numeric strings to numbers
      const formattedData = {
        ...data,
        odometer: Number(data.odometer),
        fuelAmount: Number(data.fuelAmount),
        fuelCost: Number(data.fuelCost),
        id: initialData?.id || crypto.randomUUID(),
      };

      onSubmit(formattedData as FuelRecord);
      toast.success(
        initialData ? "Registro actualizado" : "Registro agregado"
      );
    } catch (error) {
      console.error("Error al guardar registro:", error);
      toast.error("Error al guardar el registro");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="vehicleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehículo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!!selectedVehicleId}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un vehículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.plate} - {vehicle.brand} {vehicle.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="odometer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kilometraje</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="15000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de combustible</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo de combustible" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="gasoline">Gasolina</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Eléctrico</SelectItem>
                    <SelectItem value="hybrid">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuelAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad (litros)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="40" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuelCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costo total</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="800" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullTank"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Tanque lleno</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Observaciones adicionales"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Guardando..."
            : initialData
            ? "Actualizar registro"
            : "Agregar registro"}
        </Button>
      </form>
    </Form>
  );
}
