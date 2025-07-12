import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TechnologiesSection from './components/TechnologiesSection'
import ClientSuccessStories from './components/ClientSuccessStories'
import PortfolioSection from './components/PortfolioSection'
import ExpertiseSection from './components/ExpertiseSection'
import ServicesSection from './components/ServicesSection'
import VantaCtaSection from './components/VantaCtaSection';
import FooterSection from './components/FooterSection';

function App() {
  return (
    <div className="min-h-screen text-white bg-black">
      <Navbar />
      <HeroSection />
      <TechnologiesSection />
      <PortfolioSection />
      <ServicesSection />
      <ExpertiseSection />
      <ClientSuccessStories />
      <VantaCtaSection />
      <FooterSection />
    </div>
  )
}

export default App
