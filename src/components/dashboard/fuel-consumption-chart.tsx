
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FuelConsumptionChartProps {
  data: {
    month: string;
    gasoline: number;
    diesel: number;
  }[];
}

export default function FuelConsumptionChart({ data }: FuelConsumptionChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => [`${value} litros`, "Consumo"]} />
          <Legend />
          <Bar dataKey="gasoline" name="Gasolina" fill="#0ea5e9" />
          <Bar dataKey="diesel" name="Diesel" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
