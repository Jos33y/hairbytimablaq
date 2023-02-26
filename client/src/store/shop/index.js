import React from "react";
import "./shop.css";
import ProductCard from "../components/product-card";
import ProdOne from "../assets/products/prod-1.jpeg";
import ProdTwo from "../assets/products/prod-2.jpeg";
import ProdThree from "../assets/products/prod-3.jpeg";
import ProdFour from "../assets/products/prod-4.jpeg";
import HeaderImg from "../assets/images/african-woman-tp.png";
import HeaderNav from "../components/header";
import FooterNav from "../components/footer";
import SubscribeForm from "../components/subscribe";
import BreadCrumb from "../components/breadcrumb";

const Shop = () => {
    return (
        <>
            <HeaderNav />
            <div className="shop-container">
                <BreadCrumb title="shop" breadImg={HeaderImg} />

                <div className="shop-section">
                    <div className="shop-actions">
                        <div className="shop-one">
                            <p>Showing 1–12 of 56 Products</p>
                        </div>

                        <div className="shop-one">
                            <div className="form-group">
                                <select className="form-control" id="shop-categories">
                                    <option value="all"> All products </option>
                                    <option value="uncategorized"> Uncategorized </option>
                                    <option value="water-curly"> Water Curly </option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="product-shop">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-6">
                                <ProductCard name="Raw Layered hd frontal wig" price="650,000.00" prodImg={ProdTwo} />
                            </div>


                            <div className="col-lg-3 col-md-4 col-6">
                                <ProductCard name="Layered raw wig" price="220,000.00" prodImg={ProdOne} />
                            </div>


                            <div className="col-lg-3 col-md-4 col-6">
                                <ProductCard name="360 wig/ full lace wig" price="440,000.00" prodImg={ProdThree} />
                            </div>


                            <div className="col-lg-3 col-md-4 col-6">
                                <ProductCard name="Layered wig 5*5" price="450,000.00" prodImg={ProdFour} />
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

export default Shop;