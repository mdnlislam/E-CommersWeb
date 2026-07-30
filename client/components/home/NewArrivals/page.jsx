import Link from "next/link";
import products from "@/data/products";

export default function NewArrivals() {
  const newProducts = products.filter((item) => item.isNew);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-green-600 font-semibold uppercase">
            Just Arrived
          </span>

          <h2 className="text-4xl font-bold mt-2">New Arrivals</h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Explore our newest collection with the latest trends and premium
            quality.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {newProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
                />

                <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                  NEW
                </span>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-xl">{product.title}</h3>

                  <span className="text-yellow-500">⭐ {product.rating}</span>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <span className="text-2xl font-bold text-green-600">
                    ${product.price}
                  </span>

                  <span className="line-through text-gray-400">
                    ${product.oldPrice}
                  </span>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">
                    Add to Cart
                  </button>

                  <Link
                    href={`/products/${product.id}`}
                    className="px-5 py-3 border rounded-lg hover:bg-gray-100"
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
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
}
