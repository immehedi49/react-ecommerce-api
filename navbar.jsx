
import { useNavigate } from "react-router-dom";

export default function Navbar({ cartCount, onSearch }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="./assets/ecommerce.png" alt="logo" className="nav-img" />
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      <div className="nav-actions">
        <input
          type="text"
          placeholder="Search..."
          className="search-box"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          {cartCount > 0 ? `Checkout (${cartCount})` : "Checkout"}
        </button>
      </div>
    </nav>
  );
}

