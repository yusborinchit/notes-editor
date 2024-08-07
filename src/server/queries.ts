import { and, desc, eq } from "drizzle-orm";
import { db } from "./db";
import { notes } from "./db/schema";

export function queryInsertNote(note: { title: string; createdById: string }) {
  return db.insert(notes).values(note).prepare();
}

export function queryDeleteNoteById(noteId: number, userId: string) {
  return db
    .delete(notes)
    .where(and(eq(notes.id, noteId), eq(notes.createdById, userId)))
    .prepare();
}

export function queryUpdateNoteById(
  noteId: number,
  userId: string,
  note: { title: string; content: string | null },
) {
  return db
    .update(notes)
    .set({
      title: note.title === "" ? "New Note" : note.title,
      content: note.content,
    })
    .where(and(eq(notes.id, noteId), eq(notes.createdById, userId)))
    .prepare();
}

export function queryNoteById(noteId: number, userId: string) {
  return db
    .select()
    .from(notes)
    .where(and(eq(notes.id, noteId), eq(notes.createdById, userId)))
    .prepare();
}

export function queryAllNotes(userId: string) {
  return db
    .select()
    .from(notes)
    .where(eq(notes.createdById, userId))
    .orderBy(desc(notes.updatedAt))
    .prepare();
}
