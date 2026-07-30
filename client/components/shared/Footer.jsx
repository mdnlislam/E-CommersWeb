import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Shop<span className="text-orange-500">Nest</span>
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              ShopNest is your trusted online shopping destination. Discover
              quality products with secure payment and fast delivery.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="bg-slate-800 p-3 rounded-full hover:bg-orange-500 transition"
              >
                {/* <Facebook size={18} /> */}
              </a>

              <a
                href="#"
                className="bg-slate-800 p-3 rounded-full hover:bg-orange-500 transition"
              >
                {/* <Instagram size={18} /> */}
              </a>

              <a
                href="#"
                className="bg-slate-800 p-3 rounded-full hover:bg-orange-500 transition"
              >
                {/* <Twitter size={18} /> */}
              </a>

              <a
                href="#"
                className="bg-slate-800 p-3 rounded-full hover:bg-orange-500 transition"
              >
                {/* <Youtube size={18} /> */}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-orange-500">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/products" className="hover:text-orange-500">
                  Products
                </Link>
              </li>

              <li>
                <Link href="/categories" className="hover:text-orange-500">
                  Categories
                </Link>
              </li>

              <li>
                <Link href="/wishlist" className="hover:text-orange-500">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link href="/cart" className="hover:text-orange-500">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">Customer</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/profile" className="hover:text-orange-500">
                  My Account
                </Link>
              </li>

              <li>
                <Link href="/orders" className="hover:text-orange-500">
                  Order History
                </Link>
              </li>

              <li>
                <Link href="/login" className="hover:text-orange-500">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/register" className="hover:text-orange-500">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Contact Us
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="text-orange-500 mt-1" size={20} />
                <p>Gazipur, Dhaka, Bangladesh</p>
              </div>

              <div className="flex gap-3">
                <Phone className="text-orange-500" size={20} />
                <p>+880 1234-567890</p>
              </div>

              <div className="flex gap-3">
                <Mail className="text-orange-500" size={20} />
                <p>support@shopnest.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ShopNest. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-orange-500">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-orange-500">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
