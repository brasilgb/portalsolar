'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IoEye, IoEyeOff, IoLockClosed, IoPerson } from 'react-icons/io5'
import { useAuthContext } from "@/contexts/AuthContext";
import { CgSpinnerTwo } from "react-icons/cg";
import { useSearchParams } from "next/navigation";

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
    const searchParams = useSearchParams();
    const search = searchParams.get('passwordChanged');
    const changed = search === 'true' ? true : false;

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
        <div className={`w-full max-w-sm sm:max-w-md px-5 sm:px-6 ${resetPassword ? 'py-0' : 'py-6 sm:py-8'} bg-white shadow-xl overflow-hidden rounded-xl border border-black/5`}>
            <div className="flex flex-col justify-center mt-4 sm:mt-6">
                <div className="w-44 sm:w-52 mx-auto">
                    <Image
                        src={require('@/assets/images/logo_grupo.png')}
                        alt="Grupo Solar"
                    />
                </div>
                <div className="flex justify-center mt-4 mb-1">
                    <h1 className="text-lg sm:text-xl text-gray-600 font-semibold text-center">
                        Bem vindo ao Portal Grupo Solar
                    </h1>
                </div>
                <div className="flex justify-center text-gray-500">
                    <h1 className="text-sm sm:text-base text-center">
                        Faça login para acessar os serviços
                    </h1>
                </div>
                {changed &&
                    <div className="flex flex-col items-center justify-center p-2 mt-4 bg-solar-50 border border-solar-200 rounded-md">
                        <h1 className="text-sm text-solar-800 font-bold text-center uppercase">
                            Senha alterada
                        </h1>
                        <h1 className="px-2 sm:px-4 text-xs text-gray-500 font-semibold text-center uppercase mt-2">
                            Utilize a sua nova senha para acessar o Portal.
                        </h1>
                    </div>
                }
            </div>
            <div className="pt-4 sm:pt-6">
                {userNotExist &&
                    <div className="text-sm text-red-600 mb-2">{userNotExist}</div>
                }
                <form action="" onSubmit={handleSubmit(handleLogin)}>
                    <div className="flex flex-col">
                        <label htmlFor="alternative" className="label-form">Usuário</label>
                        <div className="div-input relative mt-1">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                                <IoPerson size="20" />
                            </div>
                            <input
                                id="alternative"
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
                        <div className="div-input relative mt-1">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                                <IoLockClosed size="20" />
                            </div>
                            <input
                                id="password"
                                className="input-form"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                placeholder="Digite sua senha"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                {!showPassword ? <IoEye size="20" /> : <IoEyeOff size="20" />}
                            </button>
                        </div>
                        {errors.password?.message && (
                            <div className="error-message">
                                {errors.password?.message}
                            </div>
                        )}

                    </div>
                    <div className="flex flex-col mt-2">
                        <button
                            className="btn-login w-full"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <span className="animate-spin"><CgSpinnerTwo size={20} /></span> : 'Acessar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
