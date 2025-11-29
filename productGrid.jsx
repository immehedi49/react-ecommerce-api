import { useEffect, useState } from "react";

export default function ProductGrid({ onAddToCart, searchTerm }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2 style={{ textAlign: "center" }}>Loading products...</h2>;
  }

  // Filter based on search term
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredProducts.length === 0 && searchTerm) {
    return (
      <h2 style={{ textAlign: "center" }}>
        No products found matching "{searchTerm}"
      </h2>
    );
  }

return (
  <div className="product-grid">
    {filteredProducts.map((p) => (
      <div key={p.id} className="single-product">
        <div className="product-img-container">
          <img src={p.thumbnail} alt={p.title} className="product-img" />

          {/* Hidden button - appears on hover */}
          <button
            onClick={() => onAddToCart(p)}
            className="add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>

        <div className="product-details">
          <p><strong>{p.title}</strong></p>
          <p>{p.category}</p>
          <p>{p.brand}</p>
        </div>

        <div className="product-pr">
          <p className="price">${p.price}</p>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < Math.round(p.rating) ? "star filled" : "star"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

}
