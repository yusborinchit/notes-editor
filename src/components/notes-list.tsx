import { Wind } from "lucide-react";
import NoteCard from "./cards/note-card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface Props {
  notes: {
    id: number;
    title: string | null;
    content: string | null;
    createdById: string;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
}

export default function NotesList(props: Readonly<Props>) {
  return (
    <>
      {props.notes.length > 0 ? (
        <ScrollArea className="mt-4 min-h-[242px] pb-6">
          <div className="flex w-max gap-4">
            {props.notes.map((note) => (
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
      ) : (
        <div className="mt-4 flex min-h-[242px] flex-col items-center gap-2 pb-6 text-center min-[500px]:flex-row min-[500px]:gap-4 min-[500px]:text-start">
          <Wind className="size-32 shrink-0 text-muted" />
          <p className="text-lg text-muted-foreground/60">
            There is not much here yet. But you can create a new note by
            clicking the button below.
          </p>
        </div>
      )}
    </>
  );
}
