import Link from "next/link"
import React from 'react'
import { IoArrowBack } from "react-icons/io5"

type Props = {}

const notFound = (props: Props) => {
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
        <div className="text-7xl sm:text-8xl text-solar-500 font-black drop-shadow-sm mb-2">
          404
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-700">Página ou url não encontrada</h1>
        <p className="text-sm sm:text-base font-semibold text-center text-gray-600 mt-3">Esta página ou url não existe ou não está acessível!</p>
        <p className="text-sm font-medium text-center text-gray-500 mt-2">Se você acha que deveria ver o conteúdo desta página entre em contato com o setor responsável!</p>
        <Link
          className="btn-login gap-2"
          href="/"
        >
          <IoArrowBack size={20} />
          <span>Voltar ao início</span>
        </Link>
      </div>
    </div>
  )
}

export default notFound