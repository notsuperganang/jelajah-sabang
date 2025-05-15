// src/app/destinasi/page.tsx
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function DestinasiPage() {
    // Fetch destinations from database
    const destinations = await prisma.destination.findMany({
        orderBy: [
            { featured: 'desc' },
            { createdAt: 'desc' }
        ]
    })

    const featuredDestinations = destinations.filter((dest: any) => dest.featured)
    const otherDestinations = destinations.filter((dest: any) => !dest.featured)

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Destinasi Wisata Sabang
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Jelajahi keindahan alam dan kekayaan sejarah di ujung barat Indonesia.
                        Dari pantai eksotis hingga situs bersejarah yang memukau.
                    </p>
                </div>

                {/* Featured Destinations */}
                {featuredDestinations.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Destinasi Unggulan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {featuredDestinations.map((destination: any) => (
                                <Card key={destination.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    {/* Hero Image */}
                                    <div className="h-64 md:h-80 relative overflow-hidden bg-gray-200">
                                        {destination.image ? (
                                            <img
                                                src={destination.image}
                                                alt={destination.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center">
                                                <span className="text-white text-2xl font-bold text-center px-4">
                                                    {destination.name}
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                                            <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                                            <p className="text-blue-100">📍 {destination.location}</p>
                                        </div>
                                    </div>

                                    <CardContent className="p-6">
                                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                                            {destination.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                                                {destination.category}
                                            </span>
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

                {/* Other Destinations */}
                {otherDestinations.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Destinasi Lainnya
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherDestinations.map((destination: any) => (
                                <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    {/* Image */}
                                    <div className="h-48 relative overflow-hidden bg-gray-200">
                                        {destination.image ? (
                                            <img
                                                src={destination.image}
                                                alt={destination.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                                                <span className="text-white text-lg font-semibold text-center px-4">
                                                    {destination.name}
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-white text-lg font-semibold text-center px-4">
                                                {destination.name}
                                            </span>
                                        </div>
                                    </div>

                                    <CardContent className="p-4">
                                        <div className="mb-3">
                                            <p className="text-sm text-gray-600 mb-1">📍 {destination.location}</p>
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                                {destination.category}
                                            </span>
                                        </div>

                                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                                            {destination.description}
                                        </p>

                                        <Button variant="outline" size="sm" className="w-full">
                                            Lihat Detail
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {destinations.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No destinations found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Destinasi wisata akan segera ditambahkan.
                        </p>
                    </div>
                )}

                {/* Call to Action */}
                <section className="mt-16 bg-blue-600 rounded-2xl p-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Siap Menjelajahi Sabang?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Temukan akomodasi terbaik untuk pengalaman wisata yang tak terlupakan
                    </p>
                    <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                        <a href="/akomodasi">Lihat Akomodasi</a>
                    </Button>
                </section>
            </div>
        </div>
    )
}