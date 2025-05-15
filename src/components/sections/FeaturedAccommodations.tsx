'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

// Gallery images data
const galleryImages = [
  {
    id: 1,
    src: "https://www.safariwisata.co.id/wp-content/uploads/2021/02/Pantai-Iboih-Sabang-7.jpg",
    alt: "Pantai Iboih dengan air jernih",
    category: "Pantai"
  },
  {
    id: 2,
    src: "https://cdn.antaranews.com/cache/1200x800/2019/11/23/D8A59EEB-434E-4CEC-BD92-0642AC3B587B.jpeg",
    alt: "Monumen Kilometer Nol",
    category: "Monumen"
  },
  {
    id: 3,
    src: "https://asset.kompas.com/crops/311VBTCU_Nh3SfIiNWdmKG770F0=/0x49:1600x1116/1200x800/data/photo/2023/09/23/650f032637023.jpeg",
    alt: "Benteng Anoi Itam",
    category: "Sejarah"
  },
  {
    id: 4,
    src: "https://media-cdn.tripadvisor.com/media/photo-s/2d/1a/bc/95/drone-shot-of-daluyon.jpg",
    alt: "Resort di Sabang",
    category: "Akomodasi"
  },
  {
    id: 5,
    src: "https://mediaim.expedia.com/destination/2/c7219add92583f48cd9a2e1baa479e6b.jpg",
    alt: "Pemandangan alam Sabang",
    category: "Alam"
  },
  {
    id: 6,
    src: "https://media-cdn.tripadvisor.com/media/photo-s/0c/8f/fc/c9/iboih-inn.jpg",
    alt: "Diving di Sabang",
    category: "Diving"
  }
]

const categories = ["Semua", "Pantai", "Monumen", "Sejarah", "Akomodasi", "Alam", "Diving"]

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
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  const filteredImages = selectedCategory === "Semua" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (image: typeof galleryImages[0]) => {
    setSelectedImage(image)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setSelectedImage(null)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Galeri Foto Sabang
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lihat keindahan Sabang melalui lensa fotografer profesional dan wisatawan
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg bg-white p-2">
                <div className="relative h-64 overflow-hidden rounded-lg">
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <p className="text-sm font-medium">Lihat Detail</p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-500">Tidak ada foto dalam kategori ini.</p>
          </motion.div>
        )}

        {/* Lightbox */}
        {isLightboxOpen && selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg">
                <p className="font-medium">{selectedImage.alt}</p>
                <p className="text-sm text-gray-300">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default GallerySection