// src/app/api/bookings/[id]/update-status/route.ts
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { paymentStatus, bookingStatus } = await request.json()

    const booking = await prisma.booking.findUnique({
      where: { 
        id: params.id,
        userId: (session.user as any).id
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      )
    }

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        paymentStatus: paymentStatus || booking.paymentStatus,
        status: bookingStatus || (paymentStatus === 'PAID' ? 'CONFIRMED' : booking.status)
      }
    })

    return NextResponse.json({ booking: updatedBooking })
  } catch (error) {
    console.error("Update status error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}