import { z } from "zod";

export const eventTypeSchema = z.object({
    name: z
        .string()
        .min(1, "Event name is required")
        .max(100, "Event name must be under 100 characters"),

    description: z
        .string()
        .max(500, "Description must be under 500 characters")
        .optional()
        .or(z.literal("")),

    duration: z
        .number({ message: "Please select a duration" })
        .int()
        .positive("Duration must be a positive number"),

    location: z
        .string()
        .min(1, "Please select a meeting location"),

    availabilityId: z
        .string()
        .min(1, "Please select an availability schedule"),
});
