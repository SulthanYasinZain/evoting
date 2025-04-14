"use server";
import { cookies } from "next/headers";
export default async function addtest(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const form = new FormData();
  const images = formData.getAll("image_url[]");
  form.append("election_id", "24");
  form.append("number", "2");
  form.append("name", "Test Candidate");
  form.append("vision", "To serve.");
  form.append("mission", "To lead.");
  form.append("image_url", images[0]); // Make sure this is a File object

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: form,
  });

  const data = await res.json();
  console.log(data);
}
