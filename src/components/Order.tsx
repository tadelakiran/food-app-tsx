import { useContext, useState } from "react";
import { OrderContext } from "../contextAPI/OrderContext";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaMoneyBillWave,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";

function Orders() {
  const { orders } = useContext(OrderContext);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const toggleOrder = (orderNumber: number) =>
    setExpandedOrder((prev) => (prev === orderNumber ? null : orderNumber));

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-12">
        <div className="w-full max-w-2xl rounded-[32px] bg-white p-10 text-center shadow-xl shadow-slate-200/70">
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">No Orders Yet</h1>
          <p className="text-slate-600">
            Start shopping and your past orders will appear here for easy tracking.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[30px] bg-white px-6 py-8 shadow-xl shadow-slate-200/80 mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">📦 My Orders</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Keep your order history clean and easy to read. Tap any order to view details.
          </p>
        </div>

        <div className="space-y-5">
          {orders.map((order) => {
            const isOpen = expandedOrder === order.orderNumber;

            return (
              <article
                key={order.orderNumber}
                className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleOrder(order.orderNumber)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.34em] text-slate-400">
                      Order #{order.orderNumber}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                        {order.status}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                        <FaCalendarAlt className="text-slate-400" />
                        {order.orderDate}
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                        <FaMoneyBillWave className="text-slate-400" />
                        ₹{order.grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-200 px-6 py-6 md:grid md:grid-cols-[1.25fr_0.9fr] md:gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Items</h3>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 rounded-[26px] border border-slate-200 bg-slate-50 p-3"
                          >
                            <img
                              src={item.image}
                              alt={item.name || item.description}
                              className="h-14 w-14 rounded-2xl object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-medium text-slate-900">
                                {item.name || item.description}
                              </p>
                              <p className="text-sm text-slate-500">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-emerald-700">
                                ₹{item.price.toFixed(2)}
                              </p>
                              <p className="text-sm text-slate-500">x{item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <aside className="rounded-[26px] border border-slate-200 bg-slate-50 p-5">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Order summary</h3>
                      <div className="space-y-4 text-slate-700">
                        <div className="flex items-center gap-3 text-sm">
                          <FaUser className="text-emerald-600" />
                          <span>{order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <FaPhone className="text-blue-600" />
                          <span>{order.mobile}</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm">
                          <FaMapMarkerAlt className="text-red-600 mt-1" />
                          <span>{order.address}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <FaCreditCard className="text-purple-600" />
                          <span>{order.paymentMode}</span>
                        </div>

                        <div className="rounded-[24px] bg-white p-4">
                          <div className="flex items-center justify-between text-sm text-slate-500">
                            <span>Subtotal</span>
                            <span>₹{order.grandTotal.toFixed(2)}</span>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                            <span>Discount</span>
                            <span>- ₹{order.discount.toFixed(2)}</span>
                          </div>
                          <div className="mt-5 flex items-center justify-between text-base font-semibold text-emerald-700">
                            <span>Total</span>
                            <span>₹{order.finalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Orders;