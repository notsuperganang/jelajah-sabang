// prisma/create-test-user.ts
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/crypto'

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    // Create a test customer user
    const hashedPassword = await hashPassword('test123')
    
    const testUser = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'CUSTOMER'
      }
    })

    console.log('✅ Test user created/updated!')
    console.log('📧 Email: test@example.com')
    console.log('🔑 Password: test123')
    console.log('🆔 ID:', testUser.id)
  } catch (error) {
    console.error('❌ Error creating test user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()