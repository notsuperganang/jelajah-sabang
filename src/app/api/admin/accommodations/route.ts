import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { name, description, address, price, rating, amenities, available, image } = await request.json()

    // Validate required fields
    if (!name || !description || !address || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const accommodation = await prisma.accommodation.create({
      data: {
        name,
        description,
        address,
        price: parseInt(price),
        rating: parseFloat(rating) || 0,
        amenities: amenities || [],
        available: available !== false,
        image: image || '/placeholder-image.jpg'
      }
    })

    return NextResponse.json({ accommodation }, { status: 201 })
  } catch (error) {
    console.error("Error creating accommodation:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}