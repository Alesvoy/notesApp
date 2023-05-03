import { SignIn } from "@clerk/nextjs/app-beta";

export default function SignInPage() {
  return (
    <div className="flex align-items-center min-w-full min-h-screen">
      <SignIn
        afterSignInUrl="/notes"
        signUpUrl="/sign-up"
        appearance={{
          elements: { rootBox: "flex justify-center items-center min-w-full" },
        }}
      />
    </div>
  );
}
