"use client";

import { type VariantProps } from "class-variance-authority";
import { useFormStatus } from "react-dom";
import { cn } from "~/lib/utils";
import { Button, buttonVariants } from "../ui/button";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  pendingChildren: React.ReactNode;
  children: React.ReactNode;
}

export default function FormButton(props: Readonly<Props>) {
  const { pendingChildren, children, ...restOfProps } = props;
  const { pending } = useFormStatus();

  return (
    <Button
      {...restOfProps}
      disabled={pending}
      className={cn(
        buttonVariants({
          variant: props.variant,
          size: props.size,
          className: props.className,
        }),
      )}
    >
      {pending ? pendingChildren : children}
    </Button>
  );
}
