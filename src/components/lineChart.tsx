import { CSSProperties } from "react";
import { scaleTime, scaleLinear, line as d3_line, curveMonotoneX } from "d3";

type Candidate = {
  id: number;
  name: string;
  number: string;
  votes: number;
};

type ElectionData = {
  election_id: number;
  title: string;
  election_date: string;
  status: "upcoming" | "ongoing" | "completed";
  voter_count: number;
  candidates: Candidate[];
};

type HourlyDataPoint = {
  date: string;
  value: number;
};

type HourlyElectionData = {
  type: "combined";
  general: ElectionData;
  hourly: {
    election_id: number;
    election_title: string;
    election_date: string;
    candidates: {
      [key: string]: {
        candidate_name: string;
        candidate_number: string;
        hourly_data: HourlyDataPoint[];
        total_votes: number;
      };
    };
  };
};

interface HourlyLineChartProps {
  electionData: HourlyElectionData | null;
}

export default function HourlyLineChart({
  electionData,
}: HourlyLineChartProps) {
  // Add null check
  if (!electionData || !electionData.hourly) {
    return (
      <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-center h-[400px]">
        <p className="">No Data Avaiable</p>
      </div>
    );
  }

  // Extract candidate data from the JSON structure
  const candidateEntries = Object.entries(electionData.hourly.candidates);

  // Get the first three candidates (or pad with empty arrays if less than 3)
  const candidate1 = candidateEntries[0]?.[1]?.hourly_data || [];
  const candidate2 = candidateEntries[1]?.[1]?.hourly_data || [];
  const candidate3 = candidateEntries[2]?.[1]?.hourly_data || [];

  const data = candidate1.map((d: HourlyDataPoint) => ({
    ...d,
    date: new Date(d.date),
  }));
  const data2 = candidate2.map((d: HourlyDataPoint) => ({
    ...d,
    date: new Date(d.date),
  }));
  const data3 = candidate3.map((d: HourlyDataPoint) => ({
    ...d,
    date: new Date(d.date),
  }));

  // Find the maximum value across all datasets
  const allValues = [...candidate1, ...candidate2, ...candidate3].map(
    (d: HourlyDataPoint) => d.value
  );
  const maxValue = Math.max(...allValues);

  // Add a small buffer (10%) to ensure points don't touch the top
  const yDomainMax = Math.ceil(maxValue * 1.1);

  const xScale = scaleTime()
    .domain([
      data[0]?.date || new Date(),
      data[data.length - 1]?.date || new Date(),
    ])
    .range([0, 100]);

  const yScale = scaleLinear().domain([0, yDomainMax]).range([100, 0]);

  const line = d3_line<{ date: Date; value: number }>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))
    .curve(curveMonotoneX);

  const d = line(data);
  const d2 = line(data2);
  const d3 = line(data3);

  if (!d || !d2 || !d3) {
    return null;
  }

  // Get candidate names for legend
  const candidate1Name =
    candidateEntries[0]?.[1]?.candidate_name || "Kandidat 1";
  const candidate2Name =
    candidateEntries[1]?.[1]?.candidate_name || "Kandidat 2";
  const candidate3Name =
    candidateEntries[2]?.[1]?.candidate_name || "Kandidat 3";

  return (
    <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ">
      <h2 className="text-xl font-semibold">
        Aktivitas Voting per Jam dalam 24 Jam Terakhir
      </h2>
      <p className="text-sm text-gray-500">
        Diagram garis ini merekam jumlah suara yang masuk setiap jam dalam 24
        jam terakhir.
      </p>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 ">
          <div className="h-5 w-10 bg-red-500"></div>
          <span>{candidate1Name}</span>
        </div>
        <div className="flex items-center gap-2 ">
          <div className="h-5 w-10 bg-fuchsia-500"></div>
          <span>{candidate2Name}</span>
        </div>
        <div className="flex items-center gap-2 ">
          <div className="h-5 w-10 bg-orange-500"></div>
          <span>{candidate3Name}</span>
        </div>
      </div>
      <div
        className="relative h-72 w-full"
        style={
          {
            "--marginTop": "0px",
            "--marginRight": "8px",
            "--marginBottom": "25px",
            "--marginLeft": "30px",
          } as CSSProperties
        }
      >
        {/* Y axis */}
        <div
          className="absolute inset-0
            h-[calc(100%-var(--marginTop)-var(--marginBottom))]
            w-[var(--marginLeft)]
            translate-y-[var(--marginTop)]
            overflow-visible
          "
        >
          {yScale
            .ticks(10)
            .map(yScale.tickFormat(10, "d"))
            .map((value, i) => (
              <div
                key={i}
                style={{
                  top: `${yScale(+value)}%`,
                  left: "0%",
                }}
                className="absolute text-xs tabular-nums -translate-y-1/2 text-gray-500 w-full text-right pr-2"
              >
                {value}
              </div>
            ))}
        </div>

        {/* Chart area */}
        <div
          className="absolute inset-0
            h-[calc(100%-var(--marginTop)-var(--marginBottom))]
            w-[calc(100%-var(--marginLeft)-var(--marginRight))]
            translate-x-[var(--marginLeft)]
            translate-y-[var(--marginTop)]
            overflow-visible
          "
        >
          <svg
            viewBox="0 0 100 100"
            className="overflow-visible w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {yScale
              .ticks(8)
              .map(yScale.tickFormat(8, "d"))
              .map((active, i) => (
                <g
                  transform={`translate(0,${yScale(+active)})`}
                  className="text-zinc-300 dark:text-zinc-700"
                  key={i}
                >
                  <line
                    x1={0}
                    x2={100}
                    stroke="currentColor"
                    strokeDasharray="6,5"
                    strokeWidth={0.5}
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ))}

            {/* Line */}
            <path
              d={d}
              fill="none"
              className="stroke-red-500"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Line 2 */}
            <path
              d={d2}
              fill="none"
              className="stroke-fuchsia-500"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Line 3 */}
            <path
              d={d3}
              fill="none"
              className="stroke-orange-500"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Circles 1  */}
            {data.map((d, index: number) => (
              <path
                key={index}
                d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
                vectorEffect="non-scaling-stroke"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                className="text-red-300"
              />
            ))}

            {/* Circles 2 */}
            {data2.map((d, index: number) => (
              <path
                key={index}
                d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
                vectorEffect="non-scaling-stroke"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                className="text-fuchsia-300"
              />
            ))}

            {/* Circles 3 */}
            {data3.map((d, index: number) => (
              <path
                key={index}
                d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
                vectorEffect="non-scaling-stroke"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                className="text-orange-300"
              />
            ))}
          </svg>

          <div className="translate-y-2">
            {/* X Axis - Custom formatting for hours */}
            {data.map((point, i: number) => {
              // Show more time points
              if (i % 6 !== 0 && i !== data.length - 1) return null;

              return (
                <div key={i} className="overflow-visible text-zinc-500">
                  <div
                    style={{
                      left: `${xScale(point.date)}%`,
                      top: "100%",
                      transform: `translateX(${
                        i === 0
                          ? "0%"
                          : i === data.length - 1
                          ? "-100%"
                          : "-50%"
                      })`,
                    }}
                    className="text-xs absolute"
                  >
                    {point.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
