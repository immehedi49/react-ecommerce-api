
import { useState } from "react";


export default function CheckoutPage({ cartItems, onUpdateQuantity, onDelete, onClearCart }) {
  const [coupon, setCoupon] = useState(""); // store coupon input
  const [discountPercent, setDiscountPercent] = useState(0); // store discount %
  const [delivery, setDelivery] = useState(0);
  const [taxPercent, setTaxPercent] = useState(0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxAmount = ((subtotal - discountAmount) * taxPercent) / 100;
  const totalAfterDiscount = subtotal - discountAmount;
  const finalTotal = totalAfterDiscount + taxAmount + parseFloat(delivery || 0);

  // Calculate total items for the summary
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Apply coupon function
  const handleApplyCoupon = () => {
    if (coupon === "m10") {
      setDiscountPercent(10);
    } else if (coupon === "m50") {
      setDiscountPercent(50);
    } else {
      setDiscountPercent(0);
      alert("Invalid coupon code");
    }
  };

  const handleProceedToPayment = () => {
    const isConfirmed = window.confirm("Are you want to pay?");
    // 2. Check the user's choice
    if (isConfirmed) {
      onClearCart();
    }
  };

  return (
    <div className="checkout-container">
      {/* 1. CART SECTION */}
      <div className="cart-section">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <a href="/">← Back to Shop</a>
        </div>
        
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th className="product-col">Product Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th style={{ width: '40px' }}></th> {/* New empty header for the delete button */}
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    {/* PRODUCT NAME (Image + Text) */}
                    <td className="product-info">
                      <img src={item.thumbnail} alt={item.title} />
                      <div className="item-details">
                        <strong>{item.title}</strong>
                        <p>{item.brand}</p>
                      </div>
                    </td>
                    
                    {/* UNIT PRICE */}
                    <td>${item.price.toFixed(2)}</td>
                    
                    {/* QUANTITY CONTROLS */}
                  <td className="quantity-controls-cell"> 
                      <div className="quantity-controls">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} disabled={item.quantity === 1}>-</button>
                        <input type="text" value={item.quantity} readOnly />
                        <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                      </div>
                    </td>
                    
                    {/* TOTAL PRICE + DELETE ICON TD (Combined cell) */}
                    <td className="total-cell-combined">
                      <span className="item-total-display">${(item.price * item.quantity).toFixed(2)}</span>
                      <button className="delete-btn" onClick={() => onDelete(item.id)}>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 2. SUMMARY SECTION */}
      <div className="summary-section">
        <div className="coupon">
          <h3>Coupon Code</h3>
          <div className="coupon-input-group">
            <input type="text" placeholder="Enter Coupon" value={coupon}
            onChange={(e) => setCoupon(e.target.value)} />
            <button onClick={handleApplyCoupon}>Apply</button>
          </div>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {/* Subtotal (1 items) */}
          <div className="summary-row">
            <p>Subtotal ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}):</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          {/* Discount */}
          <div className="summary-row discount">
            <p>Discount</p>
            <p className="discount-value">-${discountAmount.toFixed(2)}</p>
          </div>
          {/* Delivery (New Input) */}
          <div className="summary-row delivery">
            <p>Delivery</p>
            <input
              type="number"
              value={delivery}
              onChange={(e) => setDelivery(Number(e.target.value))}
              min="0"
              className="summary-input" />
            <p>${parseFloat(delivery || 0).toFixed(2)}</p> 
          </div>
          {/* Tax (New Input) */}
          <div className="summary-row tax">
            <p>Tax (%)</p>
            <input
              type="number"
              value={taxPercent}
              onChange={(e) => setTaxPercent(Number(e.target.value))}
              min="0"
              className="summary-input"
            />
            <p>${taxAmount.toFixed(2)}</p>
          </div>
          
          <hr className="summary-divider"/>
          
          {/* Total */}
          <div className="summary-row total">
            <h4>Total</h4>
            <h4>${finalTotal.toFixed(2)}</h4>
          </div>
          

        </div>
                   {/* Payment Method */}
          <div className="payment-method">
              <h3>Payment Method</h3>
              <div className="payment-icons">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" alt="Bitcoin" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
          </div>
          <button className="pay-btn" disabled={cartItems.length === 0}
            onClick={handleProceedToPayment}>
            Proceed to Payment
          </button>
          </div>
          

      </div>
    </div>
  );
}