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
import SignInButton from "./buttons/sign-in-button";

interface Props {
  children: React.ReactNode;
}

export default function SignInModal(props: Readonly<Props>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{props.children}</AlertDialogTrigger>
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
