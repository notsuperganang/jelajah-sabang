"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span
                className={`text-2xl font-bold ${
                  isScrolled ? "text-blue-600" : "text-blue-600"
                } transition-colors duration-300`}
              >
                JelajahSabang
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {["Beranda", "Destinasi", "Akomodasi", "Kuliner", "Kontak"].map(
              (item, index) => (
                <Link
                  key={index}
                  href={item === "Beranda" ? "/" : `/${item.toLowerCase()}`}
                  className={`relative group ${
                    isScrolled ? "text-gray-800" : "text-white"
                  } font-medium transition-colors duration-300`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ),
            )}

            {/* Auth Section */}
            {session ? (
              <div className="flex items-center space-x-4">
                <span
                  className={`${
                    isScrolled ? "text-gray-800" : "text-white"
                  } font-medium`}
                >
                  Hi, {session.user?.name}
                </span>
                <Link
                  href="/dashboard"
                  className={`relative group ${
                    isScrolled ? "text-blue-600" : "text-white"
                  } font-medium transition-colors duration-300`}
                >
                  Dashboard
                  <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                </Link>
                {(session.user as any)?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className={`relative group ${
                      isScrolled ? "text-blue-600" : "text-white"
                    } font-medium transition-colors duration-300`}
                  >
                    Admin
                    <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
                <Button
                  onClick={() => signOut()}
                  variant="ghost"
                  size="sm"
                  className={`${
                    isScrolled
                      ? "bg-transparent text-blue-600 hover:bg-blue-50"
                      : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                  } border border-transparent transition-all duration-300 font-medium rounded-full px-6`}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className={`${
                    isScrolled
                      ? "bg-transparent text-blue-600 hover:bg-blue-50"
                      : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                  } border border-transparent transition-all duration-300 font-medium rounded-full px-6`}
                >
                  <Link href="/auth/signin">Login</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className={`${
                    isScrolled
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  } transition-all duration-300 shadow-lg hover:shadow-xl rounded-full px-6 font-medium`}
                >
                  <Link href="/auth/signup">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:opacity-75 transition-opacity`}
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
              className="md:hidden bg-white/95 backdrop-blur-md rounded-xl shadow-xl mt-2 overflow-hidden border border-gray-100"
            >
              <div className="px-2 pt-3 pb-4 space-y-1">
                {["Beranda", "Destinasi", "Akomodasi", "Kuliner", "Kontak"].map(
                  (item, index) => (
                    <Link
                      key={index}
                      href={item === "Beranda" ? "/" : `/${item.toLowerCase()}`}
                      className="block px-4 py-3 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                    >
                      {item}
                    </Link>
                  ),
                )}
                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-3 rounded-lg text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-2 p-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <Link href="/auth/signin">Login</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <Link href="/auth/signup">Register</Link>
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

