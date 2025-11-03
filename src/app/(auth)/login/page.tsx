'use client';
import AuthCard from "@/app/component/login/AuthCard";
import { SessionProvider } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center backdrop-blur-md">
      <SessionProvider>
        <AuthCard />
      </SessionProvider>
    </div>
  );
}