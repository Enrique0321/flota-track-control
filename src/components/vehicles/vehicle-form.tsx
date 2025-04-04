
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Vehicle } from "@/types";

const vehicleFormSchema = z.object({
  plate: z.string().min(5, "La placa debe tener al menos 5 caracteres"),
  brand: z.string().min(2, "La marca es obligatoria"),
  model: z.string().min(1, "El modelo es obligatorio"),
  year: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1950 && Number(val) <= new Date().getFullYear(), {
      message: `El año debe ser un número entre 1950 y ${new Date().getFullYear()}`,
    }),
  type: z.string().min(1, "El tipo de vehículo es obligatorio"),
  status: z.enum(["active", "maintenance", "inactive"]),
  driver: z.string().optional(),
});

interface VehicleFormProps {
  initialData?: Partial<Vehicle>;
  onSubmit: (data: Vehicle) => void;
}

export default function VehicleForm({ initialData, onSubmit }: VehicleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof vehicleFormSchema>>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      plate: initialData?.plate || "",
      brand: initialData?.brand || "",
      model: initialData?.model || "",
      year: initialData?.year ? String(initialData.year) : "",
      type: initialData?.type || "",
      status: initialData?.status || "active",
      driver: initialData?.driver || "",
    },
  });

  const handleSubmit = (data: z.infer<typeof vehicleFormSchema>) => {
    setIsSubmitting(true);
    try {
      // Convert year to number
      const formattedData = {
        ...data,
        year: Number(data.year),
        id: initialData?.id || crypto.randomUUID(),
      };

      onSubmit(formattedData as Vehicle);
      toast.success(initialData ? "Vehículo actualizado" : "Vehículo agregado");
    } catch (error) {
      console.error("Error al guardar vehículo:", error);
      toast.error("Error al guardar el vehículo");
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
            name="plate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placa</FormLabel>
                <FormControl>
                  <Input placeholder="ABC-1234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input placeholder="Toyota" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input placeholder="Hilux" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Año</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2023" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <Input placeholder="Pickup, Van, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="maintenance">En Mantenimiento</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="driver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conductor</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del conductor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : initialData ? "Actualizar vehículo" : "Agregar vehículo"}
        </Button>
      </form>
    </Form>
  );
}
