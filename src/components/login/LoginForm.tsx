'use client'
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IoEye, IoEyeOff, IoLockClosed, IoPerson } from 'react-icons/io5'
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { sign } from "crypto";

export const LoginValidate = z.object({
    code: z.string().min(1, 'Digite o usuário'),
    password: z.string().min(1, 'Digite a senha'),
})
type FormData = z.infer<typeof LoginValidate>;

const LoginForm = () => {
    const { signIn } = useAuthContext();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            code: '',
            password: ''
        },
        mode: 'onBlur',
        resolver: zodResolver(LoginValidate)
    });

    const handleLogin = async (values: any) => {
        await signIn(values);
    }

    return (
        <>
            <div className="px-4 my-3">
                <div className="w-[40%] m-auto mt-8">
                    <Image
                        src={require('@/assets/images/logo_grupo_blue.png')}
                        alt={''}
                    />
                </div>
                <div className="flex justify-center md:mb-0 mb-2">
                    <h1 className="md:text-2xl text-xl font-bold text-gray-500 mt-4">
                        Bem vindo ao Portal Grupo Solar
                    </h1>
                </div>
                <div className="flex justify-center text-gray-600">
                    <h1 className="md:text-xl text-base text-center">
                        Faça login para acessar os serviços
                    </h1>
                </div>
            </div>
            <div className="p-4">
                <form action="" onSubmit={handleSubmit(handleLogin)}>
                    <div className="flex flex-col mt-3">
                        <div className="div-input relative">
                            <div className="absolute left-2 top-2">
                                <IoPerson size="22" />
                            </div>
                            <input
                                className="input-form"
                                type="text"
                                {...register('code')}
                                placeholder="Digite seu usuário"
                            />
                        </div>
                        {errors.code?.message && (
                            <div className="error-message">
                                {errors.code?.message}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col mt-4">
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
                            Acessar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginForm;
