"use client";

import { GithubIcon, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    await signIn("github");
  }

  return (
    <Button disabled={isLoading} onClick={handleSignIn}>
      {isLoading ? (
        <Loader2 className="mr-2 size-5 animate-spin" />
      ) : (
        <GithubIcon className="mr-2 size-5" />
      )}
      {isLoading ? "Loading..." : "Sign in with GitHub"}
    </Button>
  );
}
