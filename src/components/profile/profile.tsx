'use client'
import { useUser } from "@/hooks/useUser";

const Profile = () => {

    const { user } = useUser();

    return (

        <div className="">

            <p className="my-5 text-sm font-mono">
                {JSON.stringify(user?.success, undefined, 4)}
            </p>

        </div>
    );
}

export default Profile;