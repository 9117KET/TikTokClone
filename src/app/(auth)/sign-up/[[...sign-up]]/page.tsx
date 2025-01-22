import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp appearance={{
        elements: {
          formButtonPrimary: "bg-primary-600 hover:bg-primary-700",
          card: "bg-background",
        }
      }} />
    </div>
  );
}