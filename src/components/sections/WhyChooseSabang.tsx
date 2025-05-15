'use client'

import { motion } from 'framer-motion'

// Features data
const features = [
  {
    id: 1,
    title: "Surga Bawah Laut",
    description: "Terumbu karang berwarna-warni, berbagai spesies ikan langka, dan kejernihan air yang mencapai 15-20 meter menjadikannya surga bagi penyelam",
    icon: "🐠",
    stats: "30+ Spot Diving"
  },
  {
    id: 2,
    title: "Titik Nol Indonesia",
    description: "Menjadi saksi keindahan Monumen Kilometer Nol yang menandai ujung barat wilayah NKRI dengan pemandangan laut lepas yang menakjubkan",
    icon: "🗿",
    stats: "0 Km Indonesia"
  },
  {
    id: 3,
    title: "Wisata Sejarah",
    description: "Nikmati keramahan masyarakat lokal, santap kuliner khas Aceh, dan jelajahi peninggalan bersejarah dari Perang Dunia II",
    icon: "🏛️",
    stats: "5+ Situs Bersejarah"
  },
  {
    id: 4,
    title: "Kuliner Khas Aceh",
    description: "Nikmati cita rasa autentik kuliner Aceh dengan seafood segar langsung dari laut dan bumbu rempah yang kaya akan cita rasa",
    icon: "🍽️",
    stats: "50+ Kuliner Lokal"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
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
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const WhyChooseSabang = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mengapa Pilih Sabang?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Temukan keunikan Pulau Weh yang menjadikannya destinasi impian wisatawan dari seluruh dunia
          </p>
          
          {/* Decorative Element */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="group"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-blue-200">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl transform rotate-45 translate-x-6 -translate-y-6 group-hover:from-blue-100 transition-colors duration-300"></div>
                
                {/* Icon */}
                <motion.div
                  className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <span className="text-3xl" role="img">{feature.icon}</span>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {feature.stats}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Siap Merasakan Keajaiban Sabang?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan wisatawan yang telah merasakan pesona luar biasa Pulau Weh
            </p>
            <motion.button
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mulai Petualangan
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseSabang