import { useContext, useState } from 'react';
import type { Product } from '../interfaces/Product';
import { CartContext } from '../contextAPI/CartContext';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const items: Product[] = [
  {
    id: 401,
    name: 'Chicken Breast',
    price: 220,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=400&fit=crop',
    description: 'Lean and juicy protein for your meals.',
    category: 'nonveg',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 402,
    name: 'Salmon',
    price: 480,
    unit: '300g',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
    description: 'Rich in omega-3 and perfect for grilling.',
    category: 'nonveg',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 403,
    name: 'Prawns',
    price: 320,
    unit: '400g',
    image: 'https://plus.unsplash.com/premium_photo-1667115593089-17f5b6116217?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJhd25zfGVufDB8fDB8fHww',
    description: 'Fresh and flavorful seafood option.',
    category: 'nonveg',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 404,
    name: 'Eggs',
    price: 90,
    unit: '12 pcs',
    image: 'https://plus.unsplash.com/premium_photo-1676686125407-227f3d352df8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8RWdnc3xlbnwwfHwwfHx8MA%3D%3D',
    description: 'A protein-rich staple for breakfast.',
    category: 'nonveg',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 405,
    name: 'Turkey',
    price: 260,
    unit: '500g',
    image: 'https://plus.unsplash.com/premium_photo-1664391682453-546426dba581?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VHVya2V5JTIwbm9uJTIwdmVnfGVufDB8fDB8fHww',
    description: 'Lean and delicious for sandwiches or roast.',
    category: 'nonveg',
    rating: 4.5,
    inStock: true,
  },
];

function NonVeg() {
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
    <section className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed right-4 top-4 z-50 rounded-2xl border border-red-200 bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg">
          ✓ {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
          Protein Rich
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
          Non-Veg Favorites
        </h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl">
          Premium meat and seafood choices for hearty and delicious meals.
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
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-colors"
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

export default NonVeg;