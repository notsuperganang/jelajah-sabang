// src/app/admin/accommodations/page.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AdminAccommodationActions from '@/components/AdminAccommodationActions'

export default async function AdminAccommodationsPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect("/auth/signin")
  }

  // Fetch all accommodations
  const accommodations = await prisma.accommodation.findMany({
    include: {
      _count: {
        select: { bookings: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Accommodations
            </h1>
            <p className="text-gray-600 mt-2">
              Add, edit, or remove accommodation listings
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/accommodations/new">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Accommodation
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{accommodations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {accommodations.filter((acc: any) => acc.available).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {accommodations.reduce((sum: any, acc: any) => sum + acc._count.bookings, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accommodations List */}
        <div className="space-y-6">
          {accommodations.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No accommodations</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new accommodation.
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/admin/accommodations/new">Add Accommodation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            accommodations.map((accommodation: any) => (
              <Card key={accommodation.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="md:flex">
                    {/* Image Placeholder */}
                    <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-blue-400 to-blue-600 relative">
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <span className="text-white font-medium text-center px-4">
                          {accommodation.name}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {accommodation.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {accommodation.address}
                          </p>
                          <p className="text-gray-700 mt-2 text-sm line-clamp-2">
                            {accommodation.description}
                          </p>

                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Price:</span>
                              <div className="font-semibold text-blue-600">
                                {formatPrice(accommodation.price)}/night
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Rating:</span>
                              <div className="font-medium">{accommodation.rating.toFixed(1)}/5</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Bookings:</span>
                              <div className="font-medium">{accommodation._count.bookings}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Status:</span>
                              <div className={`font-medium ${accommodation.available ? 'text-green-600' : 'text-red-600'}`}>
                                {accommodation.available ? 'Available' : 'Not Available'}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <span className="text-xs text-gray-500">Amenities: </span>
                            <span className="text-xs text-gray-700">
                              {accommodation.amenities.join(', ')}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="ml-6 flex flex-col space-y-2">
                          <AdminAccommodationActions accommodation={accommodation} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}