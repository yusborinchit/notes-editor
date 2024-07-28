import { FileType, Trash2 } from "lucide-react";
import { deleteNoteAction } from "~/server/actions";
import { Button } from "../ui/button";

interface Props {
  id: number;
  title: string | null;
  content: string | null;
  createdById: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export default function NoteCard(props: Readonly<Props>) {
  return (
    <a
      key={props.id}
      href={`/notes/${props.id}`}
      className="w-40 overflow-hidden duration-500 animate-in fade-in-5 slide-in-from-left-6"
    >
      <div className="group relative grid aspect-square w-40 place-items-center overflow-hidden rounded-md bg-primary">
        <form action={deleteNoteAction} className="absolute right-2 top-2 z-10">
          <input type="hidden" name="id" value={props.id} />
          <Button variant="ghost" size="icon">
            <Trash2 className="size-6" />
          </Button>
        </form>
        <FileType className="size-28 opacity-20 transition-transform group-hover:scale-110" />
      </div>
      <p className="mt-2 line-clamp-1 font-semibold">{props.title}</p>
      <p className="text-xs text-muted-foreground">
        {props.createdAt.toLocaleDateString()}
        {" - "}
        {props.createdAt.toLocaleTimeString()}
      </p>
    </a>
  );
}
