import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./components/Home";
// import Veg from "./components/Veg";
import NonVeg from "./components/NonVeg";
import Milk from "./components/Milk";
import Fruits from "./components/Fruits";
import Grocery from "./components/Grocery";
import Vegetable from "./components/Vegetable";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Register from "./components/Register";
import { FcHome } from "react-icons/fc";
import { FaShoppingCart } from 'react-icons/fa';
import Orders from "./components/Order";
import { useContext } from "react";
import { CartContext } from "./contextAPI/CartContext";
// import { CartContext } from "./contextAPI/CartContext";

function App() {
   let {cart}=  useContext(CartContext)
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-2xl">
                🥗
              </div>
              <div>
                <p className="text-base font-semibold text-slate-900">Fresh Cart</p>
                <p className="text-sm text-slate-500">Daily essentials delivered fresh</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <span className="inline-flex items-center gap-2">
                  <FcHome /> Home
                </span>
              </NavLink>

              {/* <NavLink
                to="/veg"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <span className="inline-flex items-center gap-2">
                  <FcGallery /> Veg
                </span>
              </NavLink> */}

              <NavLink
                to="/non-veg"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                🍗 Non-Veg
              </NavLink>

              <NavLink
                to="/milk"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                🥛 Milk
              </NavLink>

              <NavLink
                to="/fruits"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                🍎 Fruits
              </NavLink>

              <NavLink
                to="/vegetable"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                🥕 Vegetable
              </NavLink>

              <NavLink
                to="/grocery"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                🛒 Grocery
              </NavLink>
                 <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                 Orders
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <span className="inline-flex items-center gap-2">
                  <FaShoppingCart /> Cart ({cart.length})
                </span>
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                🤵 Register
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/veg" element={<Veg />} /> */}
            <Route path="/non-veg" element={<NonVeg />} />
            <Route path="/milk" element={<Milk />} />
            <Route path="/fruits" element={<Fruits />} />
            <Route path="/grocery" element={<Grocery />} />
            <Route path="/vegetable" element={<Vegetable />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;