import { currentUser } from "@clerk/nextjs/app-beta";
import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar";

export default async function NotesLayout({ children }) {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
