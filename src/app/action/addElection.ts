/*eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { cookies } from "next/headers";

export default async function AddElection(prevstate: any, formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const title = formData.get("JudulPemilu");
  const election_date = formData.get("TanggalPemlilu");

  console.log("Title:", title);
  console.log("Election Date:", election_date);

  // const createElection = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/elections`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       title,
  //       election_date,
  //     }),
  //   }
  // );

  // if (!createElection.ok) {
  //   console.error("Create Election Failed:", createElection.status);
  //   if (createElection.status === 422) return { message: "Invalid ID" };
  //   if (createElection.status === 401 || createElection.status === 500)
  //     return { message: "Server error, please try again later" };
  // }

  // const election = await createElection.json();
  // const electionId = election.data.id;

  // console.log("Election ID:", electionId);

  // Get multiple candidate data
  const numbers = formData.getAll("number[]");
  const names = formData.getAll("name[]");
  const visions = formData.getAll("vision[]");
  const missions = formData.getAll("mission[]");
  const images = formData.getAll("image_url[]");

  console.log("Numbers:", numbers);
  console.log("Names:", names);
  console.log("Visions:", visions);
  console.log("Missions:", missions);
  console.log("Images:", images);

  // for (let i = 0; i < names.length; i++) {
  // const file = images[i] as File;
  // const isValidFile = file && file.name !== "undefined" && file.size > 0;

  // if (!isValidFile) {
  //   console.warn(`Skipping invalid image for candidate ${i + 1}`);
  //   return { message: "Erorr iamge not valid" }; // or handle differently if the API allows image-less candidates
  // }
  // const form = new FormData();
  // form.append("election_id", "25");
  // form.append("number", numbers[i]);
  // form.append("name", names[i]);
  // form.append("vision", visions[i]);
  // form.append("mission", missions[i]);
  // form.append("image_url", images[i]); // This should be a File object

  const candidateResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/candidates`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        // DO NOT set Content-Type manually here, browser will do it for multipart/form-data
      },
      body: JSON.stringify({
        election_id: 1,
        number: numbers,
        name: names,
        vision: visions,
        mission: missions,
        image_url: images,
      }),
    }
  );

  // if (!candidateResponse.ok) {
  //   console.error(candidateResponse.status);
  // } else {
  //   console.log(`Candidate ${+1} created successfully`);
  // }
  // // }

  return { message: "Success" };
}
