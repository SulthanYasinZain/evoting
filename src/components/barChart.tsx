import React, { CSSProperties } from "react";
import { scaleBand, scaleLinear, max } from "d3";

const data = [
  { key: "Kandidat 1", value: 120 },
  { key: "Kandidat 2", value: 90 },
  { key: "Kandidat 3", value: 200 },
];

export function BarChartVertical() {
  const minBars = 3;
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
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Chart Title with gradient accent */}
      <div className="border-b border-gray-100 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-500"></div>
        <div className="px-4 py-3">
          <h3 className="font-medium text-gray-800 text-lg">
            Distribution by Candidate
          </h3>
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-4">
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
              .ticks(8)
              .map(yScale.tickFormat(8, "d"))
              .map((value, i) => (
                <div
                  key={i}
                  style={{
                    top: `${yScale(+value)}%`,
                  }}
                  className="absolute text-xs tabular-nums -translate-y-1/2 text-gray-500 w-full text-right pr-2"
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
                .ticks(8)
                .map(yScale.tickFormat(8, "d"))
                .map((active, i) => (
                  <g
                    transform={`translate(0,${yScale(+active)})`}
                    className="text-gray-200 dark:text-gray-700"
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
                  className="absolute overflow-visible text-gray-600"
                  style={{
                    left: `${xPosition}%`,
                    top: "100%",
                    transform: "rotate(45deg) translateX(4px) translateY(8px)",
                  }}
                >
                  <div
                    className={`absolute text-xs -translate-y-1/2 whitespace-nowrap font-medium`}
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
                  className="absolute bottom-0 bg-gradient-to-b from-purple-300 to-fuchsia-400 hover:from-purple-400 hover:to-fuchsia-500 transition-colors duration-300 shadow-sm"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
