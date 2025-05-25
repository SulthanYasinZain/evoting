/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChartLabels } from "@/components/pieChart";
import HourlyLineChart from "@/components/lineChart";
import { BarChartVertical } from "@/components/barChart";

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

export function ChartSection({ id }: { id: string }) {
  const [data, setData] = useState<ElectionResponse | null>(null);
  const [hourlyData, setHourlyData] = useState<any>(null);
  useEffect(() => {
    const source = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/stream/${id}`
    );
    const source2 = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/election/${id}/hourly-data`
    );
    console.log("SSE connection established");

    source.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      console.log("Received data:", parsed); // Log the parsed data instead
      setData(parsed);
    };

    source.onerror = (e) => {
      console.error("SSE connection error", e);
    };

    source2.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      console.log("Hourly data:", parsed);
      setHourlyData(parsed);
    };

    source2.onerror = (e) => {
      console.error("SSE error (hourly)", e);
    };

    return () => {
      source.close();
      source2.close();
    };
  }, [id]);

  // You can also log when data changes using another useEffect
  useEffect(() => {
    if (data) {
      console.log("Data state updated:", data);
    }
  }, [data]);

  if (!data) return <div>Loading...</div>;
  console.log("hourlyData", hourlyData);
  return (
    <Tabs defaultValue="PerbandinganSuara" className=" h-[500px] mt-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="PerbandinganSuara">Perbandingan Suara</TabsTrigger>
        <TabsTrigger value="DistribusiSuara">Distribusi Suara</TabsTrigger>
        <TabsTrigger value="AktivitasPerJam">Aktivitas Per Jam</TabsTrigger>
      </TabsList>
      <TabsContent value="PerbandinganSuara">
        <BarChartVertical electionData={data} />
      </TabsContent>
      <TabsContent value="DistribusiSuara">
        <PieChartLabels electionData={data} />
      </TabsContent>
      <TabsContent value="AktivitasPerJam">
        <HourlyLineChart electionData={hourlyData} />
      </TabsContent>
    </Tabs>
  );
}
