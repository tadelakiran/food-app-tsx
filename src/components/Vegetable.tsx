import './Vegetable.css';

type VegetableItem = {
  id: number;
  name: string;
  price: number;
  unit: string;
  icon: string;
  description: string;
};

const vegetables: VegetableItem[] = [
  { id: 1, name: 'Tomato', price: 40, unit: '1kg', icon: '🍅', description: 'Bright and juicy for curries and salads.' },
  { id: 2, name: 'Potato', price: 35, unit: '1kg', icon: '🥔', description: 'A versatile staple for every kitchen.' },
  { id: 3, name: 'Onion', price: 45, unit: '1kg', icon: '🧅', description: 'Perfect for flavoring and cooking.' },
  { id: 4, name: 'Carrot', price: 60, unit: '500g', icon: '🥕', description: 'Sweet, crunchy, and full of nutrients.' },
  { id: 5, name: 'Cauliflower', price: 55, unit: '1pc', icon: '🥦', description: 'Soft and delicious for stir-fry or curry.' },
];

function Vegetable() {
  return (
    <section className="section-page">
      <div className="section-header">
        <div>
          <p className="eyebrow">Seasonal favorites</p>
          <h1>Vegetable Basket</h1>
        </div>
        <p>Fresh and colorful vegetables selected for your weekly menu.</p>
      </div>

      <div className="card-grid">
        {vegetables.map((item) => (
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

export default Vegetable;