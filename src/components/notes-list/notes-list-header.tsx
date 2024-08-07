import { Loader2, PlusCircle } from "lucide-react";
import { createNoteAction } from "~/server/actions";
import FormButton from "../buttons/form-button";
import SignInModal from "../modals/sign-in-modal";

interface Props {
  hasAccount: boolean;
  getLastNoteNumber: () => number;
}

export default function NotesListHeader(props: Readonly<Props>) {
  return (
    <header className="flex flex-col items-center justify-between gap-2 min-[500px]:flex-row">
      <h2 className="text-3xl font-bold tracking-tighter">
        <span className="text-primary">#</span> Recent Notes
      </h2>
      {props.hasAccount ? (
        <form action={createNoteAction} className="w-full min-[500px]:w-fit">
          <input
            type="hidden"
            name="number"
            value={props.getLastNoteNumber()}
          />
          <FormButton
            variant="outline"
            className="w-full"
            pendingChildren={<FormButtonPending />}
          >
            <FormButtonDefault />
          </FormButton>
        </form>
      ) : (
        <SignInModal />
      )}
    </header>
  );
}

function FormButtonDefault() {
  return (
    <>
      <PlusCircle className="mr-2 size-5 text-primary" />
      <span>New Note</span>
    </>
  );
}

function FormButtonPending() {
  return (
    <>
      <Loader2 className="mr-2 size-5 animate-spin" />
      <span>Creating...</span>
    </>
  );
}
