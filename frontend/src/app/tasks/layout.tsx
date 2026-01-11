import { Header } from '@/components/Header';

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container mx-auto py-6 px-4">
        {children}
      </main>
    </>
  );
}
