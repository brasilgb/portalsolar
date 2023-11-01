import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Portal Grupo Solar</h1>
        <ul className="flex justify-center gap-4 mt-4">
          <li><a className="text-base text-gray-600 hover:underline hover:text-gray-800 font-semibold" href="/">Portal</a></li>
          <li><a className="text-base text-gray-600 hover:underline hover:text-gray-800 font-semibold" href="/apptv" target="_blank">AppTV</a></li>
          <li><a className="text-base text-gray-600 hover:underline hover:text-gray-800 font-semibold" href="/gerencial" target="_blank">Gerencial</a></li>
        </ul>
      </div>
    </main>
  )
}
