'use client'

import LinkApp from "@/components/linkapp";
import { Fragment, useEffect, useState } from "react";

const Home = () => {
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    const loadStorage = async () => {
      const recoveredUser = localStorage.getItem('portal_user');
      if (recoveredUser) {
        setUserData(JSON.parse(recoveredUser));
      }
    };
    loadStorage();
  }, []);

  return (
    <div className="md:container m-auto md:grid md:grid-cols-5 md:gap-8 gap-4 flex flex-col justify-center">
      {userData?.folders?.map((lk: any, idx: number) => (
        <Fragment key={idx}>
          <LinkApp
            bgColor="bg-gray-light"
            title={lk.path}
            titleColor="text-blue-primary"
            text=""
            textColor="text-blue-secundary"
          />
        </Fragment>
      ))}
      {/* <LinkApp
          bgColor="bg-gray-light"
          title="Aplicação dois"
          titleColor="text-blue-primary"
          text="Texto explicativo da aplicação número um"
          textColor="text-blue-secundary"
        />
        <LinkApp
          bgColor="bg-gray-light"
          title="Aplicação tres"
          titleColor="text-blue-primary"
          text="Texto explicativo da aplicação número um"
          textColor="text-blue-secundary"
        />
        <LinkApp
          bgColor="bg-gray-light"
          title="Aplicação quatro"
          titleColor="text-blue-primary"
          text="Texto explicativo da aplicação número um"
          textColor="text-blue-secundary"
        />
        <LinkApp
          bgColor="bg-gray-light"
          title="Aplicação cinco"
          titleColor="text-blue-primary"
          text="Texto explicativo da aplicação número um"
          textColor="text-blue-secundary"
        /> */}
    </div>
  );

}
export default Home