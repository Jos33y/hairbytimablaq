import "./cart.css";
import ProdOne from "../assets/products/prod-1.jpeg";
import CartImg from "../assets/images/minimal-shopping-cart-tp.png";
import BreadCrumb from "../components/breadcrumb";
import HeaderNav from "../components/header";
import SubscribeForm from "../components/subscribe";
import FooterNav from "../components/footer";
import { useNavigate } from "react-router-dom";

const ShopCart = () => {
    const navigate =  useNavigate();

    return (
        <>
        <HeaderNav />
            <div className="cart-container">
                <BreadCrumb title="cart" breadImg={CartImg} />

                <div className="cart-section">
                    <div className="row">
                        <div className="col-md-8">

                            <div className="cart-box">
                                <div className="cart-filled">
                                    <hr />
                                    <div className="cart-filled-info">
                                        <div className="cart-product">
                                            <div className="cart-product-img">
                                                <img src={ProdOne} alt="" className="img-fluid" />
                                            </div>
                                            <div className="cart-product-details">
                                                <p className="prod-name">Layered raw wig</p>
                                                <p className="prod-price">₦8,000.00 </p>
                                                <div className="prod-quantity">
                                                    <div className="form-group"> 
                                                        <button className="btn btn-sm btn-outline"> <i className="fa-solid fa-minus"></i> </button>
                                                        <input className="form-control" type="text" value="1" maxLength="3" />
                                                        <button className="btn btn-sm btn-outline"> <i className="fa-solid fa-plus"></i> </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="cart-price">
                                            <p className="cart-total-price"> ₦16,000.00 </p>
                                            <p className="remove"> <i className="fa-solid fa-xmark"></i>  Remove</p>
                                        </div>
                                    </div>

                                </div>
                                {/* <div className="cart-empty">
                                    <hr />
                                    <h3> Cart is Empty </h3>
                                    <hr />
                                </div> */}
                                <hr />
                                <div className="cart-buttons">
                                    <button className="btn btn-md btn-primary"> Continue Shopping</button>
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
                                            <p className="sub-total">₦16,000.00</p>
                                        </div>

                                        <hr />
                                        <div className="order-summary-list">
                                            <p className="total">Total</p>
                                            <p className="total">₦16,000.00</p>
                                        </div>

                                        <div className="order-button">
                                            <button onClick={() => { navigate('/checkout') }} className="btn btn-md btn-secondary"> Proceed to Checkout </button>
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
        </>
    )
}

export default ShopCart