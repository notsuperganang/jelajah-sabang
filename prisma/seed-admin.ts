// prisma/seed-admin.ts
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/crypto'

const prisma = new PrismaClient()

async function main() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@jelejahsabang.com' }
    })

    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email)
      console.log('Admin role:', existingAdmin.role)
      return
    }

    // Hash password using our crypto function
    const hashedPassword = await hashPassword('admin123')
    
    // Create admin user
    const admin = await prisma.user.create({
      data: {
        name: 'Admin JelajahSabang',
        email: 'admin@jelejahsabang.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    console.log('✅ Admin created successfully!')
    console.log('📧 Email:', admin.email)
    console.log('🔑 Password: admin123')
    console.log('👨‍💼 Role:', admin.role)
    console.log('\nYou can now login at: http://localhost:3000/auth/signin')
  } catch (error) {
    console.error('❌ Error creating admin:', error)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })