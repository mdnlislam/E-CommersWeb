import { notFound } from "next/navigation";
import Link from "next/link";
import products from "@/data/products";
import QuantitySelector from "@/components/products/QuantitySelector";
export default async function ProductDetails({ params }) {
  const { id } = await params;

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-5 py-12">
      {/* Back */}
      <Link href="/products" className="text-orange-500 hover:underline">
        ← Back to Products
      </Link>

      {/* Product */}
      <div className="grid md:grid-cols-2 gap-12 mt-8">
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-2xl border"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <p className="mt-3 text-yellow-500">⭐ {product.rating}</p>

          <div className="mt-5 flex items-center gap-4">
            <span className="text-4xl font-bold text-orange-500">
              ${product.price}
            </span>

            {product.oldPrice && (
              <span className="text-gray-400 line-through text-xl">
                ${product.oldPrice}
              </span>
            )}
          </div>

          <div className="mt-6 space-y-2 text-gray-700">
            <p>
              <strong>Category :</strong> {product.category}
            </p>

            <p>
              <strong>Stock :</strong> In Stock
            </p>
          </div>

          <div className="mt-8">
            <h2 className="font-semibold text-xl mb-2">Description</h2>

            <p className="text-gray-600 leading-7">{product.description}</p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-8">
            <QuantitySelector productId={product.id} />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="px-8 py-3 rounded-lg border hover:bg-gray-100">
              ❤️ Wishlist
            </button>

            <button className="px-8 py-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600">
              🛒 Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}

      <div className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Related Products</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="border rounded-xl p-4 hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-52 w-full object-cover rounded-lg"
              />

              <h3 className="font-semibold mt-4">{item.title}</h3>

              <p className="text-orange-500 font-bold mt-2">${item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
