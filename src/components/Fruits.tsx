import './Fruits.css';

type FruitItem = {
  id: number;
  name: string;
  price: number;
  unit: string;
  icon: string;
  description: string;
};

const items: FruitItem[] = [
  { id: 1, name: 'Apple', price: 120, unit: '1kg', icon: '🍎', description: 'Crisp and sweet for daily snacking.' },
  { id: 2, name: 'Mango', price: 180, unit: '1kg', icon: '🥭', description: 'Juicy and tropical in season.' },
  { id: 3, name: 'Banana', price: 60, unit: '1 dozen', icon: '🍌', description: 'Soft, filling, and always a favorite.' },
  { id: 4, name: 'Watermelon', price: 90, unit: '1 pc', icon: '🍉', description: 'Refreshing and perfect for summer.' },
  { id: 5, name: 'Pineapple', price: 140, unit: '1 pc', icon: '🍍', description: 'Sweet and tangy with a tropical twist.' },
];

function Fruits() {
  return (
    <section className="section-page">
      <div className="section-header">
        <div>
          <p className="eyebrow">Sweet & juicy</p>
          <h1>Fruit Collection</h1>
        </div>
        <p>Bright, fresh, and delicious fruits for every mood.</p>
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

export default Fruits;