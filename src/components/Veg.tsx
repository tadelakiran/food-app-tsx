import { useContext, useState } from 'react';
import type { Product } from '../interfaces/Product';
import { CartContext } from '../contextAPI/CartContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const items: Product[] = [
  {
    id: 501,
    name: 'Spinach',
    price: 30,
    unit: '1 bunch',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Fresh green leaves packed with iron and nutrients.',
    category: 'vegetable',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 502,
    name: 'Broccoli',
    price: 70,
    unit: '500g',
    image: 'https://plus.unsplash.com/premium_photo-1724250160975-6c789dbfdc9f?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnJvY2NvbGl8ZW58MHx8MHx8fDA%3D',
    description: 'Crunchy florets perfect for healthy stir-fries.',
    category: 'vegetable',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 503,
    name: 'Bell Pepper',
    price: 80,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1592548868664-f8b4e4b1cfb7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVsbCUyMHBlcHBlcnxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Colorful and rich in Vitamin C.',
    category: 'vegetable',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 504,
    name: 'Cucumber',
    price: 35,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1587411768638-ec71f8e33b78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3VjdW1iZXJ8ZW58MHx8MHx8fDA%3D',
    description: 'Cool and refreshing for salads and smoothies.',
    category: 'vegetable',
    rating: 4.5,
    inStock: true,
  },
  {
    id: 505,
    name: 'Pumpkin',
    price: 55,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1692680919402-95fc56f99225?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVtcGtpbnxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Soft and sweet for soups and curries.',
    category: 'vegetable',
    rating: 4.4,
    inStock: true,
  },
];

function Veg() {
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
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed right-4 top-4 z-50 rounded-2xl border border-emerald-200 bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg">
          ✓ {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
          Healthy Picks
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
          Veg Essentials
        </h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl">
          Wholesome greens and vegetables for everyday cooking.
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
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ₹{item.price}
                </div>
                <button
                  onClick={() => toggleWishlist(item.id)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2.5 shadow-md hover:bg-red-50"
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
                </div>

                {/* Unit & Button */}
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    {item.unit}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2"
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

export default Veg;