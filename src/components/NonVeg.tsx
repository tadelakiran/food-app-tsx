import './NonVeg.css';

type NonVegItem = {
  id: number;
  name: string;
  price: number;
  unit: string;
  icon: string;
  description: string;
};

const items: NonVegItem[] = [
  { id: 1, name: 'Chicken Breast', price: 220, unit: '500g', icon: '🍗', description: 'Lean and juicy protein for your meals.' },
  { id: 2, name: 'Salmon', price: 480, unit: '300g', icon: '🐟', description: 'Rich in omega-3 and perfect for grilling.' },
  { id: 3, name: 'Prawns', price: 320, unit: '400g', icon: '🦐', description: 'Fresh and flavorful seafood option.' },
  { id: 4, name: 'Eggs', price: 90, unit: '12 pcs', icon: '🥚', description: 'A protein-rich staple for breakfast.' },
  { id: 5, name: 'Turkey', price: 260, unit: '500g', icon: '🦃', description: 'Lean and delicious for sandwiches or roast.' },
];

function NonVeg() {
  return (
    <section className="section-page">
      <div className="section-header">
        <div>
          <p className="eyebrow">Protein rich</p>
          <h1>Non-Veg Favorites</h1>
        </div>
        <p>Premium meat and seafood choices for hearty meals.</p>
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

export default NonVeg;