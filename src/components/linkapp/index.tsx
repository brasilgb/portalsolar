import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation";
import React from 'react'
import { FaRegChartBar, FaTruckMoving, FaUserLock } from "react-icons/fa";
import { GiChicken, GiRooster } from "react-icons/gi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiNotePencilFill, PiPresentationChart } from "react-icons/pi";
import { TbChartHistogram } from "react-icons/tb";

interface LinkProps {
    title?: string;
    type?: string;
}
const LinkApp = ({ title, type }: LinkProps) => {

    const description = (text: string | undefined) => {
        switch (text) {
            case 'bi3': text = 'Visualizações de dados referente a naturovos e lojas';
                break;
            case 'ecommerce': text = 'Operações relacionadas ao ecommerce';
                break;
            case 'assinatura': text = 'Acompanhamento das assinaturas de contratos';
                break;
            case 'integrado': text = 'Controle de reporte diário, extrato e remuneração';
                break;
            case 'gerencial': text = 'Visualizações de dados referente as Lojas por filial';
                break;
            case 'apptv': text = 'Visualizações de dados para a TV Administrativo';
                break;
            case 'liberacao': text = 'Liberação de eventos em programas';
                break;
            case 'frotas': text = 'Controle de veículos';
                break;
            case 'representatives': text = '';
                break;

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
                break;
            case 'integrado': text = <GiRooster size={70} color="#cc8903" />;
                break;
            case 'gerencial': text = <TbChartHistogram size={70} color="#cc8903" />;
                break;
            case 'apptv': text = <PiPresentationChart size={70} color="#0284c7" />;
                break;
            case 'liberacao': text = <FaUserLock size={70} color="#c43660" />;
                break;
            case 'frotas': text = <FaTruckMoving size={70} color="#19A873" />;
                break;
            case 'representatives': text = null;
                break;
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
                break;
            case 'integrado': text = {
                "title": " text-orange-600",
                "description": "text-gray-600"
            };
                break;
            case 'gerencial': text = {
                "title": " text-orange-600",
                "description": "text-gray-600"
            };
                break;
            case 'apptv': text = {
                "title": " text-amber-600",
                "description": "text-gray-600"
            };
                break;
            case 'liberacao': text = {
                "title": " text-cyan-600",
                "description": "text-gray-600"
            };
                break;
            case 'frotas': text = {
                "title": " text-green-600",
                "description": "text-gray-600"
            };
                break;
            case 'representatives': text = {
                "title": " text-gray-800",
                "description": "text-gray-600"
            };
                break;
        };
        return text;
    };

    const traductions = (title: string | undefined) => {
        switch (title) {
            case 'bi3': return 'BI3';
            case 'ecommerce': return 'E-commerce';
            case 'assinatura': return 'Assinatura';
            case 'integrado': return 'Integrado';
            case 'gerencial': return 'Gerencial';
            case 'apptv': return 'App TV';
            case 'liberacao': return 'Liberação';
            case 'frotas': return 'Frotas';
            case 'representatives': return 'Representantes';
            default: return title;
        }
    }
    return (
        <Link
            className="w-full sm:max-w-md text-orange-600 px-4 py-8 bg-gradient-to-t from-gray-200/80 via-gray-100/90 to-gray-200/80 shadow-md overflow-hidden rounded-md border-2 border-gray-300 duration-500 hover:scale-105 hover:shadow-lg"
            href={`/${title}`}
        >
            <h1 className={`text-2xl uppercase text-center font-bold drop-shadow ${textStyle(title).title}`}>{traductions(title)}</h1>
            <div className="flex justify-center py-4 drop-shadow">
                {title ? icons(title) : ''}
                {type === 'uevo' && <Image src={require('@/assets/images/logo_uevo.png')} alt={"uêvo"} height={60} />}
                {type === 'naturovos' && <Image src={require('@/assets/images/logo_naturovos.png')} alt="Naturovos" height={60} />}
                
            </div>
            <p className={`text-sm text-center font-semibold uppercase drop-shadow-md text-gray-500 ${textStyle(title).description}`}>{description(title)}</p>
        </Link>
    )
}

export default LinkApp