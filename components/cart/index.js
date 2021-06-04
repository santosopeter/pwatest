import React, { useState, useEffect } from "react";

const CartPopup = (props) => {
    const [cartStatus, setCartStatus] = useState(false);

    return (
      <div className={"cart-popup popup " + (cartStatus ? "popup-enabled" : "popup-disabled")}>
          <div className="cart-title">Cart</div>
          <div className="cart-content">
              <ul className="cart-content-list">
                  <li>test1</li>
                  <li>test2</li>
                  <li>test3</li>
                  <li>test4</li>
              </ul>
          </div>
          <div className="cart-buttons">
              <button className="cart-checkout">Checkout</button>
          </div>
        <style jsx>{`
            .cart-popup {
                position: fixed;
                width:40vw;
                height:100vh;
                top:0;
                right:0;
            }
            .cart-popup.popup-enabled {
                display:block;
            }
            .cart-popup.popup-disabled {
                display:none;
            }
        `}</style>
        {props.children}
      </div>
    )
  }

  export default CartPopup;