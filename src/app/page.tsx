import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="md:w-1/3 w-full bg-['#0071BC] border-2 border-white shadow-md rounded h-96">
        
        <div className="px-4 my-3">
        <div className="w-[40%] m-auto mt-4">
          <Image src={require("@/assets/images/logo_grupo_blue.png")} alt={""} />
        </div>
        <div className="flex justify-center">
          <h1 className="text-xl font-bold">Bem vindo ao Portal Grupo Solar</h1>
        </div>
        <div className="flex justify-center">
          <h1>Faça login para acessar os serviços</h1>
        </div>
        </div>

        <div className="border-b-4 border-b-blue-500 border-t-4 border-t-yellow-500"/>
      </div>
    </main>
  )
}
