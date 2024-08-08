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
        <div className={`w-full sm:max-w-md px-4 ${resetPassword ? 'py-0' : 'py-8'} bg-gradient-to-t from-gray-200/80 via-gray-100/90 to-gray-200/80 shadow-md overflow-hidden rounded-md border-2 border-gray-300`}>
            <div className="flex flex-col justify-center mt-8">
                <div className="w-[40%] m-auto">
                    <Image
                        src={require('@/assets/images/logo_grupo_blue.png')}
                        alt={''}
                    />
                </div>
                <div className="flex justify-center md:mb-0 mb-2">
                    <h1 className="md:text-xl text-lg text-gray-500 mt-4 drop-shadow">
                        Bem vindo ao Portal Grupo Solar
                    </h1>
                </div>
                <div className="flex justify-center text-gray-500">
                    <h1 className="md:text-lg text-sm text-center drop-shadow-md">
                        Faça login para acessar os serviços
                    </h1>
                </div>
                {changed &&
                    <div className="flex flex-col items-center justify-center p-2 mt-4 mx-4 bg-blue-100 border border-white rounded-md">
                        <h1 className="text-sm text-blue-400 font-bold text-center drop-shadow-md uppercase">
                            Senha alterada
                        </h1>
                        <h1 className="md:px-4 text-xs text-gray-500 font-semibold text-center drop-shadow-md uppercase mt-2">
                            Utilize a sua nova senha para acessar o Portal.
                        </h1>
                    </div>
                }
            </div>
            <div className="p-4">
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
                                {!showPassword ? <IoEye size="22" /> : <IoEyeOff size="22" />}
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
                {/* <Link 
                href="/passwordrecovery"
                className="flex items-center justify-end mt-2 text-sm text-gray-500 underline hover:text-gray-600 cursor-pointer">
                    Esqueci minha senha
                </Link> */}
            </div>
        </div>
    );
};

export default LoginForm;
