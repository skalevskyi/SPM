import { FloatingActions } from '@/components/FloatingActions';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Navbar } from '@/components/Navbar';
import { ContactSection } from '@/components/sections/ContactSection';
import { ConceptSection } from '@/components/sections/ConceptSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { OffresSection } from '@/components/sections/OffresSection';
import { VehicleSection } from '@/components/sections/VehicleSection';

/**
 * ADMOVE landing page — UI-only phase.
 * Structure: Hero, Support, Parcours, Offres, Contact, Footer.
 * No form submission or calculator logic.
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-0">
        <HeroSection />
        <ConceptSection />
        <VehicleSection />
        <OffresSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileBottomNav />
      <FloatingActions />
    </>
  );
}
