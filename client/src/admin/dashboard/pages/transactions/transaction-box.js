import React from "react";
import { useNavigate } from "react-router-dom";
import { DashFormatDate } from "../../components/format-date";
import formatPrice from "../../components/format-price";

const TransactionBox = ({ transaction, transaction_id }) => {

    const navigate = useNavigate();


    const getPaymentStatus = () => {
        let payment_status;
        if (transaction.paymentStatus === 'processing') {
            payment_status = "Not confirmed";
        } else if (transaction.paymentStatus === 'success') {
            payment_status = "Confirmed";

        } else if (transaction.paymentStatus === 'pending') {
            payment_status = "Awaiting";

        }
        else if (transaction.paymentStatus === 'failed') {
            payment_status = "Rejected";
        }

        return payment_status;
    }


    const editProduct = () => {

        navigate("/admin/dashboard/transaction-details", { state: { payment_id: transaction_id, } })
    }

    return (
        <>
            <div className="order-list-box">
                <div className="order-list-info">
                    <p className="order-id">{transaction.payment_id}</p>
                    <p className="order-id">{DashFormatDate(transaction.timeStamp.toDate())} </p>
                    <p className="name method"> {transaction.paymentMethod} </p>
                </div>

                <div className="order-list-actions">
                    <p className="price"> &#393; {formatPrice(transaction.amountPaid)}  </p>
                    <p className="not-button"><button className={`btn btn-md ${transaction.paymentStatus}`}>{getPaymentStatus()} </button></p>
                    <p className="is-button"> <button onClick={editProduct} className="btn btn-md btn-primary">Check trans </button> </p>
                </div>
            </div>
        </>
    )
}

export default TransactionBox;