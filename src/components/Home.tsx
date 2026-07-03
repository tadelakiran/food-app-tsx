import { Link } from 'react-router-dom';
import './Home.css';

const highlights = [
  {
    title: 'Fresh Produce',
    text: 'Hand-picked veggies and fruits arrive every morning.',
    icon: '🥬',
  },
  {
    title: 'Daily Deals',
    text: 'Enjoy premium discounts on your weekly essentials.',
    icon: '🎉',
  },
  {
    title: 'Fast Checkout',
    text: 'Smooth ordering and quick delivery for busy days.',
    icon: '⚡',
  },
];

function Home() {
  return (
    <section className="home-page">
      <div className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Fresh & Fast</span>
          <h1>Discover everyday essentials with a premium touch.</h1>
          <p>
            From farm-fresh vegetables to pantry staples, enjoy a beautifully curated shopping experience.
          </p>

          <div className="hero-actions">
            <Link to="/vegetable" className="btn primary">
              Shop Now
            </Link>
            <Link to="/fruits" className="btn secondary">
              Explore Fruits
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-badge">Today’s Picks</div>
          <h3>Best Sellers</h3>
          <ul>
            <li>Organic Tomatoes</li>
            <li>Sweet Mangoes</li>
            <li>Fresh Paneer</li>
          </ul>
        </div>
      </div>

      <div className="info-grid">
        {highlights.map((item) => (
          <article className="info-card" key={item.title}>
            <div className="info-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Home;