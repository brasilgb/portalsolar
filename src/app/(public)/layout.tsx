import { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
    title: 'Login - Portal Grupo Solar',
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <AuthProvider>
                {children}
            </AuthProvider>
        </div>
    );
}
