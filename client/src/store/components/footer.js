import React from "react";
import "./component.css";
import { Link } from "react-router-dom";
import TimaBlaq from "../assets/images/timablaq.jpeg";
import GoToTop from "./go-to-top";

const FooterNav = () => {
    return (
        <>
            <div className="Footer-nav">
                <div className="row">
                    {/* column section */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="footer-lists">
                            <ul>
                                <li> <Link className="footer-link" to="/about">About Us </Link></li>
                                <li> <Link className="footer-link" to="/shop">Hair Collections </Link></li>
                                <li> <Link className="footer-link" to="/contact">Contact </Link></li>
                                <li> <Link className="footer-link" to="/admin/login">Admin </Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* column section */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="footer-lists">
                            <ul>
                                <li> <Link className="footer-link" to="/track">Track Order </Link></li>
                                <li> <Link className="footer-link" to="/cart">Your Cart </Link></li>
                                <li> <Link className="footer-link" to="/checkout">Your Checkout </Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* column section */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="social-lists">
                            <h5> Follow us</h5>
                            <ul className="social-icons">
                                <li> <Link className="footer-icons" to="https://twitter.com/"> <i className="fa-brands fa-twitter"></i> </Link> </li>
                                <li> <Link className="footer-icons" to="https://instagram.com/"> <i className="fa-brands fa-square-instagram"></i> </Link> </li>
                            </ul>
                        </div>

                    </div>


                    {/* column section */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="footer-about">
                            <div className="footer-img">
                                <img src={TimaBlaq} alt="footer logo" className="img-fluid" />
                            </div>
                            <div className="footer-address">
                                <p> 112 Kingdom, NA 12, New York</p>
                                <p> +12 345 678 910</p>
                                <p> infor.deercreative@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="footer-copy">
                    <p> Copyright <i className="fa-regular fa-copyright"></i> 2023  <span className="name">hairbytimablaq </span> | Designed by <Link to="https://instagram.com/" className="name-link"> boy_programmer </Link>  </p>
                </div>
            </div>
            <GoToTop />
        </>
    );
}

export default FooterNav;