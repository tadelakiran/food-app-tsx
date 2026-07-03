import './Veg.css';

type VegItem = {
  id: number;
  name: string;
  price: number;
  unit: string;
  icon: string;
  description: string;
};

const items: VegItem[] = [
  { id: 1, name: 'Spinach', price: 30, unit: '1 bunch', icon: '🥬', description: 'Fresh green leaves packed with nutrients.' },
  { id: 2, name: 'Broccoli', price: 70, unit: '500g', icon: '🥦', description: 'Crunchy florets for healthy meals.' },
  { id: 3, name: 'Bell Pepper', price: 80, unit: '500g', icon: '🫑', description: 'Colorful and rich in vitamins.' },
  { id: 4, name: 'Cucumber', price: 35, unit: '1 kg', icon: '🥒', description: 'Cool and refreshing for salads.' },
  { id: 5, name: 'Pumpkin', price: 55, unit: '1 kg', icon: '🎃', description: 'Soft and sweet for soups and curries.' },
];

function Veg() {
  return (
    <section className="section-page">
      <div className="section-header">
        <div>
          <p className="eyebrow">Healthy picks</p>
          <h1>Veg Essentials</h1>
        </div>
        <p>Wholesome greens and vegetables for everyday cooking.</p>
      </div>

      <div className="card-grid">
        {items.map((item) => (
          <article className="product-card" key={item.id}>
            <div className="card-icon">{item.icon}</div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="product-meta">
              <span>₹{item.price}</span>
              <span>{item.unit}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Veg;