'use client'
import Link from "next/link";
import LoginForm from "@/components/login/LoginForm";
import { APP_ROUTES } from "@/app/constants/app-routes";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { IoMapOutline } from "react-icons/io5";
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
      <Link
        href={APP_ROUTES.public.location}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-solar-700 shadow-lg transition hover:bg-white hover:text-solar-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-solar-500 sm:right-6 sm:top-6"
        aria-label="Abrir localização"
        title="Localização"
      >
        <IoMapOutline size={24} />
      </Link>
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
