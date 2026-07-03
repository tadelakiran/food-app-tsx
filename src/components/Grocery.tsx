import './Grocery.css';

type GroceryItem = {
  id: number;
  name: string;
  price: number;
  unit: string;
  icon: string;
  description: string;
};

const items: GroceryItem[] = [
  { id: 1, name: 'Rice', price: 95, unit: '1kg', icon: '🍚', description: 'Perfect for daily meals and biryani.' },
  { id: 2, name: 'Olive Oil', price: 320, unit: '500ml', icon: '🫒', description: 'A kitchen essential for cooking and dressing.' },
  { id: 3, name: 'Sugar', price: 55, unit: '1kg', icon: '🍬', description: 'Sweet and fine for desserts and beverages.' },
  { id: 4, name: 'Tea', price: 180, unit: '250g', icon: '🍵', description: 'A comforting daily staple for chai lovers.' },
  { id: 5, name: 'Spices', price: 120, unit: '250g', icon: '🌶️', description: 'A vibrant blend for rich flavor and aroma.' },
];

function Grocery() {
  return (
    <section className="section-page">
      <div className="section-header">
        <div>
          <p className="eyebrow">Pantry staples</p>
          <h1>Grocery Essentials</h1>
        </div>
        <p>Everything you need to stock your kitchen beautifully.</p>
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

export default Grocery;