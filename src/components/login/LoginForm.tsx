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
    alternative: z.string().min(1, 'Digite o usuário'),
    password: z.string().min(1, 'Digite a senha'),
    queryType: z.string(),
})
type FormData = z.infer<typeof LoginValidate>;

const LoginForm = () => {

    const { signIn, loading, userNotExist } = useAuthContext();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [resetPassword, setResetPassword] = useState<boolean>(false);

    const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            alternative: '',
            password: '',
            queryType: "4"
        },
        mode: 'onBlur',
        resolver: zodResolver(LoginValidate)
    });

    const handleLogin = async (values: any) => {
        await signIn(values);
    }

    return (
        <div className="bg-gray-100 rounded-md">
            <div className="px-4 pt-8">
                <div className="w-[40%] m-auto">
                    <Image
                        src={require('@/assets/images/logo_grupo_blue.png')}
                        alt={''}
                    />
                </div>
                <div className="flex justify-center md:mb-0 mb-2 md:mt-4">
                    <h1 className="md:text-xl text-lg font-bold text-gray-400 mt-4">
                        Bem vindo ao Portal Grupo Solar
                    </h1>
                </div>
                <div className="flex justify-center text-gray-400 md:mb-4">
                    <h1 className="md:text-lg text-base text-center font-semibold">
                        Faça login para acessar os serviços
                    </h1>
                </div>
            </div>
            <div className="p-4 relative">
                {userNotExist &&
                    <div className="text-base text-red-600">{userNotExist}</div>
                }
                <form action="" onSubmit={handleSubmit(handleLogin)}>
                    <div className="flex flex-col mt-3">
                            <label htmlFor="alternative" className="label-form">Usuário</label>
                        <div className="div-input relative">
                            <div className="absolute left-2 top-2">
                                <IoPerson size="22" />
                            </div>
                            <input
                                className="input-form"
                                type="text"
                                {...register('alternative')}
                                placeholder="Digite seu usuário"
                            />
                        </div>
                        {errors.alternative?.message && (
                            <div className="error-message">
                                {errors.alternative?.message}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="password" className="label-form">Senha</label>
                        <div className="div-input relative">
                            <div className="absolute left-2 top-2">
                                <IoLockClosed size="22" />
                            </div>
                            <input
                                className="input-form"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                placeholder="Digite sua senha"
                            />
                            <div onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 cursor-pointer">
                                {showPassword ? <IoEye size="22" /> : <IoEyeOff size="22" />}
                            </div>
                        </div>
                        {errors.password?.message && (
                            <div className="error-message">
                                {errors.password?.message}
                            </div>
                        )}

                    </div>
                    <div className="flex flex-col mt-3">
                        <button
                            className="btn-login"
                            type="submit"
                        >
                            {loading ? <span className="animate-spin"><CgSpinnerTwo size={20} /></span> : 'Acessar'}
                        </button>
                    </div>
                </form>
                <div onClick={() => setResetPassword(!resetPassword)} className="flex items-center justify-end mt-2 text-sm text-gray-500 underline hover:text-gray-600 cursor-pointer">Esqueci meu usuário e/ou senha</div>
                {resetPassword &&
                    <div className="absolute left-0 text-sm mt-2 bg-gray-50 p-2 rounded shadow border border-gray-300 text-gray-500">
                        <div className="flex justify-end"><IoClose className="cursor-pointer" onClick={() => setResetPassword(false)} /></div>
                        <h1>Para recuperar sua senha entre em contato com o suporte do setor de TI Grupo Solar.</h1>
                    </div>

                }
            </div>
        </div>
    );
};

export default LoginForm;
