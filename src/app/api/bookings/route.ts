import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    console.log("=== DEBUG SESSION ===")
    console.log("Session:", JSON.stringify(session, null, 2))
    console.log("Session user:", session?.user)
    console.log("Session user ID:", (session?.user as any)?.id)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { accommodationId, checkIn, checkOut, guestCount, totalPrice } = await request.json()

    // Validate required fields
    if (!accommodationId || !checkIn || !checkOut || !totalPrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Get userId - either from session or lookup by email
    let userId = (session.user as any).id
    console.log("Initial userId from session:", userId)
    
    if (!userId && session.user.email) {
      console.log("⚠️ No user ID in session, looking up by email:", session.user.email)
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      })
      
      console.log("Found user in DB:", user)
      
      if (!user) {
        return NextResponse.json(
          { error: "User not found in database" },
          { status: 404 }
        )
      }
      
      userId = user.id
      console.log("✅ Found user ID:", userId)
    }

    console.log("Final userId to use:", userId)
    
    // Double check if this user actually exists in database
    const userCheck = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    console.log("User verification:", userCheck ? "EXISTS" : "NOT FOUND")
    
    if (!userCheck) {
      return NextResponse.json(
        { error: `User with ID ${userId} does not exist` },
        { status: 400 }
      )
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Unable to identify user" },
        { status: 400 }
      )
    }

    // Check if accommodation exists
    const accommodation = await prisma.accommodation.findUnique({
      where: { id: accommodationId }
    })

    if (!accommodation) {
      return NextResponse.json(
        { error: "Accommodation not found" },
        { status: 404 }
      )
    }

    // Check date availability (no overlapping bookings)
    const existingBooking = await prisma.booking.findFirst({
      where: {
        accommodationId,
        OR: [
          { status: "CONFIRMED" },
          { status: "PENDING" }
        ],
        AND: [
          { checkIn: { lt: new Date(checkOut) } },
          { checkOut: { gt: new Date(checkIn) } }
        ]
      }
    })

    if (existingBooking) {
      return NextResponse.json(
        { error: "Selected dates are not available" },
        { status: 400 }
      )
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        accommodationId,
        userId, // Now we're sure this exists
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guestCount: guestCount || 1,
        totalPrice,
        status: "PENDING",
        paymentStatus: "PENDING"
      },
      include: {
        accommodation: {
          select: {
            name: true,
            address: true
          }
        }
      }
    })

    return NextResponse.json(
      { booking },
      { status: 201 }
    )
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// GET method to fetch user's bookings
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: (session.user as any).id
      },
      include: {
        accommodation: {
          select: {
            name: true,
            address: true,
            image: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}