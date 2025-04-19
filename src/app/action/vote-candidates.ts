"use server";

import { cookies } from "next/headers";

export default async function VoteAction(formData: FormData): Promise<{
  error: boolean;
  message: string;
}> {
  console.log("actoin called");
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const candidate_id = formData.get("candidate_id") as string;

  try {
    const voteCandidateRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/votes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidate_id: candidate_id,
        }),
      }
    );

    const voteCandidate = await voteCandidateRes.json();

    if (!voteCandidateRes.ok) {
      return {
        error: true,
        message: voteCandidate.message || "Something went wrong!",
      };
    }

    console.log("Vote response:", voteCandidate);

    return {
      error: false,
      message: voteCandidate.message || "Vote submitted successfully!",
    };
  } catch (error: any) {
    console.error("Error during vote submission:", error);
    return {
      error: true,
      message: error.message || "An unexpected error occurred.",
    };
  }
}
