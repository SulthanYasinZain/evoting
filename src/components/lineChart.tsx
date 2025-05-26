import { CSSProperties } from "react";
import { scaleTime, scaleLinear, line as d3_line, curveMonotoneX } from "d3";

// --- Type Definitions ---
// These types describe the content INSIDE electionData.data

type HourlyDataPoint = {
  date: string;
  value: number;
};

type CandidateInHourlyDetails = {
  // This describes each candidate object
  candidate_name: string;
  candidate_number: string;
  hourly_data: HourlyDataPoint[];
  total_votes: number;
};

// This is the actual structure of the prop your component is receiving
type ReceivedElectionProp = {
  data: {
    // All election info is wrapped in 'data'
    election_id: number;
    election_title: string;
    election_date: string;
    // Potentially other fields like status, voter_count could be here too
    candidates: {
      [key: string]: CandidateInHourlyDetails;
    };
  };
} | null; // Allow null for the prop

interface HourlyLineChartProps {
  electionData: ReceivedElectionProp; // Use the updated prop type
}

type ChartDataPoint = {
  date: Date;
  value: number;
};

export default function HourlyLineChart({
  electionData,
}: HourlyLineChartProps) {
  // console.log("HourlyLineChart received electionData:", JSON.stringify(electionData, null, 2)); // Keep for debugging if needed

  // Updated null/empty check to look inside electionData.data
  if (
    !electionData || // 1. Is electionData itself null?
    !electionData.data || // 2. Does electionData HAVE a 'data' property?
    !electionData.data.candidates || // 3. Does 'electionData.data' HAVE a 'candidates' property?
    Object.keys(electionData.data.candidates).length === 0 // 4. Is 'electionData.data.candidates' an empty object {}?
  ) {
    // Log which condition failed for easier debugging
    if (!electionData)
      console.error("Reason for 'No Data': electionData prop is null.");
    else if (!electionData.data)
      console.error(
        "Reason for 'No Data': electionData.data is falsy. Root keys:",
        Object.keys(electionData)
      );
    else if (!electionData.data.candidates)
      console.error(
        "Reason for 'No Data': electionData.data.candidates is falsy. Keys in electionData.data:",
        Object.keys(electionData.data)
      );
    else if (Object.keys(electionData.data.candidates).length === 0)
      console.error(
        "Reason for 'No Data': electionData.data.candidates is an empty object."
      );

    return (
      <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-center h-[400px]">
        <p className="">No Data Available</p>
      </div>
    );
  }

  // Extract candidate data from the corrected path: electionData.data.candidates
  const candidateEntries: [string, CandidateInHourlyDetails][] = Object.entries(
    electionData.data.candidates // Corrected path
  );

  const candidate1DataPoints: HourlyDataPoint[] =
    candidateEntries[0]?.[1]?.hourly_data || [];
  const candidate2DataPoints: HourlyDataPoint[] =
    candidateEntries[1]?.[1]?.hourly_data || [];
  const candidate3DataPoints: HourlyDataPoint[] =
    candidateEntries[2]?.[1]?.hourly_data || [];

  const processedData1: ChartDataPoint[] = candidate1DataPoints.map(
    (d: HourlyDataPoint) => ({ ...d, date: new Date(d.date) })
  );
  const processedData2: ChartDataPoint[] = candidate2DataPoints.map(
    (d: HourlyDataPoint) => ({ ...d, date: new Date(d.date) })
  );
  const processedData3: ChartDataPoint[] = candidate3DataPoints.map(
    (d: HourlyDataPoint) => ({ ...d, date: new Date(d.date) })
  );

  // This check is for when candidates exist but have no actual hourly vote entries
  if (
    processedData1.length === 0 &&
    processedData2.length === 0 &&
    processedData3.length === 0
  ) {
    return (
      <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-center h-[400px]">
        <p className="">No Hourly Activity Data to Display</p>
      </div>
    );
  }

  const allValues = [
    ...candidate1DataPoints,
    ...candidate2DataPoints,
    ...candidate3DataPoints,
  ].map((d: HourlyDataPoint) => d.value);
  const maxValue = allValues.length > 0 ? Math.max(...allValues) : 0;
  const yDomainMax = Math.max(1, Math.ceil(maxValue * 1.1));

  const firstDate = processedData1[0]?.date;
  const lastDate = processedData1[processedData1.length - 1]?.date;
  const xScale = scaleTime()
    .domain([firstDate || new Date(), lastDate || new Date()])
    .range([0, 100]);
  const yScale = scaleLinear().domain([0, yDomainMax]).range([100, 0]);

  const lineGenerator = d3_line<ChartDataPoint>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))
    .curve(curveMonotoneX);

  const path1 = lineGenerator(processedData1);
  const path2 = lineGenerator(processedData2);
  const path3 = lineGenerator(processedData3);

  const candidate1Name =
    candidateEntries[0]?.[1]?.candidate_name || "Kandidat 1";
  const candidate2Name =
    candidateEntries[1]?.[1]?.candidate_name || "Kandidat 2";
  const candidate3Name =
    candidateEntries[2]?.[1]?.candidate_name || "Kandidat 3";

  // --- Start of JSX Rendering (same as your previous correct version) ---
  return (
    <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ">
      <h2 className="text-xl font-semibold">
        Aktivitas Voting per Jam dalam 24 Jam Terakhir
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Diagram garis ini merekam jumlah suara yang masuk setiap jam dalam 24
        jam terakhir.
      </p>
      <div className="flex items-center gap-4 mb-4 mt-2 flex-wrap">
        {processedData1.length > 0 && candidateEntries[0]?.[1] && (
          <div className="flex items-center gap-2 ">
            <div className="h-3 w-3 md:h-4 md:w-6 bg-red-500"></div>
            <span>{candidate1Name}</span>
          </div>
        )}
        {processedData2.length > 0 && candidateEntries[1]?.[1] && (
          <div className="flex items-center gap-2 ">
            <div className="h-3 w-3 md:h-4 md:w-6 bg-fuchsia-500"></div>
            <span>{candidate2Name}</span>
          </div>
        )}
        {processedData3.length > 0 && candidateEntries[2]?.[1] && (
          <div className="flex items-center gap-2 ">
            <div className="h-3 w-3 md:h-4 md:w-6 bg-orange-500"></div>
            <span>{candidate3Name}</span>
          </div>
        )}
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
            .ticks(Math.min(10, yDomainMax > 0 ? Math.floor(yDomainMax) : 1)) // Ensure ticks arg is integer
            .map(
              yScale.tickFormat(
                Math.min(10, yDomainMax > 0 ? Math.floor(yDomainMax) : 1),
                "d"
              )
            )
            .map((value, i) => (
              <div
                key={i}
                style={{
                  top: `${yScale(+value)}%`,
                  left: "0%",
                }}
                className="absolute text-xs tabular-nums -translate-y-1/2 text-gray-500 dark:text-gray-400 w-full text-right pr-2"
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
              .ticks(Math.min(8, yDomainMax > 0 ? Math.floor(yDomainMax) : 1))
              .map(
                yScale.tickFormat(
                  Math.min(8, yDomainMax > 0 ? Math.floor(yDomainMax) : 1),
                  "d"
                )
              )
              .map((activeTickValue, i) => (
                <g
                  transform={`translate(0,${yScale(+activeTickValue)})`}
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

            {path1 && processedData1.length > 0 && (
              <path
                d={path1}
                fill="none"
                className="stroke-red-500"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            )}
            {path2 && processedData2.length > 0 && (
              <path
                d={path2}
                fill="none"
                className="stroke-fuchsia-500"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            )}
            {path3 && processedData3.length > 0 && (
              <path
                d={path3}
                fill="none"
                className="stroke-orange-500"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            )}

            {processedData1.map((d: ChartDataPoint, index: number) => (
              <path
                key={`c1-${index}`}
                d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
                vectorEffect="non-scaling-stroke"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                className="text-red-300 hover:text-red-500"
              />
            ))}
            {processedData2.map((d: ChartDataPoint, index: number) => (
              <path
                key={`c2-${index}`}
                d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
                vectorEffect="non-scaling-stroke"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                className="text-fuchsia-300 hover:text-fuchsia-500"
              />
            ))}
            {processedData3.map((d: ChartDataPoint, index: number) => (
              <path
                key={`c3-${index}`}
                d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
                vectorEffect="non-scaling-stroke"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                className="text-orange-300 hover:text-orange-500"
              />
            ))}
          </svg>

          <div className="translate-y-2">
            {processedData1.length > 0 &&
              processedData1.map((point: ChartDataPoint, i: number) => {
                const isFirst = i === 0;
                const isLast = i === processedData1.length - 1;
                const isIntermediateTick =
                  processedData1.length > 10 ? i % 6 === 0 : i % 3 === 0; // Adjust tick frequency

                if (!isFirst && !isLast && !isIntermediateTick) return null;

                return (
                  <div
                    key={`x-tick-${i}`}
                    className="overflow-visible text-zinc-500 dark:text-gray-400"
                  >
                    <div
                      style={{
                        left: `${xScale(point.date)}%`,
                        top: "100%",
                        transform: `translateX(${
                          isFirst ? "0%" : isLast ? "-100%" : "-50%"
                        }) translateY(4px)`,
                      }}
                      className="text-xs absolute"
                    >
                      {point.date.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
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
  // --- End of JSX Rendering ---
}
