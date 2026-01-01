"use client";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12 animate-fade-in">
      <SignInForm />
    </div>
  );
}
