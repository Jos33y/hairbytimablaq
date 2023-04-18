import { useNavigate } from "react-router-dom";

const OrderBox = () => {

    const navigate = useNavigate()

    const editProduct = () => {

        navigate("/admin/dashboard/order-details")
    }

    return (
        <>
            <div className="order-list-box">
                <div className="order-list-info">
                    <p className="order-id">#50523438</p>
                    <p className="order-id">20th march, 2023 </p>
                    <p className="name">Joshua Kingston </p>
                    <p className="name">kingstonjosh@gmail.com </p>
                </div>

                <div className="order-list-actions">
                 <p className="price"> &#8358;900,000 </p>  
                 <p className="not-button"><button className="btn btn-md processing">Order Shipped </button></p>
                 <p className="not-button"><button className="btn btn-md success">Payment Successful </button></p>
                <p className="is-button"> <button onClick={editProduct} className="btn btn-md btn-primary">Check order </button> </p>
                </div>
            </div>
        </>
    )
}

export default OrderBox