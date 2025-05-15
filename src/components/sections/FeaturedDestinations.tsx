'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Sample featured destinations data
const featuredDestinations = [
  {
    id: 1,
    title: "Pantai Iboih",
    description: "Pantai dengan air jernih, terumbu karang berwarna-warni, dan spot snorkeling terbaik di Sabang",
    image: "https://superlive.id/storage/superadventure/2018/06/28/f26447867e27.jpg",
    category: "Pantai & Snorkeling"
  },
  {
    id: 2,
    title: "Kilometer Nol",
    description: "Monumen ikonik di ujung barat Indonesia dengan pemandangan Samudera Hindia yang menakjubkan",
    image: "https://cdn.antaranews.com/cache/1200x800/2019/11/23/D8A59EEB-434E-4CEC-BD92-0642AC3B587B.jpeg",
    category: "Sejarah & Budaya"
  },
  {
    id: 3,
    title: "Benteng Anoi Itam",
    description: "Peninggalan sejarah Perang Dunia II dengan panorama laut yang memukau",
    image: "https://asset.kompas.com/crops/311VBTCU_Nh3SfIiNWdmKG770F0=/0x49:1600x1116/1200x800/data/photo/2023/09/23/650f032637023.jpeg",
    category: "Sejarah & Budaya"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const FeaturedDestinations = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Destinasi Unggulan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Temukan keindahan tersembunyi di setiap sudut Sabang yang akan membuat perjalanan Anda tak terlupakan
          </p>
          <motion.div
            className="w-24 h-1 bg-blue-600 mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {featuredDestinations.map((destination, index) => (
            <motion.div key={destination.id} variants={itemVariants}>
              <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                <div className="relative h-64 overflow-hidden">
                  {/* Image */}
                  <motion.img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {destination.category}
                    </span>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold mb-2">{destination.title}</h3>
                    <p className="text-gray-200 text-sm opacity-90">
                      {destination.description}
                    </p>
                  </div>
                </div>
                
                {/* Card Action */}
                <CardContent className="p-6">
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
                  >
                    <Link href={`/destinasi/${destination.id}`}>
                      <span>Lihat Detail</span>
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3"
          >
            <Link href="/destinasi">
              Lihat Semua Destinasi
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedDestinations