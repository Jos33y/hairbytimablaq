import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import {formatPrice, formatSymbol } from "../components/format-price";

const CheckOutOrderSummary = ({ shippingMethod, paymentPage }) => {

    const isMounted = useRef()
    const [carts, setCarts] = useState([]) 
    const [shippingPrice, setShippingPrice] = useState(null)
    const itemsPrice = carts.reduce((a, c) => a + c.productPrice * c.qty, 0);

    const fetchDelivery = async () => {
        const deliveryRef = doc(db, 'delivery_locations', shippingMethod)
        const deliverySnap = await getDoc(deliveryRef)

        if (deliverySnap.exists()) {
            setShippingPrice(deliverySnap.data().deliveryPrice)
        }
        else {
            console.log('no delivery data')
        }

    }

    useEffect(() => {
        if (isMounted) {

            let localCart = localStorage.getItem("cart");

            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) {
                setCarts(localCart)
            }
            if (shippingMethod) {
                fetchDelivery();
            }

        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
        <>
            <div className="order-container">

                {!paymentPage && (
                    <div className="coupon-container">
                        <div className="form-group">
                            <label className="form-label">Coupon Code </label>
                            <div className="form-inline">
                                <input type="text" placeholder="Enter coupon code" className="form-control" />
                                <button className="btn btn-md btn-primary"> Apply </button>
                            </div>
                        </div>
                    </div>
                )}


                <div className="order-summary">
                    <div className="prod-summary">
                        {carts.map((cart) => ( 
                            <div key={cart.product_id} className="prod-summary-details">
                                <div className="prod-details">
                                    <div className="prod-image">
                                        <img src={cart.imgUrls[0]} alt="mini product" className="img-fluid" />
                                    </div>
                                    <div className="prod-description">
                                        <p className="prod-name"> {cart.productName} </p>
                                        <p className="prod-qty">X {cart.qty}</p>
                                    </div>

                                </div> 
                                <div className="prod-prices">
                                    <p className="price">{formatSymbol()}{formatPrice(Number(cart.productPrice) * Number(cart.qty))}</p>
                                </div>
                            </div>
                        ))}

                    </div>

                    <hr />
                    <div className="order-summary-table">
                        <div className="order-summary-list">
                            <p className="sub-total">Subtotal</p>
                            <p className="sub-total">{formatSymbol()}{(formatPrice(itemsPrice))}</p>
                        </div>
                        <hr />
                        <div className="order-summary-list">
                            <p className="sub-total">Shipping</p>
                            {shippingPrice ? (
                                <p className="sub-total"> {formatSymbol()}{formatPrice(shippingPrice)} </p>
                            ) : (
                                <p className="sub-total">Yet to be calculated</p>
                            )}

                        </div>

                        <hr />
                        <div className="order-summary-list">
                            <p className="total">Total</p>
                            <p className="total">{formatSymbol()}{shippingPrice ?
                                formatPrice(Number(shippingPrice) + Number(itemsPrice)) :
                                formatPrice(itemsPrice)}</p>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );

}

export default CheckOutOrderSummary;