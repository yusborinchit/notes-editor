import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import NoteEditor from "~/components/note-editor";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { notes } from "~/server/db/schema";

interface Props {
  params: {
    id: number;
  };
}

export default async function NotePage(props: Readonly<Props>) {
  const session = await getServerAuthSession();
  if (!session || !session.user) redirect("/");

  const noteId = Number(props.params.id);
  if (!noteId || Number.isNaN(noteId)) redirect("/");

  const [note] = await db.select().from(notes).where(eq(notes.id, noteId));
  if (!note || note.createdById !== session.user.id) redirect("/");

  return (
    <main className="mx-auto mt-12 flex h-full w-full max-w-screen-md flex-1 flex-col px-8 pb-4">
      <NoteEditor id={noteId} title={note.title} content={note.content} />
    </main>
  );
}
