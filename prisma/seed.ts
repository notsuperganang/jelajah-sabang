import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed Destinations (10 items)
  const destinations = [
    {
      name: "Pantai Iboih",
      description: "Pantai dengan air jernih, terumbu karang berwarna-warni, dan spot snorkeling terbaik di Sabang. Tempat yang sempurna untuk menikmati keindahan bawah laut Indonesia.",
      image: "https://images.app.goo.gl/Te7fTn86fEHKYnxx6",
      location: "Iboih, Sukakarya",
      category: "pantai",
      featured: true
    },
    {
      name: "Kilometer Nol Indonesia",
      description: "Monumen ikonik di ujung barat Indonesia dengan pemandangan Samudera Hindia yang menakjubkan. Tempat bersejarah yang menandai batas paling barat Nusantara.",
      image: "https://images.app.goo.gl/1e2tFNX9yAKxAbN76",
      location: "Paloh Gadeng",
      category: "sejarah",
      featured: true
    },
    {
      name: "Benteng Anoi Itam",
      description: "Peninggalan sejarah Perang Dunia II dengan panorama laut yang memukau. Benteng bersejarah dengan arsitektur khas dan pemandangan strategis.",
      image: "https://images.app.goo.gl/4HYenJ7HahR56dQE9",
      location: "Sabang Kota",
      category: "sejarah",
      featured: true
    },
    {
      name: "Pantai Sumur Tiga",
      description: "Pantai yang tenang dengan pemandangan sunset yang memukau. Ideal untuk bersantai dan menikmati keindahan alam Sabang.",
      image: "https://images.app.goo.gl/p9eRHC6MzrzcnK4u9",
      location: "Jaboi",
      category: "pantai",
      featured: false
    },
    {
      name: "Goa Sarang",
      description: "Gua alami dengan formasi stalaktit dan stalagmit yang menakjubkan. Destinasi petualangan yang menarix untuk dijelajahi.",
      image: "https://images.app.goo.gl/Wpi1SskDxFbWWSiYA",
      location: "Sukajaya",
      category: "alam",
      featured: false
    },
    {
      name: "Danau Aneuk Laot",
      description: "Danau tawar dengan air yang jernih dan suasana yang tenang, dikelilingi oleh hutan tropis yang asri.",
      image: "https://images.app.goo.gl/XTQvm4BWWi18PDQC6",
      location: "Sukajaya",
      category: "alam",
      featured: false
    },
    {
      name: "Pantai Tapak Gajah",
      description: "Pantai eksotis dengan batu karang besar yang menyerupai tapak gajah. Tempat yang sempurna untuk fotografi alam.",
      image: "https://images.app.goo.gl/SEvbnLqXuCmqTAScA",
      location: "Sukajaya",
      category: "pantai",
      featured: false
    },
    {
      name: "Air Terjun Pria Laot",
      description: "Air terjun tersembunyi di tengah hutan tropis dengan kolam alami yang jernih. Destinasi yang sempurna untuk trekking.",
      image: "https://images.app.goo.gl/RvAbBy32D5wS4n8E6",
      location: "Jaboi",
      category: "alam",
      featured: false
    },
    {
      name: "Benteng Anoi Itam",
      description: "Menara pengawas bersejarah dengan pemandangan 360 derajat Kota Sabang dan laut sekitarnya.",
      image: "https://images.app.goo.gl/4HYenJ7HahR56dQE9",
      location: "Sabang Kota",
      category: "sejarah",
      featured: false
    },
    {
      name: "Pantai Jaboi",
      description: "Pantai dengan ombak yang tenang dan pasir putih bersih. Ideal untuk bermain air dan bersantai bersama keluarga.",
      image: "https://images.app.goo.gl/VZ3sYH2W33fVk5Ka7",
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
      image: "https://i0.wp.com/makanmana.net/wp-content/uploads/2007/11/mie-aceh-titi-bobrok.jpg",
      location: "Jl. Teuku Umar, Sabang",
      price: "Rp 15.000 - 25.000",
      category: "makanan khas",
      featured: true
    },
    {
      name: "Seafood Pantai Iboih Floating Restaurant",
      description: "Restoran terapung dengan seafood segar langsung dari laut. Menikmati makanan sambil merasakan deburan ombak.",
      image: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2023/12/23/2255676321.jpg",
      location: "Pantai Iboih",
      price: "Rp 50.000 - 150.000",
      category: "seafood",
      featured: true
    },
    {
      name: "Kopi Gayo Sabang Heritage",
      description: "Kedai kopi dengan biji kopi Gayo premium yang diseduh tradisional. Suasana vintage dengan pemandangan laut.",
      image: "https://ulasan.co/wp-content/uploads/2024/09/Bintan_Kedai-Kopi-Gudang-Ketam-Sei-Enam-Kijang.jpeg",
      location: "Pusat Kota Sabang",
      price: "Rp 8.000 - 15.000",
      category: "minuman",
      featured: true
    },
    {
      name: "Nasi Gurih Bu Wati",
      description: "Nasi gurih khas Aceh dengan lauk-pauk tradisional. Sarapan favorit warga lokal dengan cita rasa autentik.",
      image: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/720x0/webp/photo/2023/04/06/1928678704.jpg",
      location: "Jl. Prof. A. Majid Ibrahim",
      price: "Rp 10.000 - 18.000",
      category: "makanan khas",
      featured: false
    },
    {
      name: "Sate Kambing Pak Yusuf",
      description: "Sate kambing dengan bumbu kacang khas Aceh yang gurih dan pedas. Daging kambing empuk dengan rasa yang meresap.",
      image: "https://assets-pergikuliner.com/VOruO_1ArzXHMBPn330vMDm-haM=/770x580/smart/filters:no_upscale()/https://assets-pergikuliner.com/uploads/image/picture/2797878/picture-1674106770.jpg",
      location: "Jl. Diponegoro",
      price: "Rp 25.000 - 40.000",
      category: "makanan khas",
      featured: false
    },
    {
      name: "Es Kelapa Muda Pantai",
      description: "Kelapa muda segar langsung dari pohon dengan es serut. Minuman penyegar yang sempurna untuk cuaca tropis.",
      image: "https://pbs.twimg.com/media/DMpUyaSVAAAuRzK.jpg:large",
      location: "Sepanjang Pantai Sabang",
      price: "Rp 5.000 - 10.000",
      category: "minuman",
      featured: false
    },
    {
      name: "Rumah Makan Terapung Iboih",
      description: "Masakan seafood segar dengan pemandangan bawah laut melalui lantai kaca. Experience dining yang unik di Sabang.",
      image: "https://images.trvl-media.com/lodging/35000000/34600000/34599900/34599842/7475de32.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
      location: "Pantai Iboih",
      price: "Rp 75.000 - 200.000",
      category: "seafood",
      featured: false
    },
    {
      name: "Ayam Tangkap Bu Siti",
      description: "Ayam tangkap khas Aceh dengan bumbu rica-rica dan sayur-mayur segar. Hidangan yang pedas dan menggugah selera.",
      image: "https://asset.kompas.com/crops/RdAQJ7agYpGn-hRpCL1XPzi7yZQ=/0x58:1000x724/1200x800/data/photo/2020/07/19/5f13fe03a9f06.jpg",
      location: "Jl. Cut Nyak Dhien",
      price: "Rp 20.000 - 35.000",
      category: "makanan khas",
      featured: false
    },
    {
      name: "Warung Kopi Tepi Laut",
      description: "Kedai kopi sederhana dengan pemandangan laut langsung. Menu kopi tradisional dan cemilan lokal.",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/f2/3e/97/caption.jpg?w=800&h=800&s=1",
      location: "Pantai Teupin Layeu",
      price: "Rp 5.000 - 12.000",
      category: "minuman",
      featured: false
    },
    {
      name: "Ikan Bakar Pantai Sumur Tiga",
      description: "Ikan bakar segar dengan bumbu khas Aceh. Disajikan di tepi pantai dengan suasana sunset yang romantis.",
      image: "https://cdn.antaranews.com/cache/1200x800/2022/05/07/IMG_20220507_200346.jpg",
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
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/00/76/02/apollo-bungalows.jpg?w=900&h=500&s=1",
      rating: 3.8,
      amenities: ["WiFi", "Fan", "Garden View", "Beach Access"],
      available: true
    },
    {
      name: "Sabang Hill Resort",
      description: "Resort di atas bukit dengan pemandangan panoramik kota Sabang dan laut. Suasana sejuk dan tenang jauh dari keramaian.",
      address: "Pucok Krueng, Sabang",
      price: 400000,
      image: "https://images.trvl-media.com/lodging/23000000/22800000/22792300/22792295/69f62a6b.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
      rating: 4.3,
      amenities: ["WiFi", "AC", "Pool", "Restaurant", "Spa", "Hiking Trails"],
      available: true
    },
    {
      name: "Anoi Itam Guesthouse",
      description: "Guesthouse sederhana dekat dengan benteng bersejarah Anoi Itam. Lokasi strategis dengan harga terjangkau.",
      address: "Jl. Anoi Itam, Sabang",
      price: 120000,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/207525758.jpg?k=005465a3cde2027443582b1e588d5675636d946a92581e9ff87adc67055c4d8b&o=&hp=1",
      rating: 3.5,
      amenities: ["WiFi", "Fan", "Shared Bathroom", "Historical Tour"],
      available: true
    },
    {
      name: "Sumur Tiga Beach Resort",
      description: "Resort yang menghadap ke Pantai Sumur Tiga dengan sunset view yang menakjubkan. Perfect untuk honeymoon dan family vacation.",
      address: "Pantai Sumur Tiga, Jaboi",
      price: 350000,
      image: "https://q-xx.bstatic.com/xdata/images/hotel/840x460/632803997.jpg?k=3e916a48d2b05a4a19913c341c5d8d9eb9ad2fe7d70a63684ce12d63454422d1&o=",
      rating: 4.1,
      amenities: ["WiFi", "AC", "Beachfront", "Restaurant", "Bar", "Water Sports"],
      available: true
    },
    {
      name: "Sabang Backpacker Hostel",
      description: "Hostel modern dengan fasilitas lengkap untuk traveler muda. Suasana backpacker yang fun dengan harga bersahabat.",
      address: "Jl. Professor A. Majid Ibrahim, Sabang",
      price: 80000,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/233747003.jpg?k=38022e0aca9b70e85589442a89b78fcda275cffced32b4d79719a1d045d5a044&o=&hp=1",
      rating: 3.9,
      amenities: ["WiFi", "AC", "Shared Kitchen", "Common Room", "Laundry"],
      available: true
    },
    {
      name: "Jaboi Nature Lodge",
      description: "Lodge eco-friendly di tengah hutan dengan konsep back to nature. Ideal untuk eco-tourism dan forest bathing.",
      address: "Kawasan Jaboi, Sukajaya",
      price: 250000,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/177523302.jpg?k=3886a0a31efed2f9aec01452132268932a44ce113fff0029f1c233d36fc06415&o=&hp=1",
      rating: 4.0,
      amenities: ["WiFi", "Fan", "Nature View", "Trekking Guide", "Bird Watching"],
      available: true
    },
    {
      name: "Paloh Gadeng Heritage Hotel",
      description: "Hotel heritage dengan arsitektur kolonial yang telah direnovasi. Lokasi dekat dengan Monumen Kilometer Nol Indonesia.",
      address: "Paloh Gadeng, Sabang",
      price: 280000,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/644820122.jpg?k=990937819584ce1829c8cc6de22930fd5551a593d26ffa6ec7034503f0fdb702&o=&hp=1",
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