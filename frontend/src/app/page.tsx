import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white/80 p-8 text-center shadow-xl backdrop-blur-md md:max-w-lg lg:max-w-3xl">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">TaskFlow</span>
        </h1>
        <p className="mb-8 text-lg text-gray-700 sm:text-xl md:text-2xl">
          Your intuitive platform for managing tasks with ease and efficiency.
        </p>
        <div className="flex justify-center">
          <Button asChild size="lg" className="rounded-full px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105">
            <Link href="/tasks">Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}