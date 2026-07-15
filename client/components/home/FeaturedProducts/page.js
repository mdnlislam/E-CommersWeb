import Link from "next/link";
import products from "@/data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.filter((item) => item.featured);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold uppercase">
            Featured Collection
          </span>

          <h2 className="text-4xl font-bold mt-2">Featured Products</h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Discover our hand-picked products with premium quality and
            unbeatable prices.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Discount */}
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                  SALE
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{product.title}</h3>

                  <span className="text-yellow-500">⭐ {product.rating}</span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-2xl font-bold text-orange-500">
                    ${product.price}
                  </span>

                  <span className="line-through text-gray-400">
                    ${product.oldPrice}
                  </span>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition">
                    Add to Cart
                  </button>

                  <Link
                    href={`/products/${product.id}`}
                    className="px-5 py-3 border rounded-lg hover:bg-gray-100 transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
