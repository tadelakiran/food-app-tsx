import { useContext, useState } from 'react';
import type { Product } from '../interfaces/Product';
import { CartContext } from '../contextAPI/CartContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const items: Product[] = [
  {
    id: 1,
    name: 'Apple',
    price: 120,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1560806674-104fc7c51b0b?w=400&h=400&fit=crop',
    description: 'Crisp and sweet apples for daily snacking.',
    category: 'fruit',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2,
    name: 'Mango',
    price: 180,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1552181551-eb658ba42602?w=400&h=400&fit=crop',
    description: 'Juicy and tropical mangoes at their best.',
    category: 'fruit',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 3,
    name: 'Banana',
    price: 60,
    unit: '1 dozen',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop',
    description: 'Soft, filling, and always a favorite.',
    category: 'fruit',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 4,
    name: 'Watermelon',
    price: 90,
    unit: '1 pc',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd4837d?w=400&h=400&fit=crop',
    description: 'Refreshing and perfect for summer.',
    category: 'fruit',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 5,
    name: 'Pineapple',
    price: 140,
    unit: '1 pc',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd4837d?w=400&h=400&fit=crop',
    description: 'Sweet and tangy with tropical twist.',
    category: 'fruit',
    rating: 4.5,
    inStock: true,
  },
];

function Fruits() {
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
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed right-4 top-4 z-50 rounded-2xl border border-orange-200 bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg">
          ✓ {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
          Sweet & Juicy
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
          Fresh Fruit Collection
        </h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl">
          Bright, fresh, and delicious fruits picked daily for your family.
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
              <div className="relative h-64 bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ₹{item.price}
                </div>
                <button
                  onClick={() => toggleWishlist(item.id)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2.5 shadow-md"
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

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(item.rating || 0) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    {item.unit}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2"
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

export default Fruits;