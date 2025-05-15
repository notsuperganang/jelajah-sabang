import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function debugUsers() {
  try {
    console.log('=== ALL USERS IN DATABASE ===')
    const users = await prisma.user.findMany()
    console.log('Total users:', users.length)
    users.forEach(user => {
      console.log(`- ID: ${user.id}, Email: ${user.email}, Name: ${user.name}`)
    })
    
    if (users.length === 0) {
      console.log('\n❌ No users found! Database might need seeding.')
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugUsers()