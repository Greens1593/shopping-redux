import React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import "./Cart.css";
const CartItems = () => {
  const cartItems = useSelector((state) => state.cart.itemList);
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <CartItem
              id={item.id}
              price={item.price}
              name={item.name}
              total={item.totalPrice}
              quantity={item.quantity}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
