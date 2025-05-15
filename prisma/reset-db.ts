// prisma/reset-db.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function resetDatabase() {
  try {
    console.log('🗑️  Resetting database...')

    // Delete all records in reverse dependency order
    await prisma.booking.deleteMany()
    await prisma.session.deleteMany()
    await prisma.account.deleteMany()
    await prisma.verificationToken.deleteMany()
    
    await prisma.accommodation.deleteMany()
    await prisma.culinary.deleteMany()
    await prisma.destination.deleteMany()
    await prisma.user.deleteMany()

    console.log('✅ Database reset successfully!')
  } catch (error) {
    console.error('❌ Error resetting database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetDatabase()