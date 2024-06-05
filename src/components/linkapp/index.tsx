import Link from "next/link"
import { usePathname } from "next/navigation";
import React from 'react'
import { FaRegChartBar } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiNotePencilFill } from "react-icons/pi";

interface LinkProps {
    title?: string;
}
const LinkApp = ({ title }: LinkProps) => {

    const description = (text: string | undefined) => {
        switch (text) {
            case 'bi3': text = 'Visualizações de dados referente a naturovos e lojas';
                break;
            case 'ecommerce': text = 'Operações relacionadas ao ecommerce';
                break;
            case 'assinatura': text = 'Acompanhamento das assinaturas de contratos';
        };
        return text;
    };

    const icons = (text: any | undefined) => {
        switch (text) {
            case 'bi3': text = <FaRegChartBar size={70} color="#b44f4f" />;
                break;
            case 'ecommerce': text = <MdOutlineShoppingCart size={70} color="#b4994e" />;
                break;
            case 'assinatura': text = <PiNotePencilFill size={70} color="#4f8cb4" />;
        };
        return text;
    };

    const textStyle = (text: any | undefined) => {
        switch (text) {
            case 'bi3': text = {
                "title": "text-cyan-700",
                "description": "text-gray-600"
            };
                break;
            case 'ecommerce': text = {
                "title": "text-lime-600",
                "description": "text-gray-600"
            };
                break;
            case 'assinatura': text = {
                "title": "text-red-500",
                "description": "text-gray-600"
            };
        };
        return text;
    };

    return (
        <Link className="w-full sm:max-w-md px-4 py-8 bg-gradient-to-t from-gray-200/80 via-gray-100/90 to-gray-200/80 shadow-md overflow-hidden rounded-md border-2 border-gray-300 duration-500 hover:scale-105 hover:shadow-lg"
            href={`/${title}`}
        >
            <h1 className={`text-2xl uppercase text-center font-bold drop-shadow ${textStyle(title).title}`}>{title}</h1>
            <div className="flex justify-center py-4 drop-shadow">
                {icons(title)}
            </div>
            <p className={`text-base text-center font-normal drop-shadow text-gray-600 ${textStyle(title).description}`}>{description(title)}</p>
        </Link>
    )
}

export default LinkApp