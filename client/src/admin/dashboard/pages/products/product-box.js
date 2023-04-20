import { useNavigate } from "react-router-dom";

const ProductBox = ({ product, id, onDelete }) => {

    const navigate = useNavigate()

    const editProduct = () => { 
        
        navigate("/admin/dashboard/product/edit", {state: {prod_id: id}})
    }

    const productDetails = () => {

        navigate("/admin/dashboard/product/details", {state: {prod_id: id, category_id: product.productCategory}})
    }


    return (
        <>
            <div className="prod-list-box">
                <div className="prod-list-info">
                    <div className="prod-list-img">
                        <img src={product.imgUrls[0]} alt="products" className="img-fluid" />
                    </div>
                    <div className="prod-list-details">
                        <p onClick={productDetails} className="name">{product.productName}</p>
                        {product.discountOffer ? (
                            <p className="price">
                                &#8358;{product.productDiscountPrice.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                <span className="discount-price">&#8358;{product.productPrice.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </span>
                            </p>
                        ) : (
                            <p className="price">
                                &#8358;{product.productPrice.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </p>
                        )}
                        <p className="stock"> {product.productStocks} <span className="text">in stock</span> </p>
                    </div>

                </div>
                <div className="prod-list-buttons">
                    <p> <button onClick={editProduct} className="btn btn-md btn-primary">Edit </button> </p>
                    <p> <button onClick={onDelete} className="btn btn-md btn-danger">Delete </button> </p>
                </div>
            </div>
        </>
    )
}

export default ProductBox