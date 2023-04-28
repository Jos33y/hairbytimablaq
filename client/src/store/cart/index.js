import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import CartImg from "../assets/images/minimal-shopping-cart-tp.png";
import BreadCrumb from "../components/breadcrumb";
import HeaderNav from "../components/header";
import SubscribeForm from "../components/subscribe";
import FooterNav from "../components/footer";
import PageLoading from "../components/loading";
import { toast } from "react-toastify";
import { useCart } from "../components/cart-context";
import CartProducts from "./cart-product";


const ShopCart = () => {
    const navigate = useNavigate();
    const isMounted = useRef()
    const [loading, setLoading] = useState(true)
    const [isDisabled, setDisabled] = useState(false)
    const [cart, setCart] = useCart();
    const [cartItems, setCartItems] = useState([...cart]);

    const itemsPrice = cart.reduce((a, c) => a + c.productPrice * c.qty, 0);


    // checkout cart codes  
    const onCheckout = () => {
        setDisabled(true)
        try {
            toast.success("checked out")
            navigate('/checkout')
        }
        catch (e) {
            console.log({ e })
        }
    }
    const continueShopping = () => {
        navigate('/shop')
    }





    // delete cart codes
    const onDelete = (cartDelete) => {
        try {
            let cartData = [...cart]

            const existingItem = cartData.find(cartItem => cartItem.product_id === cartDelete.product_id);
            if (existingItem) {
                cartData = cartData.filter(cartItem => cartItem.product_id !== cartDelete.product_id);

                setCart(cartData);

                let cartString = JSON.stringify(cartData)
                localStorage.setItem('cart', cartString)
                toast.success('item deleted')
                fetchCart();
            }
            else {
                toast.error('error deleting item')

            }

        }
        catch (e) {
            console.log({ e })
        }

    }

    // update cart codes

    const onUpdateCartItemQuantity = (updatedCartItem) => {

        const updatedCartItems = cart.map((cartItem) => {
            if (cartItem.product_id === updatedCartItem.product_id) {
                return updatedCartItem;
            } else {
                return cartItem;
            }
        });
        setCartItems(updatedCartItems);

    };

    const onUpdateCartItems = (updatedCartItems) => {
        setCart(updatedCartItems);
    };

    const handleUpdateCartItems = () => {
        onUpdateCartItems(cartItems);
        // console.log('CartItems', cartItems);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        toast.success('Cart updated');

    }

    const fetchCart = () => {
        setLoading(true);
        let localCart = localStorage.getItem("cart");
        //turn it into js
        localCart = JSON.parse(localCart);
        //load persisted cart into state if it exists
        if (localCart) setCart(localCart)
        setLoading(false)
        //turn it into js
    }

    useEffect(() => {
        if (isMounted) {
            fetchCart();


        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])


    return (
        <>
            {loading ?
                (<PageLoading />) : (
                    <>

                        <HeaderNav />
                        <div className="cart-container">
                            <BreadCrumb title="cart" breadImg={CartImg} />

                            <div className="cart-section">
                                <div className="row">
                                    <div className="col-md-8">

                                        <div className="cart-box">
                                            {cart && cart.length > 0 ?
                                                (
                                                    <div className="cart-filled">
                                                        <hr />

                                                        {cart.map((cartItem) => (
                                                            <CartProducts key={cartItem.product_id} cartItem={cartItem} onUpdateCartItemQuantity={onUpdateCartItemQuantity} onDelete={() => { onDelete(cartItem) }} />
                                                        ))}

                                                    </div>) : (
                                                    <div className="cart-empty">
                                                        <hr />
                                                        <h3> Cart is Empty </h3>
                                                        <hr />
                                                    </div>)}
                                            <hr />
                                            <div className="cart-buttons">
                                                <button onClick={continueShopping} className="btn btn-md btn-primary"> Continue Shopping</button>

                                                {cart.length > 0 && (<button onClick={handleUpdateCartItems} className="btn btn-md btn-secondary"> Update Cart</button>)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="order-container">
                                            <div className="coupon-container">
                                                <div className="form-group">
                                                    <label className="form-label">Coupon Code </label>
                                                    <div className="form-inline">
                                                        <input type="text" placeholder="Enter coupon code" className="form-control" />
                                                        <button className="btn btn-md btn-primary"> Apply </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="order-summary">
                                                <h4>Cart total</h4>
                                                <div className="order-summary-table">
                                                    <div className="order-summary-list">
                                                        <p className="sub-total">Subtotal</p>
                                                        <p className="sub-total">&#8358;{(itemsPrice).toFixed(2).toString()
                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                                    </div>

                                                    <hr />
                                                    <div className="order-summary-list">
                                                        <p className="total">Total</p>
                                                        <p className="total">&#8358;{(itemsPrice).toFixed(2).toString()
                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                                    </div>

                                                    <div className="order-button">
                                                        <button disabled={isDisabled} onClick={onCheckout} className="btn btn-md btn-secondary"> Proceed to Checkout </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <SubscribeForm />
                        <FooterNav />
                    </>)}
        </>
    )
}

export default ShopCart