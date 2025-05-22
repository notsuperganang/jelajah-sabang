"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if current page is homepage
  const isHomepage = pathname === "/";

  // Don't render navigation on auth pages
  if (pathname?.startsWith("/auth")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Destinasi", href: "/destinasi" },
    { name: "Akomodasi", href: "/akomodasi" },
    { name: "Kuliner", href: "/kuliner" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        // Homepage: completely transparent initially, filled when scrolled
        // Other pages: always filled
        isHomepage
          ? isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-2xl border-b border-gray-100"
            : "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-2xl border-b border-gray-100"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-14 h-14 transition-all duration-300">
                <img
                  src={
                    isHomepage
                      ? isScrolled ? "/logo-biru-no-bg.png" : "/logo-putih-no-bg.png"
                      : "/logo-biru-no-bg.png"
                  }
                  alt="JelajahSabang Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xl font-bold transition-colors duration-300 ${isHomepage
                      ? isScrolled ? "text-blue-700" : "text-white"
                      : "text-blue-700"
                    }`}
                >
                  JelajahSabang
                </span>
                <span
                  className={`text-xs font-medium transition-colors duration-300 -mt-1 ${isHomepage
                      ? isScrolled ? "text-blue-500" : "text-blue-200"
                      : "text-blue-500"
                    }`}
                >
                  Discover Paradise
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${pathname === item.href
                    ? isHomepage
                      ? isScrolled
                        ? "text-blue-600 bg-blue-50"
                        : "text-white bg-white/10 backdrop-blur-sm"
                      : "text-blue-600 bg-blue-50"
                    : isHomepage
                      ? isScrolled
                        ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        : "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ${pathname === item.href ? "w-6" : "w-0 group-hover:w-6"
                  }`}></span>
              </Link>
            ))}

            {/* Auth Section */}
            {session ? (
              <div className="flex items-center space-x-3 ml-4">
                {(session.user as any)?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${isHomepage
                        ? isScrolled
                          ? "text-purple-600 hover:bg-purple-50"
                          : "text-purple-200 hover:bg-white/10 backdrop-blur-sm"
                        : "text-purple-600 hover:bg-purple-50"
                      }`}
                  >
                    Admin
                  </Link>
                )}

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-300 ${isHomepage
                        ? isScrolled
                          ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          : "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${isHomepage
                        ? isScrolled ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                        : "bg-blue-600 text-white"
                      }`}>
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">
                      {session.user?.name?.split(' ')[0]}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 backdrop-blur-md"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {session.user?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {session.user?.email}
                          </p>
                        </div>

                        <div className="py-2">
                          <Link
                            href="/dashboard"
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15v-2a2 2 0 012-2h2a2 2 0 012 2v2" />
                            </svg>
                            <span>Dashboard</span>
                          </Link>

                          <button
                            onClick={() => {
                              signOut();
                              setIsDropdownOpen(false);
                            }}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Sign out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className={`${isHomepage
                      ? isScrolled
                        ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        : "text-white hover:bg-white/10 backdrop-blur-sm"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    } transition-all duration-300 font-medium px-6 rounded-full`}
                >
                  <Link href="/auth/signin">Login</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 shadow-lg hover:shadow-xl rounded-full px-6 font-medium"
                >
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${isHomepage
                  ? isScrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10 backdrop-blur-sm"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white/98 backdrop-blur-md rounded-xl shadow-2xl mt-3 overflow-hidden border border-gray-100"
            >
              <div className="px-2 pt-4 pb-4 space-y-1">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${pathname === item.href
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {session ? (
                  <>
                    <div className="border-t border-gray-100 mt-3 pt-3">
                      <div className="px-4 py-2">
                        <p className="text-sm font-medium text-gray-900">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {session.user?.email}
                        </p>
                      </div>

                      <Link
                        href="/dashboard"
                        className="block px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>

                      {(session.user as any)?.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          className="block px-4 py-3 rounded-lg text-purple-600 hover:bg-purple-50 transition-all font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          Admin
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all font-medium"
                      >
                        Sign out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 p-3 border-t border-gray-100 mt-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                      <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-full"
                    >
                      <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}