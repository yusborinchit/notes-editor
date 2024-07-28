"use client";

import { FileType, Trash2 } from "lucide-react";
import { useRef } from "react";
import { delay } from "~/lib/delay";
import { deleteNoteAction } from "~/server/actions";
import { Button } from "../ui/button";

interface Props {
  id: number;
  title: string | null;
  content: string | null;
  createdById: string;
  date: string;
  time: string;
  updatedAt: Date | null;
}

export default function NoteCard(props: Readonly<Props>) {
  const noteRef = useRef<HTMLAnchorElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleDeleteAnimation(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();

    if (!noteRef.current || !formRef.current) return;

    noteRef.current.setAttribute("data-delete", "true");
    await delay(250);

    noteRef.current.setAttribute("data-deleted", "true");
    formRef.current.requestSubmit();
  }

  return (
    <a
      key={props.id}
      ref={noteRef}
      href={`/notes/${props.id}`}
      className="w-40 overflow-hidden duration-500 animate-in fade-in-5 slide-in-from-left-6 data-[deleted=true]:hidden data-[deleted=true]:opacity-0 data-[delete=true]:duration-500 data-[delete=true]:animate-out data-[delete=true]:fade-out data-[delete=true]:slide-out-to-top"
    >
      <div className="group relative grid aspect-square w-40 place-items-center overflow-hidden rounded-md bg-primary">
        <form
          ref={formRef}
          action={deleteNoteAction}
          className="absolute right-2 top-2 z-10"
        >
          <input type="hidden" name="id" value={props.id} />
          <Button
            size="icon"
            variant="ghost"
            onClick={handleDeleteAnimation}
            className="hover:bg-foreground/20"
          >
            <Trash2 className="size-6" />
          </Button>
        </form>
        <FileType className="size-28 opacity-20 transition-transform group-hover:scale-110" />
      </div>
      <p className="mt-2 line-clamp-1 font-semibold">{props.title}</p>
      <p className="text-xs text-muted-foreground">
        {props.date}
        {" - "}
        {props.time}
      </p>
    </a>
  );
}
