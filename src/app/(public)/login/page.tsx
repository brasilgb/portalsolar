'use client'
import LoginForm from "@/components/login/LoginForm";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Login = () => {
const {authenticated} = useAuthContext();
console.log('authenticated', authenticated);
const router = useRouter();
useEffect(() => {
  if(authenticated) {
    return router.push('/');
  }
},[authenticated])
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0071BC] md:px-0 px-4">
      <div className="md:w-1/4 w-full bg-gray-100 border-2 border-white shadow-lg rounded">
        <LoginForm />
      </div>
    </main>
  );
  
};

export default Login;