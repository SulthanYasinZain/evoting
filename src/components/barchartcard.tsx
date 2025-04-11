"use client";

import { BarChart, Bar, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Kandidat 1", VoteKandidat1: 4000 },
  { name: "Page B", VoteKandidat2: 3000 },
  { name: "Page C", VoteKandidat3: 2000 },
];

export default function BarChartCard() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <Legend />
          <Tooltip />
          <Bar dataKey="VoteKandidat1" fill="#8884d8" />
          <Bar dataKey="VoteKandidat2" fill="#A0A0A0" />
          <Bar dataKey="VoteKandidat3" fill="#FHFHFH" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
