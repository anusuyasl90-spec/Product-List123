import React, { useState } from "react";
import productsData from "./products.json";
import iphoneImg from "./images/iphone14.jpg";
import samsungTvImg from "./images/samsungtv.jpg";
import nikeShoesImg from "./images/nikeshoes.jpg";
import laptopImg from "./images/laptop.jpg";

const imageMap = {
  "iphone14.jpg": iphoneImg,
  "samsungtv.jpg": samsungTvImg,
  "nikeshoes.jpg": nikeShoesImg,
  "laptop.jpg": laptopImg,
};

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);

  const categories = ["All", "Mobile", "Electronics", "Fashion"];

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert("Added to Cart ✅");
  };

  return (
    <div style={styles.container}>
      <h2>Product List 🛒</h2>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <p>Cart Items: {cart.length}</p>

      <div style={styles.grid}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={styles.card}>
            <img
              src={imageMap[product.image]}
              alt={product.title}
              style={styles.image}
            />
            <h4>{product.title}</h4>
            <p>₹ {product.price}</p>

            <button
              onClick={() => addToCart(product)}
              style={styles.button}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial",
  },
  controls: {
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    width: "200px",
    marginRight: "10px",
  },
  select: {
    padding: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    background: "black",
    color: "white",
  },
};

export default App;