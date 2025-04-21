"use client";
import { useEffect, useState } from "react";

export default function SSE({ electionId }: { electionId: string }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/stream/${electionId}`
    );

    eventSource.onmessage = (event: MessageEvent) => {
      console.log("Received SSE:", event.data);
      setMessage(event.data);
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [electionId]);

  return <div>Message from SSE: {message}</div>;
}
