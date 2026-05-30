import React, { useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import './Menu.css';

const featuredItems = [
  {
    id: 'greek-salad',
    title: 'Greek Salad',
    description: 'Tomato, cucumber, olives, feta, and lemon vinaigrette.',
    price: '$12.99',
    image: '/icons_assets/greek%20salad.jpg',
  },
  {
    id: 'bruchetta',
    title: 'Bruchetta',
    description: 'Grilled bread, fresh tomato, basil, and garlic.',
    price: '$8.99',
    image: '/icons_assets/bruchetta.svg',
  },
  {
    id: 'lemon-dessert',
    title: 'Lemon Dessert',
    description: 'Creamy lemon mousse with crunchy almond crumbles.',
    price: '$8.99',
    image: '/icons_assets/lemon%20dessert.jpg',
  },
];

const menuSections = [
  {
    title: 'Starters',
    items: [
      { id: 'hummus-pita', title: 'Hummus & Pita', description: 'Creamy chickpea hummus with warm pita triangles.', price: '$9.50' },
      { id: 'marinated-olives', title: 'Marinated Olives', description: 'Spiced olives with lemon zest and herbs.', price: '$7.50' },
      { id: 'lentil-soup', title: 'Lentil Soup', description: 'Warm lentils with fresh herbs and olive oil.', price: '$10.50' },
      { id: 'feta-dip', title: 'Feta Dip', description: 'Baked feta with tomato compote and herbs.', price: '$9.99' },
    ],
  },
  {
    title: 'Mains',
    items: [
      { id: 'grilled-chicken', title: 'Grilled Chicken', description: 'Marinated chicken with roasted vegetables.', price: '$18.50' },
      { id: 'seafood-pasta', title: 'Seafood Pasta', description: 'Linguine with shrimp, clams, and lemon butter.', price: '$22.00' },
      { id: 'vegetable-bowl', title: 'Vegetable Bowl', description: 'Seasonal grains, roasted vegetables, and tahini.', price: '$16.00' },
      { id: 'steak-frites', title: 'Steak Frites', description: 'Herb-rubbed steak with crispy fries and chimichurri.', price: '$24.00' },
    ],
  },
  {
    title: 'Desserts',
    items: [
      { id: 'baklava', title: 'Baklava', description: 'Nutty phyllo pastry with honey syrup.', price: '$7.99' },
      { id: 'pistachio-gelato', title: 'Pistachio Gelato', description: 'Creamy house-made gelato with pistachio nuts.', price: '$8.50' },
      { id: 'lemon-tart', title: 'Lemon Tart', description: 'Tangy lemon tart with crisp crust.', price: '$8.99' },
      { id: 'chocolate-mousse', title: 'Chocolate Mousse', description: 'Rich chocolate mousse with whipped cream.', price: '$9.25' },
    ],
  },
];

function AddButton({ item }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.find((i) => i.id === item.id);

  const handleAdd = useCallback(() => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }, [addItem, item]);

  return (
    <button
      type="button"
      className={`btn-add-cart${added ? ' added' : ''}`}
      onClick={handleAdd}
      aria-label={`Add ${item.title} to cart`}
    >
      {added ? '✓ Added' : inCart ? `Add Again` : 'Add to Cart'}
    </button>
  );
}

function Menu() {
  return (
    <div className="Menu container">
      <section className="menu-hero">
        <h1>Our menu selections</h1>
        <p>Explore seasonal plates and shareable favorites made for every appetite.</p>
      </section>

      <section className="menu-featured-grid">
        {featuredItems.map((item) => (
          <article key={item.id} className="menu-item">
            <img src={item.image} alt={item.title} />
            <div className="menu-item-content">
              <div className="menu-item-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="menu-item-footer">
                <span className="menu-price">{item.price}</span>
                <AddButton item={item} />
              </div>
            </div>
          </article>
        ))}
      </section>

      {menuSections.map((section) => (
        <section key={section.title} className="menu-category">
          <h2 className="menu-category-title">{section.title}</h2>
          <div className="menu-row">
            {section.items.map((item) => (
              <article key={item.id} className="menu-card-simple">
                <div className="menu-card-simple-top">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="menu-card-simple-footer">
                  <span className="menu-price">{item.price}</span>
                  <AddButton item={item} />
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Menu;
