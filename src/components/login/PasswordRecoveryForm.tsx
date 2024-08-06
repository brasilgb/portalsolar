'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IoArrowBack, IoMail } from 'react-icons/io5'
import { useAuthContext } from "@/contexts/AuthContext";
import { CgSpinnerTwo } from "react-icons/cg";
import { useRouter } from "next/navigation";

const PasswordRecoveryForm = () => {
    const { recoveryPassword, loading, userChanged } = useAuthContext();
    const router = useRouter();
    const LoginValidate = z.object({
        email: z.string().min(1, 'Digite o e-mail').email('E-mail inválido')
    })
    type FormData = z.infer<typeof LoginValidate>;

    const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            email: '',
        },
        mode: 'onBlur',
        resolver: zodResolver(LoginValidate)
    });

    const handleRecoveryPassword = async (values: any) => {
        await recoveryPassword(values);
    }

    return (
        <div className={`w-full sm:max-w-md px-4 p-8 bg-gradient-to-t from-gray-200/80 via-gray-100/90 to-gray-200/80 shadow-md overflow-hidden rounded-md border-2 border-gray-300`}>
            <div className="flex flex-col justify-center">
                <div className="w-[40%] m-auto">
                    <Image
                        src={require('@/assets/images/logo_grupo_blue.png')}
                        alt={''}
                    />
                </div>
                <div className="flex justify-center md:mb-0 mb-2 md:mt-4">
                    <h1 className="md:text-xl text-lg text-gray-500 mt-4 drop-shadow">
                        Portal Grupo Solar
                    </h1>
                </div>

                <div className="flex flex-col items-center justify-center p-2 mt-4 mx-4 bg-gray-50 border border-white rounded-md">
                    <h1 className="text-sm text-blue-400 font-bold text-center drop-shadow-md uppercase">
                        Recuperação de senha
                    </h1>
                    <h1 className="md:px-4 text-xs text-gray-500 font-semibold text-center drop-shadow-md uppercase mt-2">
                        Digite seu e-mail e enviaremos instruções para alteração de sua senha.
                    </h1>
                </div>

                {userChanged &&
                    <div className="flex flex-col items-center justify-center p-2 mt-4 mx-4 bg-yellow-100 border border-white rounded-md">
                        <h1 className="text-sm text-red-400 font-semibold text-center drop-shadow-md">
                            {userChanged}
                        </h1>
                    </div>
                }
            </div>
            <div className="p-4">
                <form action="" onSubmit={handleSubmit(handleRecoveryPassword)}>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="email" className="label-form">E-mail</label>
                        <div className="div-input relative">
                            <div className="absolute left-2 top-2">
                                <IoMail size="22" />
                            </div>
                            <input
                                className="input-form"
                                type="mail"
                                {...register('email')}
                                placeholder="Digite seu e-mail"
                            />
                        </div>
                        {errors.email?.message && (
                            <div className="error-message">
                                {errors.email?.message}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col mt-3">
                        <button
                            className="btn-login"
                            type="submit"
                        >
                            {loading ? <span className="animate-spin"><CgSpinnerTwo size={20} /></span> : 'Recuperar senha'}
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex justify-end">
                <button
                    className="flex items-center justify-center mt-2 text-sm text-gray-500 underline hover:text-gray-600 cursor-pointer"
                    onClick={() => router.back()}
                >
                    <IoArrowBack size={18} /> Voltar
                </button>
            </div>
        </div>
    );
};

export default PasswordRecoveryForm;