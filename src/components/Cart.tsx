import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaCheckCircle,
  FaTrash,
  FaPlus,
  FaMinus,
  FaTicketAlt,
} from "react-icons/fa";
import { CartContext } from "../contextAPI/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { coupons } from "../data/Coupons";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const couponRef = useRef<HTMLInputElement>(null);

  const [couponPercent, setCouponPercent] = useState(0);
  const [message, setMessage] = useState("");

  const applyCoupon = () => {
    const couponCode = couponRef.current?.value.trim() || "";

    if (!couponCode) {
      toast.warning("Please enter a coupon code.");
      setCouponPercent(0);
      setMessage("Please enter a coupon code.");
      return;
    }

    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase()
    );

    if (coupon) {
      setCouponPercent(coupon.discount);
      setMessage(`🎉 Coupon Applied (${coupon.discount}% OFF)`);
      toast.success(
        `Coupon Applied Successfully (${coupon.discount}% OFF)`
      );
    } else {
      setCouponPercent(0);
      setMessage("❌ Invalid Coupon Code");
      toast.error("Invalid Coupon Code");
    }
  };

  const grandTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = (grandTotal * couponPercent) / 100;
  const finalAmount = grandTotal - discount;

  const renderImage = (image: string, name: string) => (
    <img
      src={image}
      alt={name}
      className="h-36 w-36 rounded-3xl object-cover bg-slate-100"
    />
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
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

                {/* Quantity Controls */}
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

            {/* Coupon Section */}
            <div className="mb-6 flex gap-3">
              <div className="relative flex-1">
                <input
                  ref={couponRef}
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>
              <button
                onClick={applyCoupon}
                className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
              >
                Apply
              </button>
            </div>

            {message && (
              <p
                className={`mb-5 font-semibold ${
                  couponPercent > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <div className="space-y-5">
              {/* Grand Total (before discount) */}
              <div className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <FaMoneyBillWave className="text-emerald-600" />
                  <span>Grand Total</span>
                </div>
                <span className="font-bold">₹{grandTotal.toFixed(2)}</span>
              </div>

              {/* Discount Display (shown only when coupon applied) */}
              {couponPercent > 0 && (
                <div className="flex items-center justify-between rounded-3xl bg-blue-50 px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FaTicketAlt className="text-blue-600" />
                    <span>Discount ({couponPercent}%)</span>
                  </div>
                  <span className="font-bold text-blue-600">
                    -₹{discount.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Final Payable Amount */}
              <div className="rounded-3xl bg-emerald-50 px-4 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <FaCheckCircle className="text-blue-600" />
                    <span>Payable Amount</span>
                  </div>
                  <span className="text-3xl font-bold text-emerald-700">
                    ₹{finalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      grandTotal,
                      discount,
                      finalAmount,
                      couponPercent,
                    },
                  })
                }
                className="mt-8 w-full rounded-3xl bg-emerald-600 px-6 py-4 text-base font-semibold text-white transition hover:bg-emerald-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Cart;