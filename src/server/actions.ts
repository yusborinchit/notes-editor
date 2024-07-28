"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "./auth";
import { db } from "./db";
import { notes } from "./db/schema";

export async function createNoteAction(formData: FormData) {
  const session = await getServerAuthSession();
  if (!session || !session.user) return;

  const number = Number(formData.get("number"));
  if (Number.isNaN(number)) return;

  await db.insert(notes).values({
    title: `Note ${number}`,
    createdById: session.user.id,
  });

  revalidatePath("/");
}

export async function deleteNoteAction(formData: FormData) {
  const session = await getServerAuthSession();
  if (!session || !session.user) return;

  const noteId = Number(formData.get("id"));
  if (Number.isNaN(noteId)) return;

  await db
    .delete(notes)
    .where(and(eq(notes.id, noteId), eq(notes.createdById, session.user.id)));

  revalidatePath("/");
}
