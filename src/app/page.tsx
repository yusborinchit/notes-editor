import SignInButton from "~/components/sign-in-button";
import SignOutButton from "~/components/sign-out-button";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();

  console.log(session);

  return (
    <main>
      {session ? (
        <>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <SignOutButton />
        </>
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
