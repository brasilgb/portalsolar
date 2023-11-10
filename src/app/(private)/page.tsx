'use client'
import { useUser } from "@/hooks/useUser";

export default function Home() {
  const { user } = useUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 md:px-0 px-4">
      <div className="md:w-1/4 w-full bg-gray-100 border-2 border-white shadow-lg rounded">

        <p className="my-5 text-sm font-mono">
          Cookie-user: {JSON.stringify(user, undefined, 4)}
        </p>

      </div>
    </main>
  );
}
