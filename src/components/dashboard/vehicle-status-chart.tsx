
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface VehicleStatusChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export default function VehicleStatusChart({ data }: VehicleStatusChartProps) {
  const COLORS = ["#0284c7", "#ef4444", "#a3a3a3"];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} vehículos`, "Cantidad"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
