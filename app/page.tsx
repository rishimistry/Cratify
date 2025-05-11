import HeroSection from "../components/home/HeroSection";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CallToAction from "../components/home/CallToAction";
import RootLayout from "../components/layout/RootLayout";

export default function Home() {
  return (
    <RootLayout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <CallToAction />
    </RootLayout>
  );
}
