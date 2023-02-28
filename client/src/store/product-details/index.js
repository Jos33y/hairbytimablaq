import React from "react";
import "./details.css";
import ProdOne from "../assets/products/prod-1.jpeg";
import RelatedProducts from "./related";
import DetailsBreadCrumb from "./breadcrumb";


const ProductDetails = () => {
    return(
        <>
        <div className="product-details-container">
            {/* product details breadcrumb section */}

            <DetailsBreadCrumb />

            {/* product details section */}
            <div className="details-section">

            </div>

            <RelatedProducts />

        </div>
        </>
    )
}

export default ProductDetails;