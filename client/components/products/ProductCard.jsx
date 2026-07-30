import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Sale Badge */}
        {product.oldPrice && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            SALE
          </span>
        )}

        {/* Wishlist Button (Future Use) */}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-orange-500 hover:text-white transition">
          🤍
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        {product.category && (
          <p className="text-sm text-orange-500 font-medium uppercase mb-2">
            {product.category}
          </p>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">⭐ {product.rating}</span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl font-bold text-orange-500">
            ${product.price}
          </span>

          {product.oldPrice && (
            <span className="line-through text-gray-400">
              ${product.oldPrice}
            </span>
          )}
        </div>

        {/* Buttons */}
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
  );
}
