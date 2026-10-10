import { z } from "zod";

export const checkInSchema = z.object({
  userId: z.string().uuid("Invalid user ID").optional(),
  weekLabel: z.string().min(1, "Week label is required"),
  prayerDays: z.number().int().min(0).max(7),
  bibleDays: z.number().int().min(0).max(7),
  attendedMeeting: z.boolean(),
  metAccountability: z.boolean(),
  servingContribution: z.string().optional().default(""),
  strugglesAndNeeds: z.string().optional().default(""),
  strugglesVisibility: z
    .enum(["PRIVATE", "PARTNER_ONLY", "LEADER_DISCLOSED", "CIRCLE_SHARED"])
    .optional()
    .default("PRIVATE"),
  praiseReport: z.string().optional().default(""),
  praiseVisibility: z
    .enum(["PRIVATE", "PARTNER_ONLY", "LEADER_DISCLOSED", "CIRCLE_SHARED"])
    .optional()
    .default("CIRCLE_SHARED"),
  flags: z.array(z.string()).default([]),
  flagsVisibility: z
    .enum(["PRIVATE", "PARTNER_ONLY", "LEADER_DISCLOSED", "CIRCLE_SHARED"])
    .optional()
    .default("PARTNER_ONLY"),
});

export type CheckInInput = z.infer<typeof checkInSchema>;
