import { CSSProperties } from "react";
import { scaleTime, scaleLinear, line as d3_line, curveMonotoneX } from "d3";

const candidate1 = [
  { date: "2023-05-09T00:00:00", value: 5 },
  { date: "2023-05-09T01:00:00", value: 4 },
  { date: "2023-05-09T02:00:00", value: 3 },
  { date: "2023-05-09T03:00:00", value: 3 },
  { date: "2023-05-09T04:00:00", value: 5 },
  { date: "2023-05-09T05:00:00", value: 6 },
  { date: "2023-05-09T06:00:00", value: 8 },
  { date: "2023-05-09T07:00:00", value: 8 },
  { date: "2023-05-09T08:00:00", value: 10 },
  { date: "2023-05-09T09:00:00", value: 12 },
  { date: "2023-05-09T10:00:00", value: 10 },
  { date: "2023-05-09T11:00:00", value: 10 },
  { date: "2023-05-09T12:00:00", value: 10 },
  { date: "2023-05-09T13:00:00", value: 8 },
  { date: "2023-05-09T14:00:00", value: 8 },
  { date: "2023-05-09T15:00:00", value: 7 },
  { date: "2023-05-09T16:00:00", value: 7 },
  { date: "2023-05-09T17:00:00", value: 8 },
  { date: "2023-05-09T18:00:00", value: 8 },
  { date: "2023-05-09T19:00:00", value: 8 },
  { date: "2023-05-09T20:00:00", value: 6 },
  { date: "2023-05-09T21:00:00", value: 6 },
  { date: "2023-05-09T22:00:00", value: 6 },
  { date: "2023-05-09T23:00:00", value: 6 }, // Total: 180
];

const candidate2 = [
  { date: "2023-05-09T00:00:00", value: 6 },
  { date: "2023-05-09T01:00:00", value: 6 },
  { date: "2023-05-09T02:00:00", value: 6 },
  { date: "2023-05-09T03:00:00", value: 6 },
  { date: "2023-05-09T04:00:00", value: 7 },
  { date: "2023-05-09T05:00:00", value: 7 },
  { date: "2023-05-09T06:00:00", value: 10 },
  { date: "2023-05-09T07:00:00", value: 10 },
  { date: "2023-05-09T08:00:00", value: 12 },
  { date: "2023-05-09T09:00:00", value: 12 },
  { date: "2023-05-09T10:00:00", value: 12 },
  { date: "2023-05-09T11:00:00", value: 10 },
  { date: "2023-05-09T12:00:00", value: 10 },
  { date: "2023-05-09T13:00:00", value: 10 },
  { date: "2023-05-09T14:00:00", value: 10 },
  { date: "2023-05-09T15:00:00", value: 10 },
  { date: "2023-05-09T16:00:00", value: 10 },
  { date: "2023-05-09T17:00:00", value: 9 },
  { date: "2023-05-09T18:00:00", value: 9 },
  { date: "2023-05-09T19:00:00", value: 8 },
  { date: "2023-05-09T20:00:00", value: 8 },
  { date: "2023-05-09T21:00:00", value: 8 },
  { date: "2023-05-09T22:00:00", value: 8 },
  { date: "2023-05-09T23:00:00", value: 8 }, // Total: 230
];

const candidate3 = [
  { date: "2023-05-09T00:00:00", value: 2 },
  { date: "2023-05-09T01:00:00", value: 2 },
  { date: "2023-05-09T02:00:00", value: 2 },
  { date: "2023-05-09T03:00:00", value: 2 },
  { date: "2023-05-09T04:00:00", value: 2 },
  { date: "2023-05-09T05:00:00", value: 3 },
  { date: "2023-05-09T06:00:00", value: 4 },
  { date: "2023-05-09T07:00:00", value: 5 },
  { date: "2023-05-09T08:00:00", value: 5 },
  { date: "2023-05-09T09:00:00", value: 6 },
  { date: "2023-05-09T10:00:00", value: 6 },
  { date: "2023-05-09T11:00:00", value: 6 },
  { date: "2023-05-09T12:00:00", value: 6 },
  { date: "2023-05-09T13:00:00", value: 6 },
  { date: "2023-05-09T14:00:00", value: 6 },
  { date: "2023-05-09T15:00:00", value: 4 },
  { date: "2023-05-09T16:00:00", value: 3 },
  { date: "2023-05-09T17:00:00", value: 2 },
  { date: "2023-05-09T18:00:00", value: 2 },
  { date: "2023-05-09T19:00:00", value: 2 },
  { date: "2023-05-09T20:00:00", value: 2 },
  { date: "2023-05-09T21:00:00", value: 2 },
  { date: "2023-05-09T22:00:00", value: 1 },
  { date: "2023-05-09T23:00:00", value: 1 }, // Total: 90
];

const data = candidate1.map((d) => ({ ...d, date: new Date(d.date) }));
const data2 = candidate2.map((d) => ({ ...d, date: new Date(d.date) }));
const data3 = candidate3.map((d) => ({ ...d, date: new Date(d.date) }));

export default function HourlyLineChart() {
  // Find the maximum value across all datasets
  const allValues = [...candidate1, ...candidate2, ...candidate3].map(
    (d) => d.value
  );
  const maxValue = Math.max(...allValues);

  // Add a small buffer (10%) to ensure points don't touch the top
  const yDomainMax = Math.ceil(maxValue * 1.1);

  const xScale = scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .range([0, 100]);

  const yScale = scaleLinear().domain([0, yDomainMax]).range([100, 0]);

  const line = d3_line<(typeof data)[number]>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))
    .curve(curveMonotoneX);

  const d = line(data);
  const d2 = line(data2);
  const d3 = line(data3);

  if (!d || !d2 || !d3) {
    return null;
  }

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
          <span>Kandidat 1</span>
        </div>
        <div className="flex items-center gap-2 ">
          <div className="h-5 w-10 bg-fuchsia-500"></div>
          <span>Kandidat 2</span>
        </div>
        <div className="flex items-center gap-2 ">
          <div className="h-5 w-10 bg-orange-500"></div>
          <span>Kandidat 3</span>
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
            {data.map((d, index) => (
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
            {data2.map((d, index) => (
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
            {data3.map((d, index) => (
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
            {data.map((point, i) => {
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
