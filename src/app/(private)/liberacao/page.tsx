'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthContext } from "@/contexts/AuthContext";
import { CgSpinnerTwo } from "react-icons/cg";
import { IoKey } from "react-icons/io5";
import Link from "next/link";
import servicelogin from "@/libs/servicelogin";

export const LoginValidate = z.object({
    userCode: z.any(),
    userName: z.string(),
    programCode: z.string().min(1, 'Digite o código do programa'),
    eventCode: z.string().min(1, 'Digite o código do evento'),
    parameter: z.string().min(1, 'Digite o parâmetro para o cálculo'),
    releaseKey: z.number(),
})
type FormData = z.infer<typeof LoginValidate>;
const Liberacao = () => {
    const { user, setLoading, loading } = useAuthContext();
    const [errorEvent, setErrorEvent] = useState('');
    const [relaseKey, setRelaseKey] = useState('');

    useEffect(() => {
        setValue('userCode', user?.userCode);
        setValue('userName', user?.userName);
    }, [user]);
    const { handleSubmit, register, setValue, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            userCode: '',
            userName: '',
            programCode: '',
            eventCode: '',
            parameter: '',
            releaseKey: 0,
        },
        mode: 'onBlur',
        resolver: zodResolver(LoginValidate)
    });


    const handleLogin = async (values: any) => {
        setLoading(true);
        await servicelogin.post('(LOG_USU_VALIDATE_EVENT)', {
            "queryType": 1,
            "userCode": Number(values.userCode),
            "programCode": Number(values.programCode),
            "eventCode": Number(values.eventCode),
            "parameter": Number(values.parameter),
            "releaseKey": 0
        })
            .then((result) => {
                const { success, releaseKey, message } = result.data.event;
                if (!success) {
                    setErrorEvent(message);
                }
                if (success) {
                    setRelaseKey(releaseKey);
                }
            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            })
    }

    return (
        <div className="flex items-center justify-center bg-gray-100 border border-white rounded-md shadow-md py-10">
            <div className="border border-gray-200 p-8 bg-white rounded-md md:w-2/3">
                <div className="flex items-center justify-start gap-2 mb-4 text-sm text-gray-500 font-bold border-b drop-shadow">
                    <IoKey />
                    <span className="uppercase">Geração de chave de liberação</span>
                </div>
                <form action="" onSubmit={handleSubmit(handleLogin)}>
                    {errorEvent &&
                        <div className="bg-yellow-100 text-red-400 text-sm font-medium p-2">{errorEvent}</div>
                    }
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col mt-4">
                            <label htmlFor="userCode" className="label-form">Código do usuário</label>
                            <div className="div-input relative">
                                <input
                                    className="input-form"
                                    type="text"
                                    {...register('userCode')}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="userName" className="label-form">Nome do usuário</label>
                            <div className="div-input relative">
                                <input
                                    className="input-form "
                                    type="text"
                                    {...register('userName')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col mt-4">
                            <label htmlFor="programCode" className="label-form">Código do programa</label>
                            <div className="div-input relative">
                                <input
                                    className="input-form "
                                    type="text"
                                    {...register('programCode')}
                                />
                            </div>
                            {errors.programCode?.message && (
                                <div className="error-message">
                                    {errors.programCode?.message}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="eventCode" className="label-form">Código do evento</label>
                            <div className="div-input relative">
                                <input
                                    className="input-form "
                                    type="text"
                                    {...register('eventCode')}
                                />
                            </div>
                            {errors.eventCode?.message && (
                                <div className="error-message">
                                    {errors.eventCode?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col mt-4">
                            <label htmlFor="parameter" className="label-form">Parâmetro de cálculo</label>
                            <div className="div-input relative">
                                <input
                                    className="input-form "
                                    type="text"
                                    {...register('parameter')}
                                />
                            </div>
                            {errors.parameter?.message && (
                                <div className="error-message">
                                    {errors.parameter?.message}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col mt-4">
                            <label htmlFor="releasekey" className="label-form">Chave de liberação gerada</label>
                            <div className="div-input relative">
                                <input
                                    className={`input-form ${relaseKey && '!bg-blue-primary !text-white'}`}
                                    type="text"
                                    value={relaseKey}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col mt-4">
                            <button
                                className="btn-login"
                                type="submit"
                            >
                                {loading ? <span className="animate-spin"><CgSpinnerTwo size={20} /></span> : 'Gerar chave de liberação'}
                            </button>
                        </div>
                        <div className="flex flex-col mt-4">
                            <Link
                                className="btn-login"
                                href="/"
                            >
                                Fechar
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Liberacao