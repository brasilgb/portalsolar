'use client'
import LinkApp from "@/components/linkapp";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    const cookieAccess = async () => {
      const recoveredUser = getCookie('portal_access');
      if (recoveredUser) {
        setUserData(JSON.parse(recoveredUser));
      }
    };
    cookieAccess();
  }, []);

  useEffect(() => {
    let numfolder = userData?.folders?.length
    if (numfolder === 1) {
      let path = userData?.folders[0].path;
      router.push(`/${path}`);
    }
  }, [userData, router]);

  return (
    <div className="md:container m-auto md:grid md:grid-cols-5 md:gap-6 gap-4 flex flex-col justify-center animate__animated animate__fadeIn">
      {userData?.folders?.length === 1
        ? <div className="text-lg text-white ml-10 mt-10">Aguarde redirecionando <span className="text-xl animate-pulse">...</span></div>
        :
        userData?.folders?.map((lk: any, idx: number) => (
          <Fragment key={idx}>
            <LinkApp
              title={lk.path}
            />
          </Fragment>
        ))
      }

    </div>
  );

}
export default Home