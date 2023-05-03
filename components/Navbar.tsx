"use client";

import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
  const { signOut, user } = useClerk();
  const router = useRouter();

  useEffect(() => {}, [user]);

  return (
    <nav>
      {user ? (
        <button
          onClick={() => {
            signOut();
            router.push("/");
          }}
        >
          Log Out
        </button>
      ) : (
        <button onClick={() => router.push("/sign-in")}>Sign in</button>
      )}
    </nav>
  );
}
