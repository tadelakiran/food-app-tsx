import { useContext, useState } from 'react';
import type { Product } from '../interfaces/Product';
import { CartContext } from '../contextAPI/CartContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const vegetables: Product[] = [
  {
    id: 1,
    name: 'Tomato',
    price: 40,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcccf?w=400&h=400&fit=crop',
    description: 'Bright and juicy for curries and salads.',
    category: 'vegetable',
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: 'Potato',
    price: 35,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1596534516912-cff60b7a0c97?w=400&h=400&fit=crop',
    description: 'A versatile staple for every kitchen.',
    category: 'vegetable',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 3,
    name: 'Onion',
    price: 45,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd4837d?w=400&h=400&fit=crop',
    description: 'Perfect for flavoring and cooking.',
    category: 'vegetable',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 4,
    name: 'Carrot',
    price: 60,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1584622614875-2f3dd3d3a285?w=400&h=400&fit=crop',
    description: 'Sweet, crunchy, and full of nutrients.',
    category: 'vegetable',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 5,
    name: 'Cauliflower',
    price: 55,
    unit: '1pc',
    image: 'https://images.unsplash.com/photo-1537395264487-2a88c04be527?w=400&h=400&fit=crop',
    description: 'Soft and delicious for stir-fry or curry.',
    category: 'vegetable',
    rating: 4.4,
    inStock: true,
  },
];

function Vegetable() {
  const cartContext = useContext(CartContext);
  const addToCart = cartContext?.addToCart ?? (() => {});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const handleAddToCart = (item: Product) => {
    addToCart(item);
    setToastMessage(`${item.name} added to cart!`);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed right-4 top-4 z-50 rounded-2xl border border-green-200 bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg animate-in slide-in-from-top">
          ✓ {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="space-y-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
            Fresh & Seasonal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Vegetable Basket
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Hand-picked fresh vegetables delivered straight to your doorstep. Packed with nutrients and farm-fresh goodness.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vegetables.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Badge */}
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  In Stock
                </div>
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(item.id)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2.5 shadow-md hover:bg-red-50 transition"
                >
                  <FaHeart
                    className={`text-lg ${
                      wishlist.includes(item.id)
                        ? 'text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(item.rating || 0) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {item.rating} ({Math.floor(Math.random() * 100) + 10} reviews)
                  </span>
                </div>

                {/* Price & Unit */}
                <div className="border-t pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold text-green-600">
                      ₹{item.price}
                    </p>
                    <p className="text-sm text-gray-500">{item.unit}</p>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors"
                  >
                    <FaShoppingCart />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Vegetable;