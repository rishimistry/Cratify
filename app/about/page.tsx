import AboutHero from "../../components/home/AboutHero";
import AboutSection from "../../components/home/AboutSection";
import TeamSection from "../../components/home/TeamSection";
import TestimonialSection from "../../components/home/TestimonialSection";
import RootLayout from "../../components/layout/RootLayout";

export const metadata = {
  title: 'About | Cratify - Handcrafted Artisanal Products',
  description: 'Learn about our mission to connect talented artisans with customers who value handcrafted quality and support traditional craftsmanship.',
};

export default function AboutPage() {
  return (
    <RootLayout>
      <AboutHero />
      <AboutSection />
      <TestimonialSection />
      <TeamSection />
    </RootLayout>
  );
} 