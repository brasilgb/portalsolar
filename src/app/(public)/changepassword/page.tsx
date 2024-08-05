'use client'
import ChangePasswordForm from "@/components/login/ChangePasswordForm";
import { useSearchParams } from "next/navigation";
import React from "react";

const ChangePassword = () => {
  const searchParams = useSearchParams();
  const firstAccess = searchParams.get('firstAccess');
  const codeAccess = searchParams.get('code');

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center bg-[#0071BC] bg-no-repeat bg-center bg-cover bg-[url('/images/lojas/login.png')]`}>
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-900/40 px-2">
        <ChangePasswordForm first={firstAccess} code={codeAccess} />
      </div>
    </div>
  );

};

export default ChangePassword;