import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary-600 hover:bg-primary-700",
            card: "bg-background",
          },
        }}
      />
    </div>
  );
}
