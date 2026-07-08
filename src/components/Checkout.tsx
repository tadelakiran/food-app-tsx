import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as
    | {
        grandTotal: number;
        discount: number;
        finalAmount: number;
        couponPercent: number;
      }
    | null;

  if (!state) {
    return (
      <div className="min-h-screen bg-slate-100 p-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-xl text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            No checkout data found
          </h1>
          <p className="text-slate-600 mb-6">
            Please add items to cart and return to checkout.
          </p>
          <button
            onClick={() => navigate("/cart")}
            className="rounded-full bg-emerald-600 px-8 py-3 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-10 shadow-2xl">
        <div className="mb-10 flex flex-col gap-4">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">
            Checkout
          </span>
          <h1 className="text-5xl font-bold text-slate-900">
            Ready to place your order
          </h1>
          <p className="max-w-2xl text-slate-600">
            Review your totals and confirm payment to complete the order.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Subtotal
            </p>
            <p className="mt-4 text-3xl font-bold text-slate-900">
              ₹{state.grandTotal.toFixed(2)}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Discount
            </p>
            <p className="mt-4 text-3xl font-bold text-rose-600">
              ₹{state.discount.toFixed(2)}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Payable
            </p>
            <p className="mt-4 text-3xl font-bold text-emerald-700">
              ₹{state.finalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Complete your purchase
          </h2>
          <p className="text-slate-600 mb-8">
            We will redirect you to payment once you confirm your order.
          </p>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-emerald-700"
          >
            Confirm and Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;