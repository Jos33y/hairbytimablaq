import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartProducts = ({ cartItem, onDelete, onUpdateCartItemQuantity }) => {

    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(cartItem.qty);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
        onUpdateCartItemQuantity({ ...cartItem, qty: quantity + 1 });
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            onUpdateCartItemQuantity({ ...cartItem, qty: quantity - 1 });
        }
    };
 
    return (
        <>
            <div className="cart-filled-info">
                <div className="cart-product">
                    <div onClick={() => { navigate(`/shop/product/${cartItem.product_id}`); }} className="cart-product-img">
                        <img src={cartItem.imgUrls[0]} alt="" className="img-fluid" />
                    </div>
                    <div className="cart-product-details">
                        <p className="prod-name">{cartItem.productName} </p>
                        <p className="prod-price">&#8358;{cartItem.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </p>
                        <div className="prod-quantity">
                            <div className="form-group">
                                <button onClick={handleDecrement} className="btn btn-sm btn-outline"> <i className="fa-solid fa-minus"></i> </button>
                                <input className="form-control" type="text" value={quantity} maxLength="3" readOnly />
                                <button onClick={handleIncrement} className="btn btn-sm btn-outline"> <i className="fa-solid fa-plus"></i> </button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="cart-price">
                    <p className="cart-total-price"> &#8358;{(cartItem.productPrice * quantity).toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </p>
                    <p onClick={onDelete} className="remove"> <i className="fa-solid fa-xmark"></i>  Remove</p>
                </div>
            </div>
        </>
    )
}

export default CartProducts;