import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-primary-600 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start your journey with us?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join our community of artisans and customers who value quality craftsmanship.
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