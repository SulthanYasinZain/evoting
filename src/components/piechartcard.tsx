"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Kandidat 1", value: 4000 },
  { name: "Kandidat 2", value: 3000 },
  { name: "Kandidat 3", value: 2000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function PieChartCard() {
  return (
    <div className="rounded-xl shadow-md flex justify-center items-center w-1/2 h-full">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={200}
          outerRadius={50}
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
