import React from "react";
import "./component.css";
import { Link, useNavigate } from "react-router-dom";
import TimaBlaq from "../assets/images/timablaq.jpeg";


const HeaderNav = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="top-bar">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-5">
                        <p className="tag-line"> Life is short make every hair flip count </p>
                    </div>
                    <div className="col-md-3">
                        <div className="top-bar-side">
                            <select className="form-control" id="currencry">
                                <option value="1">USD $</option>
                                <option value="2">GMD D</option>
                            </select>
                            <p>Track order  <i class="fa-solid fa-truck-fast"></i></p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="Header-nav">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <Link to="/" className="navbar-brand">
                        <img src={TimaBlaq} className="img-logo" alt="tima-blaq" />
                        Hair by Tima Blaq
                    </Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/shop" className="nav-link">shop</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">Contact</Link>
                            </li>

                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <p><i class="fa-solid fa-magnifying-glass"></i> </p>
                            <p><i class="fa-solid fa-truck-fast"></i> </p>
                            <p onClick={() => {navigate('/cart')}} ><i class="fa-solid fa-cart-shopping"></i> <span className="cart-number">(0)</span>  </p>
                        </form>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default HeaderNav;