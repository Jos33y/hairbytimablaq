import React from "react";
import ProdOne from "../assets/products/prod-1.jpeg";
import "./details.css";
import RelatedProducts from "./related";
import DetailsBreadCrumb from "./breadcrumb";
import { Link, useLocation } from "react-router-dom";
import FooterNav from "../components/footer";
import HeaderNav from "../components/header";

const ProductDetails = () => {
    const location = useLocation();
    const productData = location.state;

    return (
        <>
        <HeaderNav />
            <div className="product-details-container">
                {/* product details breadcrumb section */}

                <DetailsBreadCrumb />

                {/* product details section */}
                <div className="details-section">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="product-images">
                                <div className="row">
                                    <div className="col-2">
                                        <div className="prod-img-list">
                                            <div className="img-thumb active">
                                                <img src={productData.image} alt="prod thumbnail" />
                                            </div>
                                            {/* <div className="img-thumb">
                                                <img src={ProdOne} alt="prod thumbnail" />
                                            </div>

                                            <div className="img-thumb">
                                                <img src={ProdOne} alt="prod thumbnail" />
                                            </div>
                                            <div className="img-thumb">
                                                <img src={ProdOne} alt="prod thumbnail" />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col-10">
                                        <div className="prod-main-img">
                                            {/* link to enlarge image on click => https://stackblitz.com/edit/lightgallery-react?file=index.tsx */}
                                            <img src={productData.image} alt="prod main img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="details-sect-info">
                                <p className="prod-name">{productData.name}</p>
                                <p className="prod-price">₦{productData.price}</p>
                                <p className="prod-stock">In stock</p>
                                <div className="prod-cart">
                                    <div className="prod-quantity">
                                        <div className="form-group">
                                            <button className="btn btn-sm btn-outline">

                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value="1"
                                                maxLength="3"
                                            />
                                            <button className="btn btn-sm btn-outline">

                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="add-cart">
                                        <button className="btn btn-md btn-primary">

                                            Add to cart
                                        </button>
                                    </div>
                                </div>

                                <div className="prod-description">
                                    <p className="p-title">Description</p>
                                    <p className="p-desc">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur.
                                    </p>
                                </div>

                                <div className="details-prod-tags">
                                    <p className="prod-tags">
                                        Categories: <span className="tag-list">
                                            Woolen T-shirt
                                        </span>
                                    </p>
                                    <p className="prod-tags">
                                        Tag: <span className="tag-list">
                                            shirt, top, t-shirt
                                        </span>
                                    </p>
                                </div>

                                <div className="share-icons">
                                    <ul>
                                        <li>

                                            <Link className="share-link" to="https://pinterest.com/"> <i className="fa-brands fa-square-pinterest"></i> </Link>
                                        </li>
                                        <li>

                                            <Link className="share-link" to="https://pinterest.com/"> <i className="fa-brands fa-square-instagram"></i> </Link>
                                        </li>
                                        <li>

                                            <Link className="share-link" to="https://pinterest.com/"> <i className="fa-brands fa-square-facebook"></i> </Link>
                                        </li>
                                        <li>

                                            <Link className="share-link" to="https://pinterest.com/"> <i className="fa-brands fa-square-twitter"></i> </Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                <RelatedProducts />
            </div>
            <FooterNav />
        </>
    );
};

export default ProductDetails;
