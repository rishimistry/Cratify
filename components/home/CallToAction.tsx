import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-primary-600 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Join Our Artisan Community
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Whether you're a skilled craftsperson looking to share your creations with the world
            or a shopper seeking unique handmade treasures, Craftify is the place for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signup?role=seller"
              className="btn bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-md text-base font-medium"
            >
              Sell with Us
            </Link>
            <Link
              href="/shop"
              className="btn border-2 border-white text-white hover:bg-primary-700 px-8 py-3 rounded-md text-base font-medium"
            >
              Explore Unique Finds
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 