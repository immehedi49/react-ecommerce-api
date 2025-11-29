import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./navbar";
import ProductGrid from "./productGrid";
import CheckoutPage from "./CheckoutPage";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.length;

  return (
    <BrowserRouter>
      <Navbar cartCount={totalCartCount} onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={<ProductGrid onAddToCart={handleAddToCart} searchTerm={searchTerm} />}
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onDelete={handleDelete}
              onClearCart={handleClearCart}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
