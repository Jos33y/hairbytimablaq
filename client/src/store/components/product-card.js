import { Link } from "react-router-dom";
import "./component.css";

const ProductCard = ({ name, price, prodImg }) => {

    const productData = {
        name: name,
        price: price,
        image: prodImg,
    };
    
    return (
        <>
            <div className="product-card">
                <Link className="product-link" to="/product/product-name" state={ productData } >
                    <div className="product-img">
                        <img src={prodImg} alt="product-img" className="img-fluid" />
                    </div>
                    <div className="product-desc">
                        <div className="desc-text">
                            <p className="title">{name}</p>
                            <p className="price">₦{price}</p>
                        </div>
                    </div>
                </Link>

                <div className="product-button">
                    <button className="btn btn-md btn-secondary">Add to cart</button>
                </div>

            </div>
        </>
    )
}
export default ProductCard;