// src/components/Navigation.tsx
"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              JelajahSabang
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Beranda
            </Link>
            <Link href="/destinasi" className="hover:text-blue-200 transition-colors">
              Destinasi
            </Link>
            <Link href="/akomodasi" className="hover:text-blue-200 transition-colors">
              Akomodasi
            </Link>
            <Link href="/kuliner" className="hover:text-blue-200 transition-colors">
              Kuliner
            </Link>
            <Link href="/kontak" className="hover:text-blue-200 transition-colors">
              Kontak
            </Link>
            
            {/* Auth Section */}
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-blue-100">Hi, {session.user?.name}</span>
                <Link href="/dashboard" className="hover:text-blue-200 transition-colors">
                  Dashboard
                </Link>
                {(session.user as any)?.role === 'ADMIN' && (
                  <Link href="/admin" className="hover:text-blue-200 transition-colors">
                    Admin
                  </Link>
                )}
                <Button 
                  onClick={() => signOut()} 
                  variant="outline" 
                  size="sm"
                  className="text-blue-600 border-white hover:bg-white"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="outline" size="sm" className="text-blue-600 border-white hover:bg-white">
                  <Link href="/auth/signin">Login</Link>
                </Button>
                <Button asChild size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/auth/signup">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 rounded-md hover:bg-blue-700">
                Beranda
              </Link>
              <Link href="/destinasi" className="block px-3 py-2 rounded-md hover:bg-blue-700">
                Destinasi
              </Link>
              <Link href="/akomodasi" className="block px-3 py-2 rounded-md hover:bg-blue-700">
                Akomodasi
              </Link>
              <Link href="/kuliner" className="block px-3 py-2 rounded-md hover:bg-blue-700">
                Kuliner
              </Link>
              <Link href="/kontak" className="block px-3 py-2 rounded-md hover:bg-blue-700">
                Kontak
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}