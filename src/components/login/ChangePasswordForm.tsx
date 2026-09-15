'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IoArrowBack, IoEye, IoEyeOff, IoKey } from 'react-icons/io5'
import { useAuthContext } from "@/contexts/AuthContext";
import { CgSpinnerTwo } from "react-icons/cg";
import { useRouter } from "next/navigation";

interface AccessProps {
    first: any;
    code: any;
}
const ChangePasswordForm = (props: AccessProps) => {
    const access = props.first === 'true' ? true : false
    const router = useRouter();
    const { changePassword, loading, userChanged } = useAuthContext();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [resetPassword, setResetPassword] = useState<boolean>(false);

    const LoginValidate = z.object({
        code: z.string(),
        oldPassword: !access ? z.string().min(1, 'Digite a senha anterior') : z.string(),
        newPassword: z.string().min(1, 'Digite a nova senha')
    })
    type FormData = z.infer<typeof LoginValidate>;

    const { handleSubmit, register, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            code: props.code,
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
        <div className="w-full max-w-sm sm:max-w-md px-5 sm:px-6 py-6 sm:py-8 bg-white shadow-xl overflow-hidden rounded-xl border border-black/5">
            <div className="flex flex-col justify-center">
                <div className="w-44 sm:w-52 mx-auto">
                    <Image
                        src={require('@/assets/images/logo_grupo.png')}
                        alt="Grupo Solar"
                    />
                </div>
                <div className="flex justify-center mt-4 mb-1">
                    <h1 className="text-lg sm:text-xl text-gray-600 font-semibold text-center">
                        Portal Grupo Solar
                    </h1>
                </div>
                {access &&
                    <div className="flex flex-col items-center justify-center p-2 mt-4 bg-solar-50 border border-solar-200 rounded-md">
                        <h1 className="text-sm text-solar-800 font-bold text-center uppercase">
                            Primeiro acesso
                        </h1>
                        <h1 className="px-2 sm:px-4 text-xs text-gray-500 font-semibold text-center uppercase mt-2">
                            Este é seu primeiro acesso, você deve cadastrar uma senha, com, no mínimo 5 caracteres
                        </h1>
                    </div>
                }
                {!access &&
                    <div className="flex flex-col items-center justify-center p-2 mt-4 bg-gray-50 border border-gray-200 rounded-md">
                        <h1 className="text-sm text-gray-700 font-bold text-center uppercase">
                            Alteração de senha
                        </h1>
                        <h1 className="px-2 sm:px-4 text-xs text-gray-500 font-semibold text-center uppercase mt-2">
                            Digite sua senha antiga e sua senha nova deve conter no mínimo 5 caracteres.
                        </h1>
                    </div>
                }
                {userChanged &&
                    <div className="flex flex-col items-center justify-center p-2 mt-4 bg-red-50 border border-red-200 rounded-md">
                        <h1 className="text-sm text-red-600 font-semibold text-center">
                            {userChanged}
                        </h1>
                    </div>
                }
            </div>
            <div className="pt-4 sm:pt-6">
                <form action="" onSubmit={handleSubmit(handleChangePassword)}>
                    {!access &&
                        <div className="flex flex-col">
                            <label htmlFor="oldPassword" className="label-form">Senha anterior</label>
                            <div className="div-input relative mt-1">
                                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                                    <IoKey size="20" />
                                </div>
                                <input
                                    id="oldPassword"
                                    className="input-form"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('oldPassword')}
                                    placeholder="Digite a senha anterior"
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
                            {errors.oldPassword?.message && (
                                <div className="error-message">
                                    {errors.oldPassword?.message}
                                </div>
                            )}
                        </div>
                    }
                    <div className="flex flex-col mt-4">
                        <label htmlFor="newPassword" className="label-form">Nova senha</label>
                        <div className="div-input relative mt-1">
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                                <IoKey size="20" />
                            </div>
                            <input
                                id="newPassword"
                                className="input-form"
                                type={resetPassword ? 'text' : 'password'}
                                {...register('newPassword')}
                                placeholder="Digite a nova senha"
                            />
                            <button
                                type="button"
                                onClick={() => setResetPassword(!resetPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                aria-label={resetPassword ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                {!resetPassword ? <IoEye size="20" /> : <IoEyeOff size="20" />}
                            </button>
                        </div>
                        {errors.newPassword?.message && (
                            <div className="error-message">
                                {errors.newPassword?.message}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col mt-2">
                        <button
                            className="btn-login w-full"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <span className="animate-spin"><CgSpinnerTwo size={20} /></span> : access ? 'Cadastrar senha' : 'Alterar senha'}
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex justify-end">
                <button
                    className="flex items-center gap-1 justify-center mt-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                    onClick={() => router.back()}
                >
                    <IoArrowBack size={18} /> Voltar
                </button>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
