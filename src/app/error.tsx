'use client'
import { useEffect } from 'react'
import { IoRefresh, IoWarning } from 'react-icons/io5'

type Props = {
    error: Error & { digest?: string }
    reset: () => void
}

const ErrorPage = ({ error, reset }: Props) => {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-solar-300 via-solar-500 to-solar-600 px-4 py-8 sm:px-6">
            <div
                className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl sm:h-96 sm:w-96"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-black/10 blur-3xl sm:h-96 sm:w-96"
                aria-hidden
            />
            <div className="relative w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-xl border border-black/5 shadow-xl flex flex-col items-center justify-start">
                <div className="text-solar-500 mb-2">
                    <IoWarning size={64} />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-700">Algo deu errado</h1>
                <p className="text-sm sm:text-base font-semibold text-center text-gray-600 mt-3">Ocorreu um erro inesperado ao carregar esta página.</p>
                <p className="text-sm font-medium text-center text-gray-500 mt-2">Tente novamente ou entre em contato com o setor responsável se o problema continuar.</p>
                <button
                    className="btn-login gap-2"
                    onClick={() => reset()}
                >
                    <IoRefresh size={20} />
                    <span>Tentar novamente</span>
                </button>
            </div>
        </div>
    )
}

export default ErrorPage
