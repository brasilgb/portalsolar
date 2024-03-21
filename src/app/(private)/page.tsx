'use client'

import LinkApp from "@/components/linkapp";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    const loadStorage = async () => {
      const recoveredUser = localStorage.getItem('portal_user');
      if (recoveredUser) {
        setUserData(JSON.parse(recoveredUser));
      }
    };
    loadStorage();
  }, [localStorage]);

  useEffect(() => {
    let numfolder = userData?.folders?.length
    if (numfolder === 1) {
      let path = userData?.folders[0].path;
      router.push(`/${path}`);
    }
  }, [userData]);

  return (
    <div className="md:container m-auto md:grid md:grid-cols-5 md:gap-8 gap-4 flex flex-col justify-center">
      {userData?.folders?.length === 1 
      ? <div className="text-lg text-white ml-10 mt-10">Aguarde redirecionando <span className="text-xl animate-pulse">...</span></div>
    :
      userData?.folders?.map((lk: any, idx: number) => (
        <Fragment key={idx}>
          <LinkApp
            bgColor="bg-gray-light"
            title={lk.path}
            titleColor="text-blue-primary"
            text=""
            textColor="text-blue-secundary"
          />
        </Fragment>
      ))
    }
      
    </div>
  );

}
export default Home