import { Metadata } from "next";
import PrivateLayoutClient from "./layout-client";

export const metadata: Metadata = {
    title: 'Portal Grupo Solar',
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return <PrivateLayoutClient>{children}</PrivateLayoutClient>;
}
