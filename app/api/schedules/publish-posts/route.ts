import { handleSchedule } from "@vercel/schedules";
import { revalidatePath } from "next/cache";

export const POST = handleSchedule(async () => {
  revalidatePath("/", "layout");
});
