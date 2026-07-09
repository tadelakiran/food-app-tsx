import { useContext, useState } from 'react';
import type { Product } from '../interfaces/Product';
import { CartContext } from '../contextAPI/CartContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const items: Product[] = [
  {
    id: 201,
    name: 'Rice',
    price: 95,
    unit: '1kg',
    image: 'https://plus.unsplash.com/premium_photo-1705338026411-00639520a438?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmljZXxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Perfect for daily meals and biryani.',
    category: 'grocery',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 202,
    name: 'Olive Oil',
    price: 320,
    unit: '500ml',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8T2xpdmUlMjBPaWx8ZW58MHx8MHx8fDA%3D',
    description: 'A kitchen essential for cooking and dressing.',
    category: 'grocery',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 203,
    name: 'Sugar',
    price: 55,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1610219171722-87b3f4170557?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U3VnYXJ8ZW58MHx8MHx8fDA%3D',
    description: 'Sweet and fine for desserts and beverages.',
    category: 'grocery',
    rating: 4.5,
    inStock: true,
  },
  {
    id: 204,
    name: 'Tea',
    price: 180,
    unit: '250g',
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q29mZmUlMjBQb3dkZXJ8ZW58MHx8MHx8fDA%3D',
    description: 'A comforting daily staple for chai lovers.',
    category: 'grocery',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 205,
    name: 'Spices Mix',
    price: 120,
    unit: '250g',
    image: 'https://plus.unsplash.com/premium_photo-1692776206795-60a58a4dc817?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFNwaWNlcyUyME1peHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'A vibrant blend for rich flavor and aroma.',
    category: 'grocery',
    rating: 4.9,
    inStock: true,
  },
];

function Grocery() {
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
    <section className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed right-4 top-4 z-50 rounded-2xl border border-amber-200 bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg">
          ✓ {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">
          Pantry Staples
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
          Grocery Essentials
        </h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl">
          Everything you need to stock your kitchen beautifully.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ₹{item.price}
                </div>
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
                    {item.rating}
                  </span>
                </div>

                {/* Unit & Button */}
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    {item.unit}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-colors"
                  >
                    <FaShoppingCart className="text-sm" />
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

export default Grocery;