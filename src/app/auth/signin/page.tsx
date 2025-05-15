"use client"
import { useState, useEffect } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formErrors, setFormErrors] = useState<{
    email?: string
    password?: string
  }>({})
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  // Tambahkan state untuk scrollY
  const [scrollY, setScrollY] = useState(0)
  
  // Get callbackUrl from URL search params using window object
  const [callbackUrl, setCallbackUrl] = useState('/dashboard')
  
  useEffect(() => {
    // Get callback URL from browser URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setCallbackUrl(params.get('callbackUrl') || '/dashboard')

      // Tambahkan event listener untuk scroll
      const handleScroll = () => {
        setScrollY(window.scrollY)
      }
      
      window.addEventListener('scroll', handleScroll)
      
      // Cleanup event listener
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl })
  }

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {}
    let isValid = true

    if (!email) {
      errors.email = 'Email harus diisi'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Format email tidak valid'
      isValid = false
    }

    if (!password) {
      errors.password = 'Password harus diisi'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Login gagal. Periksa kembali email dan password Anda.')
      } else {
        const session = await getSession()
        
        // Success animation before redirect
        await new Promise(resolve => setTimeout(resolve, 500))
        
        if ((session?.user as any)?.role === 'ADMIN') {
          router.push('/admin')
        } else {
          router.push(callbackUrl)
        }
      }
    } catch (error) {
      setError('Terjadi kesalahan saat login. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left Side - Hero Section */}
      <motion.div 
        className="hidden lg:block lg:w-1/2 relative"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated background */}
        <div 
          className="h-full w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          {/* Animated floating elements */}
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundImage: [
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 60%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Content overlay */}
          <div className="absolute inset-0 bg-black/20">
            <div className="h-full flex flex-col justify-between p-12">
              {/* Logo with animation */}
              <motion.div 
                className="flex items-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.div 
                  className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-white font-bold">JS</span>
                </motion.div>
                <span className="ml-3 font-bold text-white text-2xl">JelajahSabang</span>
              </motion.div>

              {/* Hero content */}
              <motion.div 
                className="max-w-md"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.h1 
                  className="text-5xl font-bold text-white mb-6 leading-tight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  Jelajahi Keindahan
                  <span className="block text-blue-200">Sabang Bersama Kami</span>
                </motion.h1>
                <motion.p 
                  className="text-white/90 text-lg leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  Temukan destinasi wisata terbaik, akomodasi nyaman, dan pengalaman tak terlupakan di ujung barat Indonesia.
                </motion.p>
              </motion.div>

              {/* Features with stagger animation */}
              <motion.div 
                className="grid grid-cols-3 gap-4 text-white/80"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                {['100+ Destinasi', 'Booking Mudah', 'Pemandu Lokal'].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="text-center text-sm backdrop-blur-sm bg-white/10 rounded-lg p-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  >
                    {feature}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div 
          className="w-full max-w-md"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Mobile Logo */}
          <motion.div 
            className="mb-8 lg:hidden flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">JS</span>
              </div>
              <span className="ml-3 font-bold text-blue-600 text-2xl">JelajahSabang</span>
            </div>
          </motion.div>
          
          {/* Form Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            whileHover={{ y: -2, transition: { duration: 0.3 } }}
          >
            {/* Error Alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Selamat Datang Kembali
              </h2>
              <p className="text-gray-600">
                Masuk ke akun Anda untuk melanjutkan petualangan di Sabang
              </p>
            </motion.div>

            {/* Google Sign In Button */}
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.65, duration: 0.5 }}
>
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <Button
      onClick={handleGoogleSignIn}
      type="button"
      className="w-full mb-6 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group"
    >
      <svg className="w-5 h-5 transition-transform group-hover:scale-110 duration-300" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      <span>Masuk dengan Google</span>
    </Button>
  </motion.div>
</motion.div>

{/* Divider */}
<motion.div 
  className="flex items-center gap-4 mb-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.7, duration: 0.5 }}
>
  <div className="flex-grow h-px bg-gray-300"></div>
  <span className="text-sm text-gray-500 whitespace-nowrap">Atau masuk dengan</span>
  <div className="flex-grow h-px bg-gray-300"></div>
</motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="space-y-1.5"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`transition-all duration-300 ${
                      formErrors.email
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                </motion.div>
                <AnimatePresence>
                  {formErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm text-red-600"
                    >
                      {formErrors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                className="space-y-1.5"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`transition-all duration-300 ${
                      formErrors.password
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                </motion.div>
                <AnimatePresence>
                  {formErrors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm text-red-600"
                    >
                      {formErrors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Remember me & Forgot password */}
              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <motion.div 
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                    Ingat saya
                  </label>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Lupa password?
                  </Link>
                </motion.div>
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-300 ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <motion.svg
                          className="w-5 h-5 mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </motion.svg>
                        Loading...
                      </div>
                    ) : (
                      "Masuk"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </form>

            {/* Register link */}
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <p className="text-sm text-gray-600">
                Belum punya akun?{' '}
                <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                  <Link
                    href="/auth/signup"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Daftar sekarang
                  </Link>
                </motion.span>
              </p>
            </motion.div>

            {/* Back to home */}
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                <Link 
                  href="/" 
                  className="text-sm text-gray-500 hover:text-blue-600 flex items-center justify-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Kembali ke halaman utama
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}