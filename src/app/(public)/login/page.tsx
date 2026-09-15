'use client'
import LoginForm from "@/components/login/LoginForm";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Login = () => {
  const { authenticated } = useAuthContext();

  const router = useRouter();
  useEffect(() => {
    if (authenticated) {
      return router.push('/');
    }
  }, [authenticated, router]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-solar-300 via-solar-500 to-solar-600 px-4 py-8 sm:px-6">
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl sm:h-96 sm:w-96"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-black/10 blur-3xl sm:h-96 sm:w-96"
        aria-hidden
      />
      <div className="relative w-full flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );

};

export default Login;