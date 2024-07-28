import { desc, eq } from "drizzle-orm";
import { PlusCircle } from "lucide-react";
import CreateNoteButton from "~/components/buttons/create-note-button";
import NotesList from "~/components/notes-list";
import NotesTable from "~/components/notes-table";
import SignInModal from "~/components/sign-in-modal";
import { Button } from "~/components/ui/button";
import { createNoteAction } from "~/server/actions";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { notes } from "~/server/db/schema";

export default async function HomePage() {
  const session = await getServerAuthSession();
  const hasAccount = session && session.user;

  const recentNotes = await db
    .select()
    .from(notes)
    .where(eq(notes.createdById, session?.user?.id ?? "NO_USER"))
    .orderBy(desc(notes.updatedAt));

  return (
    <main className="mx-auto mt-12 flex h-full w-full max-w-screen-md flex-1 flex-col px-8 pb-4">
      <section>
        <header className="flex flex-col items-center justify-between gap-2 min-[500px]:flex-row">
          <h2 className="text-3xl font-bold tracking-tighter">
            <span className="text-primary">#</span> Recent Notes
          </h2>
          {hasAccount ? (
            <form
              action={createNoteAction}
              className="w-full min-[500px]:w-fit"
            >
              <input
                type="hidden"
                name="number"
                value={recentNotes.length + 1}
              />
              <CreateNoteButton />
            </form>
          ) : (
            <SignInModal>
              <Button asChild variant="outline">
                <span>
                  <PlusCircle className="mr-2 size-5 text-primary" />
                  New Note
                </span>
              </Button>
            </SignInModal>
          )}
        </header>
        <NotesList notes={recentNotes} />
      </section>
      {recentNotes.length > 0 && (
        <section className="mt-12">
          <header>
            <h2 className="text-3xl font-bold tracking-tighter">
              <span className="text-primary">#</span> All Notes
            </h2>
          </header>
          <NotesTable notes={recentNotes} />
        </section>
      )}
    </main>
  );
}
