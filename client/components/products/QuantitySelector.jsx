"use client";

import { useState, useEffect } from "react";

export default function QuantitySelector({ productId }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Storage Key প্রোডাক্ট আইডি দিয়ে ডাইনামিক করা হলো
  const storageKey = `quantity_${productId}`;

  // ১. Component mount হওয়ার পর নির্দিষ্ট প্রোডাক্টের ডাটা পড়ুন
  useEffect(() => {
    if (!productId) return;
    const savedQuantity = localStorage.getItem(storageKey);
    if (savedQuantity) {
      setQuantity(Number(savedQuantity));
    }
    setIsLoaded(true);
  }, [productId, storageKey]);

  // ২. Quantity পরিবর্তন হলে নির্দিষ্ট প্রোডাক্টের Storage Key-তে আপডেট করুন
  useEffect(() => {
    if (isLoaded && productId) {
      localStorage.setItem(storageKey, quantity.toString());
    }
  }, [quantity, isLoaded, productId, storageKey]);

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-10 w-28 bg-gray-100 animate-pulse rounded-lg mt-8" />
    ); // লোডিং স্কেলিটন
  }

  return (
    <div className="flex items-center gap-4 mt-8">
      {/* Decrease Button */}
      <button
        onClick={decrease}
        disabled={quantity <= 1}
        className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        -
      </button>

      {/* Quantity Display */}
      <span className="text-lg font-semibold">{quantity}</span>

      {/* Increase Button */}
      <button
        onClick={increase}
        className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        +
      </button>
    </div>
  );
}
