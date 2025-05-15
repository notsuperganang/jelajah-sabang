// src/components/UpdateStatusButton.tsx
"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface UpdateStatusButtonProps {
  bookingId: string
  currentPaymentStatus: string
}

export default function UpdateStatusButton({ bookingId, currentPaymentStatus }: UpdateStatusButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleMarkAsPaid = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/bookings/${bookingId}/update-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentStatus: 'PAID',
          bookingStatus: 'CONFIRMED'
        })
      })

      if (response.ok) {
        router.refresh() // Refresh the page to show updated status
      }
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (currentPaymentStatus === 'PAID') {
    return null
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleMarkAsPaid}
      disabled={isLoading}
      className="text-green-600 hover:text-green-700"
    >
      {isLoading ? 'Updating...' : 'Mark as Paid'}
    </Button>
  )
}