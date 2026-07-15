import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Left Content */}
          <div>
            <span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              🔥 New Collection 2026
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Discover the Best
              <span className="text-orange-500"> Products </span>
              at Amazing Prices
            </h1>

            <p className="mt-6 text-gray-300 text-lg leading-8">
              Shop from thousands of premium products with fast delivery, secure
              payment and exclusive discounts. Everything you need in one place.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/products"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Shop Now
              </Link>

              <Link
                href="/categories"
                className="border border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-lg font-semibold transition"
              >
                Browse Categories
              </Link>
            </div>

            <div className="flex gap-10 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-white">10K+</h3>
                <p className="text-gray-400">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">500+</h3>
                <p className="text-gray-400">Products</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">24/7</h3>
                <p className="text-gray-400">Support</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
              alt="Hero Product"
              className="w-full max-w-lg rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
