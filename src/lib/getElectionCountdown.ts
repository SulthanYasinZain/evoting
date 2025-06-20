export function getSisaWaktuPemilihan(electionDateStr: string): string {
  if (!electionDateStr) return "";

  try {
    // Create a local time: '2025-06-21T00:00:00' (in WIB)
    const [year, month, day] = electionDateStr.split("-").map(Number);

    const endDate = new Date(year, month - 1, day + 1, 0, 0, 0); // Add +1 day to get 00:00 the next day
    const now = new Date(); // Local time

    const diff = endDate.getTime() - now.getTime();

    if (diff <= 0) {
      return "Waktu pemilihan telah habis";
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours} jam ${minutes} menit lagi`;
  } catch (err) {
    console.error("Countdown error:", err);
    return "";
  }
}
