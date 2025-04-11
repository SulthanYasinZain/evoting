"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { hour: 0, kandidat1: 2, kandidat2: 1, kandidat3: 0 },
  { hour: 1, kandidat1: 3, kandidat2: 2, kandidat3: 1 },
  { hour: 2, kandidat1: 4, kandidat2: 2, kandidat3: 1 },
  { hour: 3, kandidat1: 5, kandidat2: 3, kandidat3: 1 },
  { hour: 4, kandidat1: 6, kandidat2: 4, kandidat3: 2 },
  { hour: 5, kandidat1: 8, kandidat2: 5, kandidat3: 3 },
  { hour: 6, kandidat1: 10, kandidat2: 7, kandidat3: 4 },
  { hour: 7, kandidat1: 12, kandidat2: 9, kandidat3: 5 },
  { hour: 8, kandidat1: 14, kandidat2: 10, kandidat3: 6 },
  { hour: 9, kandidat1: 16, kandidat2: 11, kandidat3: 7 },
  { hour: 10, kandidat1: 18, kandidat2: 12, kandidat3: 8 },
  { hour: 11, kandidat1: 20, kandidat2: 13, kandidat3: 9 },
  { hour: 12, kandidat1: 22, kandidat2: 14, kandidat3: 10 },
  { hour: 13, kandidat1: 24, kandidat2: 15, kandidat3: 11 },
  { hour: 14, kandidat1: 26, kandidat2: 16, kandidat3: 12 },
  { hour: 15, kandidat1: 28, kandidat2: 17, kandidat3: 13 },
  { hour: 16, kandidat1: 30, kandidat2: 18, kandidat3: 14 },
  { hour: 17, kandidat1: 32, kandidat2: 19, kandidat3: 15 },
  { hour: 18, kandidat1: 34, kandidat2: 20, kandidat3: 16 },
  { hour: 19, kandidat1: 36, kandidat2: 21, kandidat3: 17 },
  { hour: 20, kandidat1: 38, kandidat2: 22, kandidat3: 18 },
  { hour: 21, kandidat1: 40, kandidat2: 23, kandidat3: 19 },
  { hour: 22, kandidat1: 42, kandidat2: 24, kandidat3: 20 },
  { hour: 23, kandidat1: 44, kandidat2: 25, kandidat3: 21 },
];

export default function LineChartCard() {
  return (
    <div className="w-1/2 h-fit rounded-xl shadow-md">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis
            dataKey="hour"
            tickFormatter={(value) => (value % 6 === 0 ? value : "")}
            label={{ value: "Jam", position: "insideBottomRight", offset: -5 }}
          />

          <YAxis
            label={{ value: "Jumlah Vote", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="kandidat1"
            stroke="#0088FE"
            name="Kandidat 1"
            dot={false}
          />
          <Line
            type="basis"
            dataKey="kandidat2"
            stroke="#00C49F"
            name="Kandidat 2"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="kandidat3"
            stroke="#FFBB28"
            name="Kandidat 3"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
