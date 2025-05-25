import React, { CSSProperties } from "react";
import { scaleBand, scaleLinear, max } from "d3";

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

type ElectionResponse = {
  data: ElectionData;
};

export function BarChartVertical({
  electionData,
}: {
  electionData: ElectionResponse;
}) {
  if (
    !electionData ||
    !electionData.data ||
    !electionData.data.candidates ||
    electionData.data.voter_count === 0
  ) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <p>No Data Avaiable</p>
      </div>
    );
  }
  console.log("Election Data:", electionData);
  const data = electionData.data.candidates.map((candidate: Candidate) => {
    return {
      key: `Kandidat ${candidate.number}`,
      value: candidate.votes,
    };
  });
  const minBars = 2;
  const filledData = [
    ...data,
    // Add empty bars to make the chart look better for small datasets
    ...Array.from({ length: Math.max(0, minBars - data.length) }, (_, i) => ({
      key: `Empty ${i + 1}`,
      value: 0,
    })),
  ];
  // Scales
  const xScale = scaleBand()
    .domain(filledData.map((d) => d.key))
    .range([0, 100])
    .padding(0.3);

  const yScale = scaleLinear()
    .domain([0, max(data.map((d) => d.value)) ?? 0])
    .range([100, 0]);

  return (
    <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ">
      <h2 className="text-xl font-semibold">Perbandingan Suara Kandidat</h2>
      <p className="text-sm text-gray-500 mb-4">
        Jumlah suara yang diperoleh masing-masing kandidat dalam pemilihan ini.
      </p>
      <div
        className="relative h-72 w-full grid"
        style={
          {
            "--marginTop": "0px",
            "--marginRight": "25px",
            "--marginBottom": "56px",
            "--marginLeft": "25px",
          } as CSSProperties
        }
      >
        {/* Y axis */}
        <div
          className="relative
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
                }}
                className="absolute text-xs tabular-nums -translate-y-1/2 text-gray-300 w-full text-right pr-2"
              >
                {value}
              </div>
            ))}
        </div>

        {/* Chart Area */}
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
              .ticks()
              .map(yScale.tickFormat(8, "d"))
              .map((active, i) => (
                <g
                  transform={`translate(0,${yScale(+active)})`}
                  className="text-gray-300/80 dark:text-gray-800/80"
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
          </svg>

          {/* X Axis (Labels) */}
          {data.map((entry, i) => {
            const xPosition = xScale(entry.key)! + xScale.bandwidth() / 2;

            return (
              <div
                key={i}
                className="absolute overflow-visible text-gray-400"
                style={{
                  left: `${xPosition}%`,
                  top: "100%",
                  transform: "rotate(45deg) translateX(4px) translateY(8px)",
                }}
              >
                <div
                  className={`absolute text-xs -translate-y-1/2 whitespace-nowrap`}
                >
                  {entry.key.slice(0, 10) +
                    (entry.key.length > 10 ? "..." : "")}
                </div>
              </div>
            );
          })}

          {/* Bars */}
          {filledData.map((d, index) => {
            const barWidth = xScale.bandwidth();
            const barHeight = yScale(0) - yScale(d.value);

            return (
              <div
                key={index}
                style={{
                  width: `${barWidth}%`,
                  height: `${barHeight}%`,
                  borderRadius: "6px 6px 0 0",
                  marginLeft: `${xScale(d.key)}%`,
                }}
                className="absolute bottom-0 bg-gradient-to-b from-red-200 to-red-300"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
