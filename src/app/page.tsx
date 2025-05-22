'use client'

import HeroSection from '@/components/sections/HeroSection'
import FeaturedDestinations from '@/components/sections/FeaturedDestinations'
import FeaturedAccommodations from '@/components/sections/FeaturedAccommodations'
import WhyChooseSabang from '@/components/sections/WhyChooseSabang'
import GallerySection from '@/components/sections/GallerySection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <div className="font-sans">
      <HeroSection />
      <FeaturedDestinations />
      {/* <FeaturedAccommodations /> */}
      <WhyChooseSabang />
      <GallerySection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
