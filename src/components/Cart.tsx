import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaCheckCircle,
  FaTrash,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { CartContext } from "../contextAPI/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const grandTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const renderImage = (image: string, name: string) => (
    <img
      src={image}
      alt={name}
      className="h-36 w-36 rounded-3xl object-cover bg-slate-100"
    />
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="mb-10 text-center text-4xl font-bold text-emerald-700">
        🛒 My Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-xl">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            Your Cart is Empty
          </h2>

          <p className="mb-6 text-slate-600">
            Add some products to continue shopping.
          </p>

          <button
            onClick={() => navigate("/vegetable")}
            className="rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-6 lg:col-span-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-lg transition hover:shadow-2xl md:flex-row md:items-center"
              >
                {renderImage(item.image, item.name)}

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">
                      ₹{item.price}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold">
                      {item.unit}
                    </span>

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                      Total : ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3 rounded-full bg-slate-100 p-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="rounded-full bg-red-500 p-3 text-white transition hover:bg-red-600"
                    >
                      <FaMinus />
                    </button>

                    <span className="w-8 text-center text-xl font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="rounded-full bg-emerald-500 p-3 text-white transition hover:bg-emerald-600"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    <FaTrash />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="h-fit rounded-3xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <FaShoppingCart className="text-3xl text-emerald-600" />
              <h2 className="text-3xl font-bold text-slate-900">
                Order Summary
              </h2>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <FaMoneyBillWave className="text-emerald-600" />
                  <span>Grand Total</span>
                </div>

                <span className="font-bold">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>

              <div className="rounded-3xl bg-emerald-50 px-4 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <FaCheckCircle className="text-blue-600" />
                    <span>Payable Amount</span>
                  </div>

                  <span className="text-3xl font-bold text-emerald-700">
                    ₹{grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    grandTotal,
                  },
                })
              }
              className="mt-8 w-full rounded-3xl bg-emerald-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-emerald-700"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Cart;