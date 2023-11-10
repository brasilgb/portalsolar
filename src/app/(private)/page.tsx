'use client'
import LinkApp from "@/components/linkapp";
import { useUser } from "@/hooks/useUser";

export default function Home() {
  const { user } = useUser();
  return (
    <div className="md:container m-auto md:grid md:grid-cols-5 md:gap-8 gap-4 flex flex-col justify-center">
      {/* <div>{JSON.stringify(user)}</div> */}
      <LinkApp
        bgColor="bg-gray-light"
        title="Aplicação um"
        titleColor="text-blue-primary"
        text="Texto explicativo da aplicação número um"
        textColor="text-blue-secundary"
      />
      <LinkApp
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
      />
    </div>
  );

}
