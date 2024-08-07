import { PlusCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import SignInButton from "../buttons/sign-in-button";
import { Button } from "../ui/button";

export default function SignInModal() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button asChild variant="outline">
          <span>
            <PlusCircle className="mr-2 size-5 text-primary" />
            New Note
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[300px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-3xl font-bold tracking-tighter">
            Sign In to Continue
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-2">
            <AlertDialogAction>
              <SignInButton />
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
