"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Kandidat 1", value: 4000 },
  { name: "Kandidat 2", value: 3000 },
  { name: "Kandidat 3", value: 2000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PieChartCard() {
  return (
    <div style={{ width: 400, height: 400 }}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
