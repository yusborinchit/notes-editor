import { ExternalLink, Loader2, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { deleteNoteAction } from "~/server/actions";
import FormButton from "../buttons/form-button";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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

export default function NotesTable(props: Readonly<Props>) {
  return (
    <ScrollArea className="mt-4 overflow-hidden rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[250px] text-foreground">
              Title
            </TableHead>
            <TableHead className="text-foreground">Created At</TableHead>
            <TableHead className="min-w-[180px] text-foreground">
              Last Update
            </TableHead>
            <TableHead className="w-[100px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell className="font-medium text-muted-foreground">
                {note.title}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {note.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {note.updatedAt!.toLocaleString()}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button asChild size="icon" variant="outline">
                  <a href={`/notes/${note.id}/`}>
                    <ExternalLink className="size-[18px]" />
                  </a>
                </Button>
                <form action={deleteNoteAction}>
                  <input type="hidden" name="id" value={note.id} />
                  <FormButton
                    size="icon"
                    pendingChildren={
                      <Loader2 className="size-[18px] animate-spin" />
                    }
                  >
                    <Trash2 className="size-[18px]" />
                  </FormButton>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
