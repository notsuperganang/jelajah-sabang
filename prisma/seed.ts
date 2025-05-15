import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Destinations (10 items)
  const destinations = [
    {
      name: "Pantai Iboih",
      description: "Pantai dengan air jernih, terumbu karang berwarna-warni, dan spot snorkeling terbaik di Sabang. Tempat yang sempurna untuk menikmati keindahan bawah laut Indonesia.",
      image: "https://superlive.id/storage/superadventure/2018/06/28/f26447867e27.jpg",
      location: "Iboih, Sukakarya",
      category: "pantai",
      featured: true
    },
    {
      name: "Kilometer Nol Indonesia",
      description: "Monumen ikonik di ujung barat Indonesia dengan pemandangan Samudera Hindia yang menakjubkan. Tempat bersejarah yang menandai batas paling barat Nusantara.",
      image: "https://cdn.antaranews.com/cache/1200x800/2019/11/23/D8A59EEB-434E-4CEC-BD92-0642AC3B587B.jpeg",
      location: "Paloh Gadeng",
      category: "sejarah",
      featured: true
    },
    {
      name: "Benteng Anoi Itam",
      description: "Peninggalan sejarah Perang Dunia II dengan panorama laut yang memukau. Benteng bersejarah dengan arsitektur khas dan pemandangan strategis.",
      image: "https://asset.kompas.com/crops/311VBTCU_Nh3SfIiNWdmKG770F0=/0x49:1600x1116/1200x800/data/photo/2023/09/23/650f032637023.jpeg",
      location: "Sabang Kota",
      category: "sejarah",
      featured: true
    },
    {
      name: "Pantai Sumur Tiga",
      description: "Pantai yang tenang dengan pemandangan sunset yang memukau. Ideal untuk bersantai dan menikmati keindahan alam Sabang.",
      image: "https://www.safariwisata.co.id/wp-content/uploads/2021/02/Pantai-Sumur-Tiga-Sabang.jpg",
      location: "Jaboi",
      category: "pantai",
      featured: false
    },
    {
      name: "Goa Sarang",
      description: "Gua alami dengan formasi stalaktit dan stalagmit yang menakjubkan. Destinasi petualangan yang menarix untuk dijelajahi.",
      image: "https://sabangkota.go.id/images/berita/GI7KaaMnGgbVu7YX_2020_05_20_06_51_26.jpeg",
      location: "Sukajaya",
      category: "alam",
      featured: false
    },
    {
      name: "Danau Aneuk Laot",
      description: "Danau tawar dengan air yang jernih dan suasana yang tenang, dikelilingi oleh hutan tropis yang asri.",
      image: "https://www.acehbos.com/wp-content/uploads/2019/08/danau-aneuk-laot-sabang.jpg",
      location: "Sukajaya",
      category: "alam",
      featured: false
    },
    {
      name: "Pantai Tapak Gajah",
      description: "Pantai eksotis dengan batu karang besar yang menyerupai tapak gajah. Tempat yang sempurna untuk fotografi alam.",
      image: "https://cdn.idntimes.com/content-images/community/2019/08/pantai-tapak-gajah-05be5c9c60ce4fdebe3bef9b3b3a6f54.jpg",
      location: "Sukajaya",
      category: "pantai",
      featured: false
    },
    {
      name: "Air Terjun Pria Laot",
      description: "Air terjun tersembunyi di tengah hutan tropis dengan kolam alami yang jernih. Destinasi yang sempurna untuk trekking.",
      image: "https://asset.kompas.com/crops/LKLn9iQRBrZphzL9jVqMlnF6Z6g=/0x0:1000x667/1200x800/data/photo/2020/08/11/5f321dc56de95.jpg",
      location: "Jaboi",
      category: "alam",
      featured: false
    },
    {
      name: "Benteng Anoi Itam",
      description: "Menara pengawas bersejarah dengan pemandangan 360 derajat Kota Sabang dan laut sekitarnya.",
      image: "https://1.bp.blogspot.com/-JH6ZOeDBOa4/XgI8qnFfThI/AAAAAAAABO8/VgvpzFRp1z8bNr8YX5SiXTNd0SSkpJ7KgCLcBGAsYHQ/s1600/sabang.jpg",
      location: "Sabang Kota",
      category: "sejarah",
      featured: false
    },
    {
      name: "Pantai Jaboi",
      description: "Pantai dengan ombak yang tenang dan pasir putih bersih. Ideal untuk bermain air dan bersantai bersama keluarga.",
      image: "https://sabangkota.go.id/images/berita/y7JbYqwIRKwqjWDy_2019_12_09_07_21_35.jpg",
      location: "Jaboi",
      category: "pantai",
      featured: false
    }
  ]

  // Seed Culinary (10 items)
  const culinaryPlaces = [
    {
      name: "Mie Aceh Sabang Titi Bobrok",
      description: "Mie Aceh autentik dengan bumbu rempah yang kuat dan topping daging kambing atau seafood segar. Warung legendaris di Sabang.",
      image: "https://img-global.cpcdn.com/recipes/fa2c78705bbb8d02/1200x630cq70/photo.jpg",
      location: "Jl. Teuku Umar, Sabang",
      price: "Rp 15.000 - 25.000",
      category: "makanan khas",
      featured: true
    },
    {
      name: "Seafood Pantai Iboih Floating Restaurant",
      description: "Restoran terapung dengan seafood segar langsung dari laut. Menikmati makanan sambil merasakan deburan ombak.",
      image: "https://asset.kompas.com/crops/5HS8vIKPqGPRw_OjQOvr_nYgqnw=/0x0:1000x667/1200x800/data/photo/2021/06/15/60c83f5b6d64b.jpg",
      location: "Pantai Iboih",
      price: "Rp 50.000 - 150.000",
      category: "seafood",
      featured: true
    },
    {
      name: "Kopi Gayo Sabang Heritage",
      description: "Kedai kopi dengan biji kopi Gayo premium yang diseduh tradisional. Suasana vintage dengan pemandangan laut.",
      image: "https://sabangkota.go.id/images/berita/A7FcC4xUk4VNlGSa_2020_02_12_05_36_09.jpeg",
      location: "Pusat Kota Sabang",
      price: "Rp 8.000 - 15.000",
      category: "minuman",
      featured: true
    },
    {
      name: "Nasi Gurih Bu Wati",
      description: "Nasi gurih khas Aceh dengan lauk-pauk tradisional. Sarapan favorit warga lokal dengan cita rasa autentik.",
      image: "https://cdn0-production-images-kly.akamaized.net/lQ7O8VQwEWKf6kAfJHOm_2Y4LFE=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3171052/original/055168000_1595831932-shutterstock_1104163067.jpg",
      location: "Jl. Prof. A. Majid Ibrahim",
      price: "Rp 10.000 - 18.000",
      category: "makanan khas",
      featured: false
    },
    {
      name: "Sate Kambing Pak Yusuf",
      description: "Sate kambing dengan bumbu kacang khas Aceh yang gurih dan pedas. Daging kambing empuk dengan rasa yang meresap.",
      image: "https://cdn.yummy.co.id/content-images/images/20210729/4JvAFnLAEsIlgKZD2Lx0Zc6b7UJ3Av6R-31363934343736373539d41d8cd98f00b204e9800998ecf8427e.jpg",
      location: "Jl. Diponegoro",
      price: "Rp 25.000 - 40.000",
      category: "makanan khas",
      featured: false
    },
    {
      name: "Es Kelapa Muda Pantai",
      description: "Kelapa muda segar langsung dari pohon dengan es serut. Minuman penyegar yang sempurna untuk cuaca tropis.",
      image: "https://cdn.idntimes.com/content-images/duniaku/post/20210709/120316847-2718442048398717-2516194644746967932-n-4abce6e5c5d3b4b6aa0a63d4f33ad9b8.jpg",
      location: "Sepanjang Pantai Sabang",
      price: "Rp 5.000 - 10.000",
      category: "minuman",
      featured: false
    },
    {
      name: "Rumah Makan Terapung Iboih",
      description: "Masakan seafood segar dengan pemandangan bawah laut melalui lantai kaca. Experience dining yang unik di Sabang.",
      image: "https://asset.kompas.com/crops/gpoiwgFOiDm2hIQRQcVr6g2mKgU=/0x0:1000x667/1200x800/data/photo/2020/08/11/5f321dc56de95.jpg",
      location: "Pantai Iboih",
      price: "Rp 75.000 - 200.000",
      category: "seafood",
      featured: false
    },
    {
      name: "Ayam Tangkap Bu Siti",
      description: "Ayam tangkap khas Aceh dengan bumbu rica-rica dan sayur-mayur segar. Hidangan yang pedas dan menggugah selera.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Ayam_tangkap.jpg/1200px-Ayam_tangkap.jpg",
      location: "Jl. Cut Nyak Dhien",
      price: "Rp 20.000 - 35.000",
      category: "makanan khas",
      featured: false
    },
    {
      name: "Warung Kopi Tepi Laut",
      description: "Kedai kopi sederhana dengan pemandangan laut langsung. Menu kopi tradisional dan cemilan lokal.",
      image: "https://sabangkota.go.id/images/berita/tZzWACQ8FG5TGhrP_2019_11_20_08_48_40.jpeg",
      location: "Pantai Teupin Layeu",
      price: "Rp 5.000 - 12.000",
      category: "minuman",
      featured: false
    },
    {
      name: "Ikan Bakar Pantai Sumur Tiga",
      description: "Ikan bakar segar dengan bumbu khas Aceh. Disajikan di tepi pantai dengan suasana sunset yang romantis.",
      image: "https://asset.kompas.com/crops/J9Bq_fIEYdPxAVE_lWlR6cUh2Fg=/0x0:1000x667/1200x800/data/photo/2020/08/11/5f321dc56de95.jpg",
      location: "Pantai Sumur Tiga",
      price: "Rp 30.000 - 60.000",
      category: "seafood",
      featured: false
    }
  ]

  // Seed Accommodations (10 items)
  const accommodations = [
    {
      name: "Gapang Beach Resort",
      description: "Resort mewah dengan pemandangan laut langsung, fasilitas lengkap, dan akses private ke pantai. Ideal untuk liburan romantis dan keluarga.",
      address: "Pantai Gapang, Sukakarya",
      price: 500000,
      image: "https://mediaim.expedia.com/destination/1/0cad56900bc276fa1d1d2f692d6e0755.jpg",
      rating: 4.5,
      amenities: ["WiFi", "AC", "Pool", "Beach Access", "Restaurant", "Spa", "Water Sports"],
      available: true
    },
    {
      name: "Kilometer Nol Hotel",
      description: "Hotel modern di pusat kota dengan akses mudah ke berbagai tempat wisata. Fasilitas lengkap dengan pelayanan prima.",
      address: "Jl. Cut Nyak Dhien, Sabang",
      price: 300000,
      image: "https://media-cdn.tripadvisor.com/media/photo-s/2d/1a/bc/95/drone-shot-of-daluyon.jpg",
      rating: 4.2,
      amenities: ["WiFi", "AC", "Gym", "Restaurant", "Meeting Room", "Pool"],
      available: true
    },
    {
      name: "Iboih Inn Sabang",
      description: "Penginapan budget dengan lokasi strategis dekat pantai Iboih. Cocok untuk backpacker dan keluarga dengan budget terbatas.",
      address: "Desa Iboih, Sukakarya",
      price: 150000,
      image: "https://media-cdn.tripadvisor.com/media/photo-s/0c/8f/fc/c9/iboih-inn.jpg",
      rating: 4.0,
      amenities: ["WiFi", "AC", "Breakfast", "Snorkeling Gear Rental"],
      available: true
    },
    {
      name: "Sabang Beach Bungalow",
      description: "Bungalow tradisional dengan suasana alami dan pemandangan pantai. Design yang menyatu dengan alam sekitar.",
      address: "Pantai Teupin Layeu, Sabang",
      price: 200000,
      image: "https://agoda-images.agoda.net/images/2084/2084651_17050312210052636930.jpg",
      rating: 3.8,
      amenities: ["WiFi", "Fan", "Garden View", "Beach Access"],
      available: true
    },
    {
      name: "Sabang Hill Resort",
      description: "Resort di atas bukit dengan pemandangan panoramik kota Sabang dan laut. Suasana sejuk dan tenang jauh dari keramaian.",
      address: "Pucok Krueng, Sabang",
      price: 400000,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/280662964.jpg?k=8d46b0e4e33b1a5b5b7d3e5e5d4b0f7b2f3a8c9e&o=&hp=1",
      rating: 4.3,
      amenities: ["WiFi", "AC", "Pool", "Restaurant", "Spa", "Hiking Trails"],
      available: true
    },
    {
      name: "Anoi Itam Guesthouse",
      description: "Guesthouse sederhana dekat dengan benteng bersejarah Anoi Itam. Lokasi strategis dengan harga terjangkau.",
      address: "Jl. Anoi Itam, Sabang",
      price: 120000,
      image: "https://sabangkota.go.id/images/berita/A1HvYmRXSbsV4C8L_2020_01_15_02_45_32.jpeg",
      rating: 3.5,
      amenities: ["WiFi", "Fan", "Shared Bathroom", "Historical Tour"],
      available: true
    },
    {
      name: "Sumur Tiga Beach Resort",
      description: "Resort yang menghadap ke Pantai Sumur Tiga dengan sunset view yang menakjubkan. Perfect untuk honeymoon dan family vacation.",
      address: "Pantai Sumur Tiga, Jaboi",
      price: 350000,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/187654321.jpg?k=4d6b4e3f5b7e8c9d&o=&hp=1",
      rating: 4.1,
      amenities: ["WiFi", "AC", "Beachfront", "Restaurant", "Bar", "Water Sports"],
      available: true
    },
    {
      name: "Sabang Backpacker Hostel",
      description: "Hostel modern dengan fasilitas lengkap untuk traveler muda. Suasana backpacker yang fun dengan harga bersahabat.",
      address: "Jl. Professor A. Majid Ibrahim, Sabang",
      price: 80000,
      image: "https://sabangkota.go.id/images/berita/B5JzNqDdT8KcP9HL_2019_12_20_04_23_55.jpeg",
      rating: 3.9,
      amenities: ["WiFi", "AC", "Shared Kitchen", "Common Room", "Laundry"],
      available: true
    },
    {
      name: "Jaboi Nature Lodge",
      description: "Lodge eco-friendly di tengah hutan dengan konsep back to nature. Ideal untuk eco-tourism dan forest bathing.",
      address: "Kawasan Jaboi, Sukajaya",
      price: 250000,
      image: "https://asset.kompas.com/crops/WeNqw8F5Sb4L9HzPm6vG4jYkAw0=/0x0:1000x667/1200x800/data/photo/2020/08/11/5f321dc56de95.jpg",
      rating: 4.0,
      amenities: ["WiFi", "Fan", "Nature View", "Trekking Guide", "Bird Watching"],
      available: true
    },
    {
      name: "Paloh Gadeng Heritage Hotel",
      description: "Hotel heritage dengan arsitektur kolonial yang telah direnovasi. Lokasi dekat dengan Monumen Kilometer Nol Indonesia.",
      address: "Paloh Gadeng, Sabang",
      price: 280000,
      image: "https://sabangkota.go.id/images/berita/GI7KaaMnGgbVu7YX_2020_05_20_06_51_26.jpeg",
      rating: 3.7,
      amenities: ["WiFi", "AC", "Historical Tours", "Restaurant", "Cultural Programs"],
      available: true
    }
  ]

  // Clear existing data
  console.log('Clearing existing data...')
  await prisma.destination.deleteMany()
  await prisma.culinary.deleteMany()
  await prisma.accommodation.deleteMany()

  // Create new records
  console.log('Seeding destinations...')
  for (const destination of destinations) {
    await prisma.destination.create({
      data: destination
    })
  }

  console.log('Seeding culinary places...')
  for (const culinary of culinaryPlaces) {
    await prisma.culinary.create({
      data: culinary
    })
  }

  console.log('Seeding accommodations...')
  for (const accommodation of accommodations) {
    await prisma.accommodation.create({
      data: accommodation
    })
  }

  console.log('✅ Seed completed successfully!')
  console.log(`📍 ${destinations.length} destinations created`)
  console.log(`🍽️ ${culinaryPlaces.length} culinary places created`) 
  console.log(`🏨 ${accommodations.length} accommodations created`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })