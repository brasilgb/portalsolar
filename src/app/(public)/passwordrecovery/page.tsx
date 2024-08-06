'use client'
import PasswordRecoveryForm from "@/components/login/PasswordRecoveryForm";
import React from "react";

const PasswordRecovery = () => {

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center bg-[#0071BC] bg-no-repeat bg-center bg-cover bg-[url('/images/lojas/login.png')]`}>
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-900/40 px-2">
        <PasswordRecoveryForm />
      </div>
    </div>
  );

};

export default PasswordRecovery;