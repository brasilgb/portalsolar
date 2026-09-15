'use client'
import ChangePasswordForm from "@/components/login/ChangePasswordForm";
import { useSearchParams } from "next/navigation";
import React from "react";

const ChangePassword = () => {
  const searchParams = useSearchParams();
  const firstAccess = searchParams.get('firstAccess');
  const codeAccess = searchParams.get('code');

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-solar-300 via-solar-500 to-solar-600 px-4 py-8 sm:px-6 animate__animated animate__fadeIn">
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl sm:h-96 sm:w-96"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-black/10 blur-3xl sm:h-96 sm:w-96"
        aria-hidden
      />
      <div className="relative w-full flex items-center justify-center">
        <ChangePasswordForm first={firstAccess} code={codeAccess} />
      </div>
    </div>
  );

};

export default ChangePassword;