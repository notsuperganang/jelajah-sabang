// src/app/kuliner/page.tsx
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function KulinerPage() {
  // Fetch culinary places from database
  const culinaryPlaces = await prisma.culinary.findMany({
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' }
    ]
  })

  const featuredPlaces = culinaryPlaces.filter((place: any) => place.featured)
  const otherPlaces = culinaryPlaces.filter((place: any) => !place.featured)

  // Group by category
  const categorized = otherPlaces.reduce((acc: any, place: any) => {
  if (!acc[place.category]) {
    acc[place.category] = []
  }
  acc[place.category].push(place)
  return acc
}, {})

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kuliner Sabang
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nikmati cita rasa autentik Sabang, dari makanan khas Aceh hingga seafood segar 
            langsung dari laut. Petualangan kuliner yang tak terlupakan menanti Anda!
          </p>
        </div>

        {/* Featured Culinary */}
        {featuredPlaces.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Kuliner Unggulan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPlaces.map((place: any) => (
                <Card key={place.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Hero Image */}
                  <div className="h-64 md:h-80 bg-gradient-to-br from-orange-500 to-red-600 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{place.name}</h3>
                        <div className="flex items-center space-x-4 text-orange-100">
                          <span>📍 {place.location}</span>
                          <span>💰 {place.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      {place.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 capitalize">
                          {place.category}
                        </span>
                        <span className="text-green-600 font-semibold">
                          {place.price}
                        </span>
                      </div>
                      <Button>
                        Lihat Detail
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Categorized Culinary */}
        {Object.keys(categorized).length > 0 && (
          <section>
            {Object.entries(categorized).map(([category, places]: [string, any]) => (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {places.map((place: any) => (
                    <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      {/* Image based on category */}
                      <div className={`h-48 relative ${
                        category === 'makanan khas' 
                          ? 'bg-gradient-to-br from-red-400 to-orange-500'
                          : category === 'seafood'
                          ? 'bg-gradient-to-br from-blue-400 to-teal-500'
                          : category === 'minuman'
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                          : 'bg-gradient-to-br from-green-400 to-blue-500'
                      }`}>
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <h3 className="text-white text-lg font-semibold text-center px-4">
                            {place.name}
                          </h3>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">📍 {place.location}</p>
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                              {place.category}
                            </span>
                            <span className="text-green-600 font-semibold text-sm">
                              {place.price}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                          {place.description}
                        </p>
                        
                        <Button variant="outline" size="sm" className="w-full">
                          Lihat Detail
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Empty State */}
        {culinaryPlaces.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v8z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No culinary places found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tempat kuliner akan segera ditambahkan.
            </p>
          </div>
        )}

        {/* Food Categories Info */}
        <section className="mt-16 bg-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Jenis Kuliner di Sabang
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍛</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Makanan Khas</h3>
              <p className="text-gray-600 text-sm">
                Cita rasa autentik Aceh dengan bumbu rempah yang khas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🦐</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Seafood</h3>
              <p className="text-gray-600 text-sm">
                Hasil laut segar langsung dari nelayan lokal
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">☕</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Minuman</h3>
              <p className="text-gray-600 text-sm">
                Kopi Gayo premium dan minuman tradisional
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Lapar? Yuk Jelajahi Kuliner Sabang!
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Book akomodasi dan nikmati petualangan kuliner yang tak terlupakan
          </p>
          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
            <a href="/akomodasi">Book Akomodasi</a>
          </Button>
        </section>
      </div>
    </div>
  )
}