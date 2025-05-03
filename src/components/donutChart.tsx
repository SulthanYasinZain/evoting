import React from "react";
import { pie, arc, PieArcDatum } from "d3";

type Item = { name: string; value: number };
const data: Item[] = [
  { name: "Kandidat 1", value: 120 },
  { name: "Kandidat 2", value: 90 },
  { name: "Kandidat 3", value: 200 },
];

export function EnhancedDonutChartCenterText() {
  const radius = 420; // Chart base dimensions
  const gap = 0.01; // Gap between slices
  const lightStrokeEffect = 10; // 3d light effect around the slice

  // Pie layout and arc generator
  const pieLayout = pie<Item>()
    .value((d) => d.value)
    .padAngle(gap); // Creates a gap between slices

  // Adjust innerRadius to create a donut shape
  const innerRadius = radius / 1.625;
  const arcGenerator = arc<PieArcDatum<Item>>()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .cornerRadius(lightStrokeEffect + 2); // Apply rounded corners

  // Create an arc generator for the clip path that matches the outer path of the arc
  const arcClip =
    arc<PieArcDatum<Item>>()
      .innerRadius(innerRadius + lightStrokeEffect / 2)
      .outerRadius(radius)
      .cornerRadius(lightStrokeEffect + 2) || undefined;

  const labelRadius = radius * 0.825;
  const arcLabel = arc<PieArcDatum<Item>>()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

  const arcs = pieLayout(data);

  // Calculate the angle for each slice
  function computeAngle(d: PieArcDatum<Item>) {
    return ((d.endAngle - d.startAngle) * 180) / Math.PI;
  }

  // Minimum angle to display text
  const minAngle = 20; // Adjust this value as needed

  const colors = [
    "#7e4cfe",
    "#895cfc",
    "#956bff",
    "#a37fff",
    "#b291fd",
    "#b597ff",
  ]; // add more colors if needed

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Chart Title with gradient accent */}
      <div className="border-b border-gray-100 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-500"></div>
        <div className="px-4 py-3">
          <h3 className="font-medium text-gray-800 text-lg">
            Candidate Distribution
          </h3>
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-6">
        <div className="relative">
          {/* Add a new div for centered text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className={`text-lg text-zinc-500`}>Total</p>
              <p
                className={`text-4xl transition-colors duration-300 font-bold`}
              >
                184
              </p>
            </div>
          </div>
          <svg
            viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
            className="max-w-[16rem] mx-auto overflow-visible"
          >
            {/* Add subtle drop shadow for the chart */}
            <filter
              id="chartShadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.1" />
            </filter>

            {/* Slices */}
            {arcs.map((d, i) => (
              <clipPath key={`donut-c1-clip-${i}`} id={`donut-c1-clip-${i}`}>
                <path d={arcClip(d) || undefined} />
                <linearGradient key={i} id={`donut-c1-gradient-${i}`}>
                  <stop offset="55%" stopColor={colors[i]} stopOpacity={0.95} />
                </linearGradient>
              </clipPath>
            ))}

            {/* Slices with filter for drop shadow */}
            <g filter="url(#chartShadow)">
              {arcs.map((d, i) => (
                <g key={i} clipPath={`url(#donut-c1-clip-${i})`}>
                  <path
                    fill={`url(#donut-c1-gradient-${i})`}
                    stroke="#ffffff33" // Lighter stroke for a 3D effect
                    strokeWidth={lightStrokeEffect} // Adjust stroke width for the desired effect
                    d={arcGenerator(d) || undefined}
                  />
                </g>
              ))}
            </g>

            {/* Labels with conditional rendering */}
            {arcs.map((d, i) => {
              const angle = computeAngle(d);
              const centroid = arcLabel.centroid(d);
              if (d.endAngle > Math.PI) {
                centroid[0] += 10;
                centroid[1] += 0;
              } else {
                centroid[0] -= 20;
                centroid[1] -= 0;
              }

              return (
                <g key={`label-${i}`}>
                  <g opacity={angle > minAngle ? 1 : 0}>
                    <text
                      transform={`translate(${centroid})`}
                      textAnchor="middle"
                      fontSize={38}
                    >
                      <tspan y="-0.4em" fontWeight="600" fill="#eee">
                        {d.data.name}
                      </tspan>
                      {angle > minAngle && (
                        <tspan x={0} y="0.7em" fillOpacity={0.7} fill="#eee">
                          {d.data.value.toLocaleString("en-US")}%
                        </tspan>
                      )}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
