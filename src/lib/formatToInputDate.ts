/* eslint-disable @typescript-eslint/no-explicit-any */
export default function formatToInputDate(dateString: string) {
  const parsedDate = new Date(dateString); // this might be `Invalid Date` if the format is not standard
  if (isNaN(parsedDate.getTime())) {
    // Fallback: manually parse
    const parts = dateString.split(", ")[1]; // get "19 April 2025"
    const [day, monthName, year] = parts.split(" ");
    const monthMap: any = {
      Januari: "01",
      Februari: "02",
      Maret: "03",
      April: "04",
      Mei: "05",
      Juni: "06",
      Juli: "07",
      Agustus: "08",
      September: "09",
      Oktober: "10",
      November: "11",
      Desember: "12",
    };

    const month = monthMap[monthName];
    return `${year}-${month}-${day.padStart(2, "0")}`;
  } else {
    return parsedDate.toISOString().split("T")[0]; // fallback if Date() works
  }
}
