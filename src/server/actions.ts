"use server";

import { revalidatePath } from "next/cache";
import { getServerAuthSession } from "./auth";
import { queryDeleteNoteById, queryInsertNote } from "./queries";

export async function createNoteAction(formData: FormData) {
  const session = await getServerAuthSession();
  if (!session || !session.user) return;

  const number = Number(formData.get("number"));
  if (Number.isNaN(number)) return;

  await queryInsertNote({
    title: `Note ${number}`,
    createdById: session.user.id,
  }).execute();

  revalidatePath("/");
}

export async function deleteNoteAction(formData: FormData) {
  const session = await getServerAuthSession();
  if (!session || !session.user) return;

  const noteId = Number(formData.get("id"));
  if (!noteId || Number.isNaN(noteId)) return;

  await queryDeleteNoteById(noteId, session.user.id).execute();

  revalidatePath("/");
}
