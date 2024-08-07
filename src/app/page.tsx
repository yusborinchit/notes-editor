import NotesList from "~/components/notes-list/notes-list";
import NotesListHeader from "~/components/notes-list/notes-list-header";
import NoteTableHeader from "~/components/notes-table/note-table-header";
import NotesTable from "~/components/notes-table/notes-table";
import { getServerAuthSession } from "~/server/auth";
import { queryAllNotes } from "~/server/queries";

export default async function HomePage() {
  const session = await getServerAuthSession();
  const hasAccount = !!session && !!session.user;

  const userId = session?.user?.id ?? "NO_USER";
  const recentNotes = await queryAllNotes(userId).execute();

  return (
    <main className="mx-auto mt-12 flex h-full w-full max-w-screen-md flex-1 flex-col px-8 pb-4">
      <section>
        <NotesListHeader
          hasAccount={hasAccount}
          getLastNoteNumber={() => recentNotes.length + 1}
        />
        <NotesList notes={recentNotes} />
      </section>
      {recentNotes.length > 0 && (
        <section className="mt-12">
          <NoteTableHeader />
          <NotesTable notes={recentNotes} />
        </section>
      )}
    </main>
  );
}
