import { useRouter } from "next/navigation";
import React, { useEffect } from 'react'

const AppLoading = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 300)
    }, [])



    return (
        <div>AppLoading</div>
    )
}

export default AppLoading