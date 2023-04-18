import { useNavigate } from "react-router-dom";

const ProductBox = () => {

    const navigate = useNavigate()

    const editProduct = () => {

        navigate("/admin/dashboard/edit-product")
    }

    const productDetails = () => {

        navigate("/admin/dashboard/product-details")
    }

    return (
        <>
            <div className="prod-list-box"> 
                <div className="prod-list-info">
                    <div className="prod-list-img">
                        <img src="https://placehold.jp/70x70.png" alt="category " className="img-fluid" />
                    </div>
                    <div className="prod-list-details">
                        <p onClick={productDetails} className="name">Veeta Superior Velvet Durag...</p>
                        <p className="price"> &#8358;400,000  <span className="discount-price">&#8358;860,000 </span> </p>
                        <p className="stock"> 3 <span className="text">in stock</span> </p>
                    </div>

                </div>
                <div className="prod-list-buttons">
                    <p> <button onClick={editProduct} className="btn btn-md btn-primary">Edit </button> </p>
                    <p> <button className="btn btn-md btn-danger">Delete </button> </p>
                </div>
            </div>
        </>
    )
}

export default ProductBox