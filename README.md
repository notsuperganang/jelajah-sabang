# 🏝️ JelajahSabang - Tourism Platform

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</div>

<div align="center">
  <h3>🌊 Discover the Beauty of Sabang, Indonesia 🌊</h3>
  <p>A comprehensive tourism platform showcasing destinations, accommodations, and culinary experiences in Sabang - the westernmost point of Indonesia.</p>
  
  <p>
    <a href="#demo">View Demo</a> ·
    <a href="#features">Features</a> ·
    <a href="#installation">Installation</a> ·
    <a href="#api">API</a>
  </p>
</div>

---

## 📖 About

**JelajahSabang** is a modern, full-stack tourism platform built with Next.js that allows users to explore and book accommodations in Sabang, Aceh, Indonesia. The platform features a beautiful, responsive design with smooth animations and a comprehensive booking system integrated with payment gateways.

### 🎯 Project Goals
- Promote tourism in Sabang, Indonesia
- Provide easy accommodation booking system
- Showcase local destinations and culinary experiences
- Create an intuitive admin panel for content management

## ✨ Features

### 🔐 **Authentication & Authorization**
- **NextAuth.js** integration with Google OAuth
- Role-based access control (Customer, Admin)
- Secure session management
- Protected routes and API endpoints

### 🏨 **Booking System**
- Real-time availability checking
- Date range selection with validation
- Guest count management
- Booking confirmation and tracking
- Payment integration with **Midtrans**

### 💳 **Payment Integration**
- Multiple payment methods (Credit Card, Bank Transfer, E-Wallets)
- Secure payment processing with Midtrans
- Payment status tracking
- Automated booking confirmation

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Beautiful animations with **Framer Motion**
- Interactive image galleries with lightbox
- Smooth page transitions
- Dark/Light mode ready

### 👨‍💼 **Admin Dashboard**
- Content management system
- Booking management
- Revenue tracking
- User management
- Real-time statistics

### 🌐 **Multi-language Ready**
- Indonesian language support
- Easy internationalization setup
- Localized date and currency formatting

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **shadcn/ui** - Modern UI components

### **Backend**
- **Next.js API Routes** - Server-side API
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication solution

### **External Services**
- **Midtrans** - Payment gateway
- **Google OAuth** - Social authentication

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📱 Screenshots

### Homepage
![Homepage](https://i.imgur.com/Yi7LC0C.jpeg)

### Accommodation Listing
![Accommodations](https://i.imgur.com/On9xO2c.png)

### Booking Flow
![Booking](https://i.imgur.com/Uc95yk3.png)

### Admin Dashboard
![Dashboard](https://i.imgur.com/PHkFmkC.png)

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Git

### 1. Clone the repository
```bash
git clone https://github.com/notsuperganang/jelajah-sabang.git
cd jelajah-sabang
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/jelejahsabang"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Midtrans Payment
MIDTRANS_SERVER_KEY="your-midtrans-server-key"
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="your-midtrans-client-key"
MIDTRANS_IS_PRODUCTION="false"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed the database
npm run seed

# Create admin user
npx tsx prisma/seed-admin.ts
```

### 5. Run the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Usage

### For Users
1. **Browse Destinations**: Explore tourist attractions in Sabang
2. **View Accommodations**: Check available hotels and resorts
3. **Make Bookings**: Select dates and complete payment
4. **Track Bookings**: Monitor booking status in dashboard

### For Admins
1. **Content Management**: Add/edit destinations, accommodations, and culinary places
2. **Booking Management**: View and manage all bookings
3. **Analytics**: Track revenue and booking statistics

### Default Admin Account
```
Email: admin@jelejahsabang.com
Password: admin123
```

## 🔌 API Documentation

### Authentication Endpoints
```bash
POST /api/auth/signin     # User login
POST /api/auth/signup     # User registration
POST /api/auth/signout    # User logout
```

### Booking Endpoints
```bash
GET  /api/bookings        # Get user bookings
POST /api/bookings        # Create new booking
GET  /api/bookings/[id]   # Get booking details
```

### Payment Endpoints
```bash
POST /api/payment/create-token    # Create payment token
POST /api/payment/notification    # Payment webhook
```

### Admin Endpoints
```bash
GET  /api/admin/accommodations     # Get all accommodations
POST /api/admin/accommodations     # Create accommodation
PUT  /api/admin/accommodations/[id] # Update accommodation
DEL  /api/admin/accommodations/[id] # Delete accommodation
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#0ea5e9)
- **Secondary**: Teal (#14b8a6)
- **Accent**: Orange (#f97316)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#eab308)
- **Error**: Red (#ef4444)

### Typography
- **Headings**: Geist Sans (Bold)
- **Body**: Geist Sans (Regular)
- **Monospace**: Geist Mono

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   ├── akomodasi/         # Accommodation pages
│   ├── destinasi/         # Destination pages
│   └── kuliner/           # Culinary pages
├── components/            # Reusable components
│   ├── sections/          # Page sections
│   └── ui/                # UI components
├── lib/                   # Utility functions
└── styles/                # Global styles

prisma/
├── schema.prisma          # Database schema
├── seed.ts               # Database seeding
└── migrations/           # Database migrations
```

## 🔧 Configuration

### Database Schema
The application uses Prisma with PostgreSQL. Main entities:
- **User** - Authentication and user management
- **Accommodation** - Hotel and resort data
- **Destination** - Tourist attractions
- **Booking** - Reservation system
- **Culinary** - Restaurant and food data

### Environment Configuration
- **Development**: Uses local PostgreSQL and Midtrans sandbox
- **Production**: Configured for production database and payment gateway

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commits
- Add tests for new features
- Update documentation as needed

## 📋 Roadmap

### Phase 1 (Current)
- [x] Basic booking system
- [x] Payment integration
- [x] Admin dashboard
- [x] Authentication system

### Phase 2 (Planned)
- [ ] Mobile app development
- [ ] Advanced search filters
- [ ] Review and rating system
- [ ] Multi-language support
- [ ] Email notifications
- [ ] SMS notifications

### Phase 3 (Future)
- [ ] AI-powered recommendations
- [ ] Virtual tour integration
- [ ] Social features
- [ ] Analytics dashboard

## 🐛 Known Issues

- Payment webhook requires HTTPS in production
- Image optimization needs CDN integration
- Mobile performance optimization pending

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit) file for details.

## 👥 Team

- **Ganang Setyo Hadi** - Full Stack Developer - [GitHub](https://github.com/notsuperganang) | [LinkedIn](https://www.linkedin.com/in/ganang-setyo-hadi/)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Prisma](https://prisma.io/) - Database toolkit
- [Midtrans](https://midtrans.com/) - Payment gateway
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Framer Motion](https://framer.com/motion/) - Animation library

## 📞 Support

If you have any questions or need support, please:
- Open an issue on GitHub
- Contact: your.email@example.com

---

<div align="center">
  <p>Made with ❤️ in Indonesia</p>
  <p>© 2024 JelajahSabang. All rights reserved.</p>
</div>