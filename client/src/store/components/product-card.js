import "./component.css";

const ProductCard = ({name, price, prodImg}) => {
    return (
        <>
            <div className="product-card">
                <div className="product-img">
                    <img src={prodImg} alt="product-img" className="img-fluid" />
                </div>
                <div className="product-desc">
                    <div className="desc-text">
                        <p className="title">{name}</p>
                        <p className="price">₦{price}</p>
                    </div>

                    <div className="product-button">
                        <button className="btn btn-md btn-secondary">Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductCard;