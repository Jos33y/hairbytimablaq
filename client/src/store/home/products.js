import ProdOne from "../assets/products/prod-1.jpeg";
import ProdTwo from "../assets/products/prod-2.jpeg";
import ProdThree from "../assets/products/prod-3.jpeg";
import ProdFour from "../assets/products/prod-4.jpeg";
import ProdFive from "../assets/products/prod-5.jpeg";
import ProdSix from "../assets/products/prod-6.jpeg";
import ProdSeven from "../assets/products/prod-7.jpeg";
import ProdEight from "../assets/products/prod-8.jpeg";
import ProductCard from "../components/product-card";

const HomeProducts = () => {
    return (
        <>
            <div className="home-products">
                <h4 className="title"> Products </h4>
                <div className="home-products-list">
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

                <div className="home-products-button">
                    <button className="btn btn-md btn-primary">View all products</button>
                </div>
            </div>
        </>
    )
}

export default HomeProducts;