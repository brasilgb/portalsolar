'use client'
import LinkApp from "@/components/linkapp";

const Home = () => {

  return (
    <>
      <div>
        <p>My cookie value: {'user'}</p>
      </div>

      <div className="md:container m-auto md:grid md:grid-cols-5 md:gap-8 gap-4 flex flex-col justify-center">
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
    </>

  );

}
export default Home