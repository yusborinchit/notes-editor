import { NotebookPen } from "lucide-react";
import { getServerAuthSession } from "~/server/auth";
import ProfileButton from "./buttons/profile-button";
import SignInButton from "./buttons/sign-in-button";

export default async function MainHeader() {
  const session = await getServerAuthSession();

  return (
    <header className="mx-auto flex w-full max-w-screen-md items-center justify-between px-8 pt-4">
      <a href="/" className="flex items-center text-xl font-bold">
        <NotebookPen className="mr-2 size-6 text-primary" />
        <span className="underline decoration-primary decoration-2 underline-offset-4">
          Notebook
        </span>
      </a>
      {session && session.user ? (
        <ProfileButton user={session.user} />
      ) : (
        <SignInButton />
      )}
    </header>
  );
}
