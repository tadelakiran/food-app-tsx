import { useContext, useState } from 'react';
import type { Product } from '../interfaces/Product';
import { CartContext } from '../contextAPI/CartContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const items: Product[] = [
  {
    id: 301,
    name: 'Whole Milk',
    price: 70,
    unit: '1 L',
    image: 'https://images.unsplash.com/photo-1576186726115-4d51596775d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFdob2x3JTIwTWlsa3xlbnwwfHwwfHx8MA%3D%3D',
    description: 'Creamy and fresh for tea, coffee, or breakfast.',
    category: 'milk',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 302,
    name: 'Paneer',
    price: 180,
    unit: '200g',
    image: 'https://media.istockphoto.com/id/2209167127/photo/indian-paneer-cheese-made-from-fresh-milk-and-lemon-juice-on-grey-background-copy-space.webp?a=1&b=1&s=612x612&w=0&k=20&c=PAn7GuHgdN5S4hlXW2lQcUV-OGegD5GuLyvKf-fsr4E=',
    description: 'Soft cottage cheese perfect for curries.',
    category: 'milk',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 303,
    name: 'Yogurt',
    price: 90,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8WW9ndXJ0fGVufDB8fDB8fHww',
    description: 'Smooth and healthy for snacks or desserts.',
    category: 'milk',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 304,
    name: 'Butter',
    price: 60,
    unit: '200g',
    image: 'https://plus.unsplash.com/premium_photo-1700440539073-c769891a9e3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QnV0dGVyfGVufDB8fDB8fHww',
    description: 'Rich and flavorful for cooking and baking.',
    category: 'milk',
    rating: 4.5,
    inStock: true,
  },
  {
    id: 305,
    name: 'Flavored Milk',
    price: 45,
    unit: '250ml',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Rmxhdm9yZWQlMjBNaWxrfGVufDB8fDB8fHww',
    description: 'A delightful drink for kids and adults alike.',
    category: 'milk',
    rating: 4.4,
    inStock: true,
  },
];

function Milk() {
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
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed right-4 top-4 z-50 rounded-2xl border border-blue-200 bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg">
          ✓ {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
          Dairy Delight
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
          Milk & Dairy Products
        </h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl">
          Fresh dairy essentials with rich texture and great taste.
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
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-colors"
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

export default Milk;