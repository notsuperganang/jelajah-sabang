// src/app/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Jelajahi Keindahan Sabang
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Nikmati pesona alam, kuliner lezat, dan akomodasi terbaik di ujung barat Indonesia
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/akomodasi">Booking Sekarang</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                <Link href="/destinasi">Lihat Destinasi</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Destinasi Unggulan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Pantai Iboih</h3>
                <p className="text-gray-600 mb-4">Pantai dengan air jernih dan terumbu karang yang indah</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/destinasi">Lihat Detail</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Kilometer Nol</h3>
                <p className="text-gray-600 mb-4">Monumen bersejarah titik paling barat Indonesia</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/destinasi">Lihat Detail</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Benteng Anoi Itam</h3>
                <p className="text-gray-600 mb-4">Peninggalan bersejarah dengan nilai budaya tinggi</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/destinasi">Lihat Detail</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Accommodations */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Akomodasi Pilihan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Sabang Beach Resort</h3>
                <p className="text-gray-600 mb-2">Resort mewah dengan pemandangan laut</p>
                <p className="text-lg font-bold text-blue-600 mb-4">Rp 500.000/malam</p>
                <Button asChild className="w-full">
                  <Link href="/akomodasi">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-teal-400 to-teal-600"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Iboih Inn</h3>
                <p className="text-gray-600 mb-2">Penginapan budget dekat pantai</p>
                <p className="text-lg font-bold text-blue-600 mb-4">Rp 150.000/malam</p>
                <Button asChild className="w-full">
                  <Link href="/akomodasi">Book Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-red-400 to-red-600"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Kilometer Nol Hotel</h3>
                <p className="text-gray-600 mb-2">Hotel modern di pusat kota</p>
                <p className="text-lg font-bold text-blue-600 mb-4">Rp 300.000/malam</p>
                <Button asChild className="w-full">
                  <Link href="/akomodasi">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Sabang */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Mengapa Pilih Sabang?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lokasi Strategis</h3>
              <p className="text-gray-600">Terletak di ujung barat Indonesia dengan akses mudah ke berbagai destinasi wisata</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Alam yang Memukau</h3>
              <p className="text-gray-600">Pantai indah, air jernih, dan terumbu karang yang masih alami</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mudah Booking</h3>
              <p className="text-gray-600">Platform booking yang mudah dan aman dengan berbagai pilihan akomodasi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}