'use client'
import LoginForm from "@/components/login/LoginForm";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
// import image from '/assets/images/login.png';
const Login = () => {
  const { authenticated } = useAuthContext();

  const router = useRouter();
  useEffect(() => {
    if (authenticated) {
      return router.push('/');
    }
  }, [authenticated, router]);

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center bg-[#0071BC] bg-no-repeat bg-center bg-cover bg-[url('/images/lojas/login.png')] animate__animated animate__fadeIn`}>
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-900/40 px-2">
        <LoginForm />
      </div>
    </div>
  );

};

export default Login;