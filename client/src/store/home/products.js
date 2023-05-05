import { useNavigate } from "react-router-dom";
import ProductCard from "../components/product-card";

const HomeProducts = ({ products }) => {

    const navigate = useNavigate();
 
    return ( 
        <>
            <div className="home-products">
                <h4 className="title"> Products </h4>
                <div className="home-products-list">
                    <div className="row">
                        {products.map((product) => (
                            <div key={product.id} className="col-lg-3 col-md-4 col-sm-4 col-6">
                                <ProductCard product={product.data} prod_id={product.id} />
                            </div>
                        ))}

                    </div>

                </div>

                <div className="home-products-button">
                    <button onClick={() => { navigate('/shop') }} className="btn btn-md btn-primary">View all products</button>
                </div>
            </div>
        </>
    )
}

export default HomeProducts;