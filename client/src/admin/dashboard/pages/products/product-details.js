
import "./details.css";
import ProdOne from "../../../../store/assets/products/prod-1.jpeg";
import HandleScroll from "../../components/go-top";

const ProductDetailsPage = () => {
    return (
        <>
        <HandleScroll />
            <div id="category-container" className="category-container">

                <div className="manage-product">
                    <div className="details-container">
                        <div className="form-header">
                            <p className="title">Product Details</p>
                            <button className="btn btn-primary">New Product</button>
                        </div>
                        {/* product details section */}
                        <div className="product-details">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="product-images">

                                        <div className="prod-main-img">
                                            {/* link to enlarge image on click => https://stackblitz.com/edit/lightgallery-react?file=index.tsx */}
                                            <img src={ProdOne} alt="prod main img" />
                                        </div>

                                        <div className="prod-img-list">
                                            <div className="img-thumb active">
                                                <img src={ProdOne} alt="prod thumbnail" />
                                            </div>

                                            <div className="img-thumb">
                                                <img src={ProdOne} alt="prod thumbnail" />
                                            </div>

                                            <div className="img-thumb">
                                                <img src={ProdOne} alt="prod thumbnail" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="details-sect-info">
                                        <p className="prod-name">Layered raw wig</p>
                                        <p className="prod-price">₦220,000.00</p>
                                        <p className="prod-stock">5 in stock</p>


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

                                        <div className="action-buttons">
                                            <button className="btn btn-md btn-primary">Edit </button>
                                            <button className="btn btn-md btn-danger">Delete </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProductDetailsPage;