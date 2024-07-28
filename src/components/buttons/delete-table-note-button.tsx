"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function DeleteTableNoteButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} size="icon">
      {pending ? (
        <Loader2 className="size-[18px] animate-spin" />
      ) : (
        <Trash2 className="size-[18px]" />
      )}
    </Button>
  );
}
