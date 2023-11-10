'use client'
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { IoChevronDown, IoPerson } from "react-icons/io5";

const Profile = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { user } = useUser();

    return (
        <>
            {showMenu &&
                <div className="absolute bg-gray-500 opacity-40 top-0 right-0 bottom-0 left-0 z-0" onClick={() => setShowMenu(false)}></div>
            }
            <div className="relative">
                <button
                    className="border border-gray-300 py-0.5 px-1 rounded flex items-center z-10"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <IoPerson size={24} color="#707070" />
                    <div className={`${showMenu ? '-rotate-180 duration-300' : 'rotate-0 duration-300'}`}>
                        <IoChevronDown size={20} color="#707070" />
                    </div>

                </button>
                {showMenu &&
                    <div className="absolute right-0 top-10 w-80 bg-gray-middle border border-white shadow-lg rounded p-3">
                        <p className="text-sm font-mono">
                            {JSON.stringify(user?.success, undefined, 4)}
                        </p>
                    </div>
                }

            </div>
        </>


    );
}

export default Profile;