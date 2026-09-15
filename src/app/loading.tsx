import React from 'react'

type Props = {}

const Loading = (props: Props) => {
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-sm">
            <div className="w-14 h-14 rounded-full border-4 border-gray-200 border-t-solar-500 animate-spin" />
            <p className="text-sm font-medium text-gray-500">Carregando...</p>
        </div>
    )
}

export default Loading