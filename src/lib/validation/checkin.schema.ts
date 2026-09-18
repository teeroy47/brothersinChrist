import { z } from "zod";

export const checkInSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  weekLabel: z.string().min(1, "Week label is required"),
  prayerDays: z.number().int().min(0).max(7),
  bibleDays: z.number().int().min(0).max(7),
  attendedMeeting: z.boolean(),
  metAccountability: z.boolean(),
  servingContribution: z.string().optional().default(""),
  strugglesAndNeeds: z.string().optional().default(""),
  praiseReport: z.string().optional().default(""),
  flags: z.array(z.string()).default([])
});

export type CheckInInput = z.infer<typeof checkInSchema>;
