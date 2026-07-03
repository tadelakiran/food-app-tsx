import './Milk.css';

type MilkItem = {
  id: number;
  name: string;
  price: number;
  unit: string;
  icon: string;
  description: string;
};

const items: MilkItem[] = [
  { id: 1, name: 'Whole Milk', price: 70, unit: '1 L', icon: '🥛', description: 'Creamy and fresh for tea, coffee, or breakfast.' },
  { id: 2, name: 'Paneer', price: 180, unit: '200g', icon: '🧀', description: 'Soft cottage cheese perfect for curries.' },
  { id: 3, name: 'Yogurt', price: 90, unit: '500g', icon: '🍶', description: 'Smooth and healthy for snacks or desserts.' },
  { id: 4, name: 'Butter', price: 60, unit: '200g', icon: '🧈', description: 'Rich and flavorful for cooking and baking.' },
  { id: 5, name: 'Flavored Milk', price: 45, unit: '250ml', icon: '🥤', description: 'A delightful drink for kids and adults alike.' },
];

function Milk() {
  return (
    <section className="section-page">
      <div className="section-header">
        <div>
          <p className="eyebrow">Dairy delight</p>
          <h1>Milk & Dairy</h1>
        </div>
        <p>Fresh dairy essentials with rich texture and great taste.</p>
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

export default Milk;