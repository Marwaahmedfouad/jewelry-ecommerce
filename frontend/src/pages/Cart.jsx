import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Cart() {
  let { cartArray } = useSelector((state) => state.carts);

  useEffect(() => {
    console.log(cartArray);
  }, [cartArray]);

  return (
    <div>
      {cartArray.map((p, index) => (
        <div key={index}>
          <h3>Product: {p.name}</h3>
          <p>Quantity: {p.quantity}</p>
          <div> {p.id}</div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
