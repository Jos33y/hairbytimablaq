import ProdFive from "../assets/products/prod-5.jpeg";
import ProdSix from "../assets/products/prod-6.jpeg";
import ProdSeven from "../assets/products/prod-7.jpeg";
import ProdEight from "../assets/products/prod-8.jpeg";
import ProductCard from "../components/product-card";


const RelatedProducts = () => {
    return (
        <>
            <div className="related-products">
                <h4 className="title">Related Products</h4>

                <div className="related-prod-list">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-6">
                            <ProductCard name="Donor 22inches 5*5 wig" price="620,000.00" prodImg={ProdFive} />
                        </div>


                        <div className="col-lg-3 col-md-4 col-6">
                            <ProductCard name="14inches 2*6 200g" price="220,000.00" prodImg={ProdSix} />
                        </div>


                        <div className="col-lg-3 col-md-4 col-6">
                            <ProductCard name="20inches 300g frontal wig" price="405,000.00" prodImg={ProdSeven} />
                        </div>


                        <div className="col-lg-3 col-md-4 col-6">
                            <ProductCard name="26inches hd wig" price="470,000.00" prodImg={ProdEight} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};
export default RelatedProducts;