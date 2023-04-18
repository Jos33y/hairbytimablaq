import { useNavigate } from "react-router-dom";

const TransactionBox = () => {

    const navigate = useNavigate()

    const editProduct = () => {

        navigate("/admin/dashboard/transaction-details")
    }

    return (
        <>
            <div className="order-list-box">
                <div className="order-list-info">
                    <p className="order-id">#50523438</p>
                    <p className="order-id">20th march, 2023 </p>
                    <p className="name">Bank Transfer </p>
                </div>

                <div className="order-list-actions">
                 <p className="price"> &#8358;900,000 </p>  
                 <p className="not-button"><button className="btn btn-md processing">Not Confirmed </button></p>
                <p className="is-button"> <button onClick={editProduct} className="btn btn-md btn-primary">Check trans </button> </p>
                </div>
            </div>
        </>
    )
}

export default TransactionBox;