'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Tambahkan data testimonial hingga 15 entry
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Travel Blogger",
    avatar: "https://images.unsplash.com/photo-1494790108070-9d1a2c1b35bd?w=100&h=100&fit=crop&crop=face",
    comment: "Sabang adalah surga tersembunyi Indonesia. Pantai Iboih memberikan pengalaman diving yang tak terlupakan dengan terumbu karang yang masih alami.",
    rating: 5,
    location: "Australia"
  },
  {
    id: 2,
    name: "Budi Santoso",
    role: "Fotografer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    comment: "Kilometer Nol sangat iconic! Tempat yang sempurna untuk foto dan menikmati sunset. JelajahSabang sangat membantu perjalanan saya.",
    rating: 5,
    location: "Jakarta, Indonesia"
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Marine Biologist",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    comment: "Biodiversitas laut Sabang luar biasa! Saya menemukan banyak spesies langka di sini. Pengalaman yang sangat berharga untuk penelitian.",
    rating: 5,
    location: "Singapore"
  },
  {
    id: 4,
    name: "Ahmad Rahman",
    role: "Travel Vlogger",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    comment: "Kuliner Aceh di Sabang benar-benar autentik! Mie Aceh dan kopi Gayo-nya bikin nagih. Pelayanan JelajahSabang sangat profesional.",
    rating: 5,
    location: "Medan, Indonesia"
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Adventure Enthusiast",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    comment: "Dari snorkeling hingga hiking ke benteng bersejarah, Sabang offer everything! Tim JelajahSabang sangat helpful dan knowledgeable.",
    rating: 5,
    location: "Korea Selatan"
  },
  {
    id: 6,
    name: "David Miller",
    role: "History Professor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    comment: "Benteng Anoi Itam dan peninggalan sejarah lainnya di Sabang sangat memukau. Panduan tur JelajahSabang sangat berpengetahuan tentang sejarah lokal.",
    rating: 5,
    location: "United Kingdom"
  },
  {
    id: 7,
    name: "Putri Andini",
    role: "Solo Traveler",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    comment: "Perjalanan solo ke Sabang jadi sangat nyaman dengan bantuan JelajahSabang. Mereka sangat memperhatikan keamanan dan kenyamanan wisatawan.",
    rating: 5,
    location: "Yogyakarta, Indonesia"
  },
  {
    id: 8,
    name: "Hiroshi Tanaka",
    role: "Culinary Expert",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face",
    comment: "Sajian seafood di Sabang adalah yang terbaik! Segar dan dimasak dengan bumbu lokal yang khas. Food tour yang direkomendasikan JelajahSabang tidak mengecewakan.",
    rating: 5,
    location: "Japan"
  },
  {
    id: 9,
    name: "Anna Rodriguez",
    role: "Family Traveler",
    avatar: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=100&h=100&fit=crop&crop=face",
    comment: "Liburan keluarga terbaik! Anak-anak saya sangat menikmati melihat ikan-ikan berwarna di snorkeling spot. Paket family tour JelajahSabang sangat worth it.",
    rating: 5,
    location: "Mexico"
  },
  {
    id: 10,
    name: "Rafi Putra",
    role: "Dive Instructor",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face",
    comment: "Sebagai instruktur diving, saya sangat terkesan dengan keindahan bawah laut Sabang. Spot diving di sini layak masuk bucket list semua diver!",
    rating: 5,
    location: "Bali, Indonesia"
  },
  {
    id: 11,
    name: "Sophie Laurent",
    role: "Artist & Photographer",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face",
    comment: "Pemandangan di Sabang adalah inspirasi sempurna untuk karya seni. Warna laut, langit, dan vegetasi di sini begitu hidup dan memukau.",
    rating: 5,
    location: "France"
  },
  {
    id: 12,
    name: "Jiang Wei",
    role: "Business Traveler",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    comment: "Saya mengadakan retreat perusahaan di resort yang direkomendasikan JelajahSabang. Fasilitas lengkap dengan pemandangan laut yang menenangkan.",
    rating: 5,
    location: "China"
  },
  {
    id: 13,
    name: "Maria Gonzalez",
    role: "Marine Conservation Activist",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    comment: "Sangat senang melihat upaya konservasi di Sabang. Terumbu karang yang dilindungi menunjukkan hasil yang luar biasa. Program eco-tour JelajahSabang sangat edukatif.",
    rating: 5,
    location: "Spain"
  },
  {
    id: 14,
    name: "Thomas Anderson",
    role: "Adventure Filmmaker",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face",
    comment: "Mendokumentasikan keindahan Sabang untuk film dokumenter kami. Tim JelajahSabang membantu kami menemukan spot-spot terbaik yang jarang dikunjungi wisatawan.",
    rating: 5,
    location: "Canada"
  },
  {
    id: 15,
    name: "Dewi Susilowati",
    role: "Honeymoon Traveler",
    avatar: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?w=100&h=100&fit=crop&crop=face",
    comment: "Bulan madu yang sempurna di Sabang! Suasana romantis, resort yang nyaman, dan sunset yang menakjubkan. Package honeymoon JelajahSabang sangat recommended!",
    rating: 5,
    location: "Surabaya, Indonesia"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const TestimonialsSection = () => {
  // Mengubah state untuk menyimpan page number bukan index
  const [currentPage, setCurrentPage] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  
  // Jumlah review per page
  const reviewsPerPage = 3
  
  // Total page
  const totalPages = Math.ceil(testimonials.length / reviewsPerPage)
  
  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoplay) return

    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoplay, totalPages])

  const goToPage = (page: number) => {
    setCurrentPage(page)
    setIsAutoplay(false)
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoplay(true), 10000)
  }

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
    setIsAutoplay(false)
    setTimeout(() => setIsAutoplay(true), 10000)
  }

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages)
    setIsAutoplay(false)
    setTimeout(() => setIsAutoplay(true), 10000)
  }

  // Mendapatkan review untuk page saat ini
  const startIndex = currentPage * reviewsPerPage
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + reviewsPerPage)
  
  // Memastikan selalu ada 3 testimonial yang ditampilkan
  while (visibleTestimonials.length < reviewsPerPage) {
    visibleTestimonials.push(testimonials[visibleTestimonials.length % testimonials.length])
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Kata Mereka Tentang Sabang
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Pengalaman nyata dari para wisatawan yang telah merasakan keajaiban Sabang
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5.0</div>
              <div className="text-blue-200 text-sm">Rating Rata-rata</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-blue-200 text-sm">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-blue-200 text-sm">Would Return</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="relative">
          <motion.div
            key={`testimonial-page-${currentPage}`} // Add key to force re-render
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className={`group ${index === 1 ? 'md:scale-105' : ''}`}
              >
                <div className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 h-full">
                  {/* Quote Icon */}
                  <div className="text-blue-600 mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300">
                    "{testimonial.comment}"
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-blue-600">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator - hanya tampilkan 5 dot untuk 5 halaman */}
        <div className="flex justify-center mt-12 space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'bg-white scale-125'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection