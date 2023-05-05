import { useNavigate } from "react-router-dom";
import "./component.css";
import { formatPrice, formatSymbol } from "./format-price";

const ProductCard = ({ product, prod_id }) => {

    const navigate = useNavigate()

    const goToDetails = () => {
        navigate(`/shop/product/${prod_id}`);
    }
 
    return (
        <>
            <div className="product-card">
                <div onClick={goToDetails} className="product-link">
                    <div className="product-img">
                        <img src={product.imgUrls[0]} alt="product-img" className="img-fluid" />
                    </div>
                    <div className="product-desc">  
                        <div className="desc-text">
                            <p className="title">{product.productName.length <= 50 ?
                                (`${product.productName}`) : (`${product.productName.slice(0, 50)}...`)}
                            </p> 

                            {product.discountOffer ? (
                            <p className="price">
                                {formatSymbol()}{formatPrice(product.productDiscountPrice)}
                                <span className="discount-price">
                              {formatSymbol()}{formatPrice(product.productPrice)}
                                </span>
                            </p>
                        ) : (
                            <p className="price">{formatSymbol()}{formatPrice(product.productPrice)}</p>
                        )}
                        
                        </div>
                    </div>
                </div>

                <div className="product-button">
                    <button onClick={() => { goToDetails(prod_id) }} className="btn btn-md btn-secondary">Add to cart</button>
                </div>

            </div>
        </>
    )
}
export default ProductCard;