import Link from "next/link"
import { usePathname } from "next/navigation";
import React from 'react'

interface LinkProps {
    bgColor?: string;
    title?: string;
    titleColor?: string;
    text?: string;
    textColor?: string;
}
const LinkApp = ({ bgColor, text, textColor, title, titleColor }: LinkProps) => {
   
    return (
        <Link
            className={`${bgColor} p-4 rounded shadow border-2 border-white`}
            href={`/${title}`}
        >
            <h1 className={`${titleColor} text-xl uppercase text-center font-semibold mb-2`}>{title}</h1>
            <p className={`${textColor} text-base text-center font-medium`}>{text}</p>
        </Link>
    )
}

export default LinkApp