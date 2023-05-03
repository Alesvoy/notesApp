import { SignUp } from "@clerk/nextjs/app-beta";

export default function SignUpPage() {
  return (
    <div className="flex align-items-center min-w-full min-h-screen">
      <SignUp
        afterSignInUrl="/notes"
        signInUrl="/sign-in"
        appearance={{
          elements: { rootBox: "flex justify-center items-center min-w-full" },
        }}
      />
    </div>
  );
}
