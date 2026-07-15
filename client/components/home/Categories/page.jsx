import Link from "next/link";
import categories from "@/data/categories";

export default function Categories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Shop by Category</h2>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Explore our popular categories and find the perfect products for
            your everyday needs.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.name}`}
              className="group relative overflow-hidden rounded-2xl shadow-md bg-white"
            >
              {/* Image */}
              <div className="h-72 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition"></div>

              {/* Text */}
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-white">
                  {category.name}
                </h3>

                <span className="mt-2 inline-block text-sm text-white border border-white px-4 py-2 rounded-full group-hover:bg-white group-hover:text-black transition">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
