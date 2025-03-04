import React from 'react'
import Banner from './Banner';
import Categories from './Categories';
import HeroSection from './HeroSection';
import DealsSection from './DealsSection';
import PromoBanner from './PromoBanner';
import Blogs from '../blogs/Blogs';
import TrendingCards from '../Shop/TrendingCards';

const Home: React.FC = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <HeroSection />
      <TrendingCards />
      <DealsSection />
      <PromoBanner />
      <Blogs />
    </div>
  )
}

export default Home