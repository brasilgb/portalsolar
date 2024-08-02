'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IoClose, IoEye, IoEyeOff, IoHelpCircle, IoLockClosed, IoPerson } from 'react-icons/io5'
import { useAuthContext } from "@/contexts/AuthContext";
import { CgSpinnerTwo } from "react-icons/cg";

export const LoginValidate = z.object({
    code: z.string(),
    oldPassword: z.string().min(1, 'Digite a senha anterior'),
    newPassword: z.string().min(1, 'Digite a nova senha')
})
type FormData = z.infer<typeof LoginValidate>;

const ChangePasswordForm = () => {

    const { changePassword, loading, userAccess } = useAuthContext();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [resetPassword, setResetPassword] = useState<boolean>(false);
console.log(userAccess);
    const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            code: '',
            oldPassword: '',
            newPassword: ''
        },
        mode: 'onBlur',
        resolver: zodResolver(LoginValidate)
    });

    const handleChangePassword = async (values: any) => {
        await changePassword(values);
    }

    return (
        <div className={`w-full sm:max-w-md px-4 ${resetPassword ? 'py-0' : 'py-8'} bg-gradient-to-t from-gray-200/80 via-gray-100/90 to-gray-200/80 shadow-md overflow-hidden rounded-md border-2 border-gray-300`}>
            <div className="flex flex-col justify-center mt-8">
                <div className="w-[40%] m-auto">
                    <Image
                        src={require('@/assets/images/logo_grupo_blue.png')}
                        alt={''}
                    />
                </div>
                <div className="flex justify-center md:mb-0 mb-2 md:mt-4">
                    <h1 className="md:text-xl text-lg text-gray-500 mt-4 drop-shadow">
                        Portal Grupo Solar {userAccess}
                    </h1>
                </div>
                <div className="flex flex-col items-center justify-center mt-5">
                    <h1 className="text-sm text-red-500 font-medium text-center drop-shadow-md uppercase">
                        Alteração de senha
                    </h1>
                    <h1 className="md:px-10 text-sm text-gray-500 font-medium text-center drop-shadow-md uppercase mt-2">
                        Este é seu primeiro acesso, você deve alterar sua senha
                        </h1>
                </div>
            </div>
            <div className="p-4">
                <form action="" onSubmit={handleSubmit(handleChangePassword)}>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="oldPassword" className="label-form">Senha anterior</label>
                        <div className="div-input relative">
                            <div className="absolute left-2 top-2">
                                <IoLockClosed size="22" />
                            </div>
                            <input
                                className="input-form"
                                type={showPassword ? 'text' : 'password'}
                                {...register('oldPassword')}
                                placeholder="Digite a senha anterior"
                            />
                            <div onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 cursor-pointer">
                                {showPassword ? <IoEye size="22" /> : <IoEyeOff size="22" />}
                            </div>
                        </div>
                        {errors.oldPassword?.message && (
                            <div className="error-message">
                                {errors.oldPassword?.message}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="newPassword" className="label-form">Nova senha</label>
                        <div className="div-input relative">
                            <div className="absolute left-2 top-2">
                                <IoLockClosed size="22" />
                            </div>
                            <input
                                className="input-form"
                                type={showPassword ? 'text' : 'password'}
                                {...register('newPassword')}
                                placeholder="Digite a nova senha"
                            />
                            <div onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 cursor-pointer">
                                {showPassword ? <IoEye size="22" /> : <IoEyeOff size="22" />}
                            </div>
                        </div>
                        {errors.newPassword?.message && (
                            <div className="error-message">
                                {errors.newPassword?.message}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col mt-3">
                        <button
                            className="btn-login"
                            type="submit"
                        >
                            {loading ? <span className="animate-spin"><CgSpinnerTwo size={20} /></span> : 'Alterar senha'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
