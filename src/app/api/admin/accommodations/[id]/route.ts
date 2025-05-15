import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if accommodation has any bookings
    const accommodation = await prisma.accommodation.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { bookings: true }
        }
      }
    })

    if (!accommodation) {
      return NextResponse.json(
        { error: "Accommodation not found" },
        { status: 404 }
      )
    }

    if (accommodation._count.bookings > 0) {
      return NextResponse.json(
        { error: "Cannot delete accommodation with existing bookings" },
        { status: 400 }
      )
    }

    // Delete accommodation
    await prisma.accommodation.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Accommodation deleted successfully" })
  } catch (error) {
    console.error("Error deleting accommodation:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const accommodation = await prisma.accommodation.findUnique({
      where: { id: params.id }
    })

    if (!accommodation) {
      return NextResponse.json(
        { error: "Accommodation not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ accommodation })
  } catch (error) {
    console.error("Error fetching accommodation:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { name, description, address, price, rating, amenities, available } = await request.json()

    const accommodation = await prisma.accommodation.update({
      where: { id: params.id },
      data: {
        name,
        description,
        address,
        price: parseInt(price),
        rating: parseFloat(rating),
        amenities,
        available
      }
    })

    return NextResponse.json({ accommodation })
  } catch (error) {
    console.error("Error updating accommodation:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}