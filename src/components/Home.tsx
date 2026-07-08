import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Fresh Produce",
    text: "Hand-picked veggies and fruits arrive every morning.",
    icon: "🥬",
  },
  {
    title: "Daily Deals",
    text: "Enjoy premium discounts on your weekly essentials.",
    icon: "🎉",
  },
  {
    title: "Fast Checkout",
    text: "Smooth ordering and quick delivery for busy days.",
    icon: "⚡",
  },
];

const bestSellers = [
  { name: "Organic Tomatoes", icon: "🍅" },
  { name: "Sweet Mangoes", icon: "🥭" },
  { name: "Fresh Paneer", icon: "🧀" },
];

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-green-50">
      <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div>
              <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Fresh & Fast
              </span>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                Discover everyday essentials with a premium touch.
              </h1>
            </div>

            <p className="max-w-xl text-lg leading-8 text-slate-600">
              From farm-fresh vegetables to pantry staples, enjoy a beautifully curated shopping experience with fast delivery.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/vegetable"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-700"
              >
                Shop Now
              </Link>
              <Link
                to="/fruits"
                className="inline-flex items-center justify-center rounded-full border border-emerald-600 bg-white px-8 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Explore Fruits
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border-l-4 border-emerald-600 bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                  Today's Picks
                </span>
                <h3 className="mt-4 text-3xl font-bold text-slate-900">Best Sellers</h3>
              </div>
              <div className="text-4xl">🏆</div>
            </div>

            <ul className="space-y-4">
              {bestSellers.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-4 rounded-2xl bg-slate-50 px-4 py-4 text-slate-800 transition hover:bg-emerald-50"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="font-semibold">{item.name}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="mt-16 grid gap-8 md:grid-cols-3">
          {highlights.map((item, idx) => (
            <article
              key={idx}
              className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-5 text-6xl">{item.icon}</div>
              <h3 className="mb-3 text-2xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="text-slate-600">{item.text}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Home;