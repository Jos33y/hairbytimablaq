import HandleScroll from "../../components/go-top";
import ProductBox from "./product-box";

const ProductListPage = () => {
    return ( 
        <>
        <HandleScroll />
            <div id="category-container" className="category-container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="manage-product">
                            <div className="form-container">
                                <div className="form-header">
                                    <p className="title">Manage Products</p>
                                    <button className="btn btn-primary">New Product</button>
                                </div>

                                <hr />

                                <div className="form-actions">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="form-group">
                                                <input className="form-control" type="text" placeholder="Search products..." />
                                            </div>
                                        </div>
                                        <div className="col-md-2">

                                        </div>
                                        <div className="col-md-5">
                                            <div className="form-group">
                                                <select className="form-control"
                                                    id='productCategory'>
                                                    <option value='all'>All Products</option>
                                                    <option value="uncategorized">Uncategorized</option>
                                                    <option value="null">Bone Straight</option>
                                                    <option value="null">Curly Weavon</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div className="product-list">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <ProductBox />
                                        </div>

                                        <div className="col-md-6">
                                            <ProductBox />
                                        </div> 

                                        <div className="col-md-6">
                                            <ProductBox />
                                        </div> 

                                        <div className="col-md-6">
                                            <ProductBox />
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

export default ProductListPage;