import "./checkout-item.styles.scss";
import { ReactComponent as LeftArrow } from "../../assets/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../assets/right-arrow.svg";

import { CartContext } from "../../context/cart.context";
import { useContext } from "react";

const CheckoutItem = ({ cartItem }) => {
  const { name, quantity, id, price, imageUrl } = cartItem;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <LeftArrow
          className="left-arrow"
          onClick={() => removeItemFromCart(cartItem)}
        />
        {quantity}
        <RightArrow
          className="right-arrow"
          onClick={() => addItemToCart(cartItem)}
        />
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => clearItemFromCart(cartItem)}>&#10005;</div>
    </div>
  );
};

export default CheckoutItem;
