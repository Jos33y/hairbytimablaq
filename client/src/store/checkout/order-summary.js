import React, { useEffect, useRef, useState } from "react";
import formatPrice from "../components/format-price";

const CheckOutOrderSummary = ({ shippingMethod, paymentPage }) => {

    const isMounted = useRef()
    const [carts, setCarts] = useState([])
    const itemsPrice = carts.reduce((a, c) => a + c.productPrice * c.qty, 0);

    useEffect(() => {
        if (isMounted) {

            let localCart = localStorage.getItem("cart");

            //turn it into js
            localCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            if (localCart) {
                setCarts(localCart)
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
                            <div key={cart.id} className="prod-summary-details">
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
                                    <p className="price">&#8358;{formatPrice((cart.productPrice * cart.qty))}</p>
                                </div>
                            </div>
                        ))}

                    </div>

                    <hr />
                    <div className="order-summary-table">
                        <div className="order-summary-list">
                            <p className="sub-total">Subtotal</p>
                            <p className="sub-total">&#8358;{(formatPrice(itemsPrice))}</p>
                        </div>
                        <hr />
                        <div className="order-summary-list">
                            <p className="sub-total">Shipping</p>
                            <p className="sub-total">
                                {shippingMethod ? ('&#8358;' + formatPrice(shippingMethod.amount)) : ('Yet to be calculated')}

                            </p>


                        </div>

                        <hr />
                        <div className="order-summary-list">
                            <p className="total">Total</p>
                            <p className="total">&#8358;{shippingMethod ?
                                formatPrice(Number(shippingMethod.amount) + Number(itemsPrice)) :
                                formatPrice(itemsPrice)}</p>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );

}

export default CheckOutOrderSummary;