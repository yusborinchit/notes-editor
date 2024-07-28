"use client";

import { Loader2, PlusCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";


export default function CreateNoteButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      variant="outline"
    >
      {pending ? (
        <Loader2 className="mr-2 size-5 animate-spin" />
      ) : (
        <PlusCircle className="mr-2 size-5 text-primary" />
      )}
      {pending ? "Creating..." : "New Note"}
    </Button>
  );
}
