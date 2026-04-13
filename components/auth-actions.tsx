"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { clearSession, setSession } from "@/lib/auth";
import { getSessionOptions } from "@/lib/mock-data";

const authSchema = z.object({
  userId: z.string().min(1)
});

export async function signInAction(formData: FormData) {
  const parsed = authSchema.safeParse({
    userId: formData.get("userId")
  });

  if (!parsed.success) {
    redirect("/signin?error=invalid");
  }

  const session = getSessionOptions().find((item) => item.id === parsed.data.userId);
  if (!session) {
    redirect("/signin?error=missing");
  }

  await setSession({
    id: session.id,
    name: session.name,
    role: session.role
  });

  redirect("/home");
}

export async function signOutAction() {
  await clearSession();
  redirect("/");
}

export async function registerAction(formData: FormData) {
  const name = z.string().min(2).parse(formData.get("fullName"));
  await setSession({
    id: "u-1",
    name,
    role: "member"
  });
  redirect("/home");
}
