import z from "zod";

export const scheduleSchema = z.object({
  name: z.string().trim().min(1, { message: "Schedule name is required" }),
  days: z.record(z.any()).refine(
    (days) => Object.keys(days).length > 0,
    { message: "At least one active day is required" }
  ),
});
