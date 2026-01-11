"use client";

import { AuthProvider } from '@/lib/state/authContext';
import { Header } from '@/components/Header'; // Import the new Header component
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            {/* <Header />  */}
            <main className="flex-grow"> 
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
