import { redirect } from "next/navigation";
import NoteEditor from "~/components/note-editor";
import { getServerAuthSession } from "~/server/auth";
import { queryNoteById } from "~/server/queries";

interface Props {
  params: {
    id: number;
  };
}

export default async function NotePage(props: Readonly<Props>) {
  const session = await getServerAuthSession();

  const hasSession = !!session && !!session.user;
  if (!hasSession) redirect("/");

  const noteId = Number(props.params.id);
  if (!noteId || Number.isNaN(noteId)) redirect("/");

  const [note] = await queryNoteById(noteId, session.user.id).execute();
  if (!note) redirect("/");

  return (
    <main className="mx-auto mt-12 flex h-full w-full max-w-screen-md flex-1 flex-col px-8 pb-4">
      <NoteEditor id={noteId} title={note.title} content={note.content} />
    </main>
  );
}
