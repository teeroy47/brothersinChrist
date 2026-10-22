import { z } from "zod";

export const memberProfileUpdateSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().optional(),
  city: z.string().optional(),
  church: z.string().optional(),
  occupation: z.string().optional(),
  maritalStatus: z.string().optional(),
  testimony: z.string().optional(),
  spiritualGoals: z.array(z.string()).default([]),
  fitnessGoals: z.array(z.string()).default([])
});

export type MemberProfileUpdateInput = z.infer<typeof memberProfileUpdateSchema>;
