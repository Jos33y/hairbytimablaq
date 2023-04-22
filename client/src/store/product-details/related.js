import ProductCard from "../components/product-card";


const RelatedProducts = ({ products }) => {
    return (
        <>
            <div className="related-products">
                <h4 className="title">Related Products</h4>

                <div className="related-prod-list">
                    {products && products.length > 0 ? (
                        <div className="row">
                            {products.map((product) => (
                                <div key={product.id} className="col-lg-3 col-md-4 col-6">
                                    <ProductCard product={product.data} prod_id={product.id} />
                                </div>
                            ))}
                        </div>
                    ) :
                        (<h6>No product available</h6>)
                    }
                </div>
            </div>
        </>
    )
};
export default RelatedProducts;