'use client'
import ChangePasswordForm from "@/components/login/ChangePasswordForm";
import React from "react";

const ChangePassword = () => {

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center bg-[#0071BC] bg-no-repeat bg-center bg-cover bg-[url('/images/lojas/login.png')]`}>
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-900/40 px-2">
        <ChangePasswordForm />
      </div>
    </div>
  );

};

export default ChangePassword;