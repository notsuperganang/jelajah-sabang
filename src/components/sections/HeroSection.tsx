'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

// Hero carousel images
const heroImages = [
  {
    id: 1,
    src: 'https://mediaim.expedia.com/destination/2/c7219add92583f48cd9a2e1baa479e6b.jpg',
    title: 'Jelajahi Keindahan Sabang',
    subtitle: 'Temukan pesona alam bawah laut, pantai eksotis, dan warisan sejarah di ujung barat Indonesia'
  },
  {
    id: 2,
    src: 'https://www.safariwisata.co.id/wp-content/uploads/2021/02/Pantai-Iboih-Sabang-7.jpg',
    title: 'Pantai Iboih',
    subtitle: 'Surga snorkeling dan diving dengan terumbu karang eksotis'
  },
  {
    id: 3,
    src: 'https://cdn.antaranews.com/cache/1200x800/2019/11/23/D8A59EEB-434E-4CEC-BD92-0642AC3B587B.jpeg',
    title: 'Kilometer Nol Indonesia',
    subtitle: 'Monumen ikonik di ujung barat NKRI dengan pemandangan Samudera Hindia'
  }
]

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <motion.div
          key={image.id}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat`}
          style={{
            backgroundImage: `url(${image.src})`,
            opacity: index === currentSlide ? 1 : 0,
          }}
          initial={{ scale: 1.1 }}
          animate={{ 
            scale: index === currentSlide ? 1 : 1.1,
            opacity: index === currentSlide ? 1 : 0 
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {heroImages[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {heroImages[currentSlide].subtitle}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/akomodasi">
                <span>Booking Sekarang</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              <Link href="/destinasi">
                Lihat Destinasi
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 tracking-wider">SCROLL</span>
          <motion.div
            className="w-px h-8 bg-white"
            animate={{ height: [32, 48, 32] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection