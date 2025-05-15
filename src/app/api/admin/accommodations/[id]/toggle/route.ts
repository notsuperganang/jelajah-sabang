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
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get current accommodation
    const accommodation = await prisma.accommodation.findUnique({
      where: { id: params.id }
    })

    if (!accommodation) {
      return NextResponse.json(
        { error: "Accommodation not found" },
        { status: 404 }
      )
    }

    // Toggle availability
    const updatedAccommodation = await prisma.accommodation.update({
      where: { id: params.id },
      data: {
        available: !accommodation.available
      }
    })

    return NextResponse.json({ accommodation: updatedAccommodation })
  } catch (error) {
    console.error("Error toggling accommodation availability:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}