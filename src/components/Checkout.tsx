import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { CartContext } from "./contextapi/CartContext";
import { CartContext } from "../contextAPI/CartContext";
import {
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaMoneyBillWave,
  FaQrcode,
  FaTruck,
  FaCheckCircle,
  FaShieldAlt,
  FaTag,
  FaShoppingBag,
  FaArrowLeft,
} from "react-icons/fa";
import QRCode from "react-qr-code";
import { sendOrderEmail } from "../services/emailService";
import { getAddressFromLocation } from "../apis/LocationApi";
// import { addOrder } from "../contextAPI/OrderActions";
import { OrderContext } from "../contextAPI/OrderContext";
import Swal from "sweetalert2";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const {addOrder} = useContext(OrderContext)
  const navigate = useNavigate();
  const location = useLocation();

  const {
    grandTotal = 0,
    discount = 0,
    finalAmount = 0,
    couponPercent = 0,
  } = location.state || {};

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [isPlacing, setIsPlacing] = useState(false);

  // const placeOrder = () => {
  //   if (!name.trim() || !mobile.trim() || !address.trim()) {
  //     alert("Please fill all address details.");
  //     return;
  //   }
  //   if (!paymentMode) {
  //     alert("Please select a payment method.");
  //     return;
  //   }

  //   setIsPlacing(true);
  //   setTimeout(() => {
  //     alert("Order Placed Successfully! 🎉");
  //     clearCart();
  //     navigate("/cart");
  //   }, 800);
  // };
  const placeOrder = async () => {
    if (!name || !mobile || !address) {
       await Swal.fire({
    icon: "warning",
    title: "Missing Details",
    text: "Please fill all address details.",
    confirmButtonColor: "#f59e0b",
    confirmButtonText: "OK",
  });
      return;
    }
    if (!paymentMode) {
      await Swal.fire({
    icon: "warning",
    title: "Payment Required",
    text: "Please select a payment method.",
    confirmButtonColor: "#f59e0b",
    confirmButtonText: "OK",
  });
      return;
    }
    // alert("Order Placed Successfully!");
   await Swal.fire({
  title: "🎉 Order Placed Successfully!",
  html: `
    <h3>Thank you for your purchase!</h3>
    <p>Your order has been placed successfully.</p>
  `,
  icon: "success",
  width: 650,
  padding: "2em",
  color: "#166534",
  background: "#fff",
  confirmButtonText: "View Orders",
  confirmButtonColor: "#10b981",
   timer: 5000, 
  timerProgressBar: true,
  backdrop: `
    rgba(0,0,123,0.4)
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
  `,
});

    //prepare the email information 
    // Map the template params & our Data.

    const order = {
      order_id: Math.floor(Math.random() * 100000),
      name: name,
      email: email, // Recipient email

      orders: cart.map((item) => ({
        name: item.name,
        units: item.quantity,
        price: item.price,
        image_url: item.image,
      })),

      cost: {
        shipping: 100,
        tax: 100,
        coupon: discount,
        total: finalAmount,
      },
    };

    await sendOrderEmail(order);
        const orderData = {
      orderNumber: Math.floor(Math.random() * 100000),

      customerName: name,

      mobile: mobile,

      email: email,

      address: address,

      paymentMode: paymentMode,

      grandTotal: grandTotal,

      discount: discount,

      finalAmount: finalAmount,

      orderDate: new Date().toLocaleString(),

      status: "PLACED",

      items: [...cart],
    };

    addOrder(orderData);

    clearCart();
    navigate("/orders");
  };


  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const data = await getAddressFromLocation(lat, lng);

          setAddress(data.display_name);
        } catch (error) {
          alert("Unable to fetch address.");
        }
      },
      (error) => {
        alert(error.message);
      }
    );
  };
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate("/cart")}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">Checkout</h1>
          <div className="ml-auto flex items-center gap-2 text-sm text-slate-500">
            <FaShieldAlt className="text-emerald-500" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-red-500 text-sm" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  Delivery Address
                </h2>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Email:  <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>
                <button
                type="button"
                onClick={getCurrentLocation}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
  >
                <FaMapMarkerAlt />
                Use Current Location
              </button>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Complete Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House no, Street, City, State, PIN code"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400 resize-none"
                />
              </div>
          </div>
        </section>

        {/* Payment Method */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <FaMoneyBillWave className="text-blue-500 text-sm" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Payment Method
            </h2>
          </div>

          <div className="p-6 space-y-4">
            {/* UPI Option */}
            <label
              className={`relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMode === "UPI"
                ? "border-blue-500 bg-blue-50/50"
                : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
            >
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={paymentMode === "UPI"}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-4 h-4 text-blue-600 accent-blue-600"
              />
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <FaQrcode className="text-blue-600" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-slate-900 block">
                  UPI Payment
                </span>
                <span className="text-sm text-slate-500">
                  PhonePe, GPay, Paytm
                </span>
              </div>
              {paymentMode === "UPI" && (
                <FaCheckCircle className="text-blue-500 text-xl" />
              )}
            </label>

            {/* UPI QR Display */}
            {paymentMode === "UPI" && (
              <div className="qr-section">
                <h4>Scan UPI QR to Pay ₹{finalAmount.toFixed(2)}</h4>
                <QRCode
                  value={`upi://pay?pa=8985256813@ybl&pn=Kiran's Store&am=${finalAmount.toFixed(2)}&cu=INR`}
                />
                <p>UPI ID: 8985256813@ybl</p>
              </div>
            )}

            {/* COD Option */}
            <label
              className={`relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMode === "COD"
                ? "border-emerald-500 bg-emerald-50/50"
                : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
            >
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMode === "COD"}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-4 h-4 text-emerald-600 accent-emerald-600"
              />
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <FaTruck className="text-emerald-600" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-slate-900 block">
                  Cash on Delivery
                </span>
                <span className="text-sm text-slate-500">
                  Pay when you receive
                </span>
              </div>
              {paymentMode === "COD" && (
                <FaCheckCircle className="text-emerald-500 text-xl" />
              )}
            </label>

            {/* COD Info */}
            {paymentMode === "COD" && (
              <div className="mt-2 bg-emerald-50 rounded-xl p-4 border border-emerald-100 flex items-center gap-3 animate-fade-in">
                <FaTruck className="text-emerald-500 shrink-0" />
                <p className="text-sm text-emerald-800">
                  Cash will be collected by our delivery partner at your doorstep.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Right Column - Order Summary */}
      <aside className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 sticky top-24 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <FaShoppingBag className="text-emerald-500 text-sm" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Order Summary
            </h2>
          </div>

          <div className="p-6 space-y-4">
            {/* Items Count */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 flex items-center gap-2">
                <FaShoppingBag className="text-slate-400" />
                Total Items
              </span>
              <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-1 rounded-lg">
                {totalItems}
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Grand Total */}
            <div className="flex items-center justify-between">
              <span className="text-slate-600 flex items-center gap-2">
                <FaMoneyBillWave className="text-emerald-500" />
                Grand Total
              </span>
              <span className="font-semibold text-slate-900">
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>

            {/* Discount */}
            {couponPercent > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 flex items-center gap-2">
                  <FaTag className="text-blue-500" />
                  Coupon ({couponPercent}% OFF)
                </span>
                <span className="font-semibold text-red-500">
                  -₹{discount.toFixed(2)}
                </span>
              </div>
            )}

            {/* Savings Badge */}
            {couponPercent > 0 && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 flex items-center gap-2">
                <FaTag className="text-emerald-500 text-xs" />
                <span className="text-xs font-medium text-emerald-700">
                  You saved ₹{discount.toFixed(2)} on this order
                </span>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Final Amount */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold text-slate-900">
                Payable Amount
              </span>
              <span className="text-2xl font-bold text-emerald-600">
                ₹{finalAmount.toFixed(2)}
              </span>
            </div>

            {/* Place Order Button */}
            <button
              onClick={placeOrder}
              disabled={isPlacing}
              className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl flex justify-center items-center gap-2 transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 active:scale-[0.98]"
            >
              {isPlacing ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <FaCheckCircle />
                  Place Order
                </>
              )}
            </button>

            <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1">
              <FaShieldAlt />
              Secure SSL Encryption
            </p>
          </div>
        </div>
      </aside>
    </div>
      </div >
    </div >
  );
}

export default Checkout;