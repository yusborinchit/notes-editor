import { eq } from "drizzle-orm";
import { PlusCircle, Wind } from "lucide-react";
import CreateNoteButton from "~/components/buttons/create-note-button";
import NoteCard from "~/components/cards/note-card";
import SignInModal from "~/components/sign-in-modal";

import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { createNoteAction } from "~/server/actions";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { notes } from "~/server/db/schema";

export default async function HomePage() {
  const session = await getServerAuthSession();
  const hasAccount = session && session.user;

  const userNotes = hasAccount
    ? await db
        .select()
        .from(notes)
        .where(eq(notes.createdById, session.user.id))
    : [];

  return (
    <main className="mx-auto mt-12 flex h-full w-full max-w-screen-md flex-1 flex-col px-8 pb-4">
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tighter">
          <span className="text-primary">#</span> My Notes
        </h2>
        {hasAccount ? (
          <form action={createNoteAction}>
            <input type="hidden" name="number" value={userNotes.length + 1} />
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
      {userNotes.length === 0 ? (
        <div className="flex items-center gap-4">
          <Wind className="size-24 text-muted" />
          <p className="text-lg font-semibold text-muted-foreground/60">
            There is not much here yet. But you can create a new note by
            clicking the button below.
          </p>
        </div>
      ) : (
        <ScrollArea className="mt-4 pb-6">
          <div className="flex w-max gap-4">
            {userNotes.map((note) => (
              <NoteCard
                key={note.id}
                date={note.createdAt.toLocaleDateString()}
                time={note.createdAt.toLocaleTimeString()}
                {...note}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </main>
  );
}
