import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../components/format-price";
import { DashFormatDate } from "../../components/format-date";

const OrderBox = ({ order, order_id }) => {

    const isMounted = useRef()
    const navigate = useNavigate()
    const [customer, setCustomer] = useState(null);


    const getDeliveryStatus = () => {
        let delivery_status;
        if (order.delivery_status === 'pending') {
            delivery_status = "Order not shipped";
        } else if (order.delivery_status === 'processing') {
            delivery_status = "Order shipped";

        } else if (order.delivery_status === 'success') {
            delivery_status = "Order delivered";
        }

        return delivery_status;
    }


    const getPaymentStatus = () => {
        let payment_status;
        if (order.payment_status === 'processing') {
            payment_status = "Payment not confirmed";
        } else if (order.payment_status === 'success') {
            payment_status = "Payment confirmed";

        } else if (order.payment_status === 'pending') {
            payment_status = "Awaiting Payment";

        }
        else if (order.payment_status === 'failed') {
            payment_status = "Payment rejected";
        }

        return payment_status;
    }

    const getCustomer = async () => {

        const customerRef = doc(db, 'customers', `${order.customer_id}`, 'shipping', `${order.shipping_id}`)
        const customerSnap = await getDoc(customerRef)
        if (customerSnap.exists()) {
            // console.log("Shipping data", customerSnap.data())
            setCustomer(customerSnap.data())

        }
    }

    const orderDetails = () => {
        navigate("/admin/dashboard/order-details", {state: {order_id: order_id,}})
    }


    useEffect(() => {
        if (isMounted) {
            getCustomer().then()
        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
        <>
            <div className="order-list-box">
                <div className="order-list-info">
                    <p className="order-id">#{order.order_id}</p>
                    <p className="order-id">{ order ? (DashFormatDate((order.timeStamp).toDate())) : ('') } </p>
                    <p className="name"> {customer ? (`${customer.last_name} ${customer.first_name}`) : ('')} </p>
                    <p className="name">{customer ? (`${customer.contact_info}`) : ('')} </p>
                </div>

                <div className="order-list-actions">
                    <p className="price"> &#393;{formatPrice(order.order_total)} </p>
                    <p className="not-button"><button className={`btn btn-md ${order.delivery_status}`}>{getDeliveryStatus()}</button></p>
                    <p className="not-button"><button className={`btn btn-md ${order.payment_status}`}>{getPaymentStatus()} </button></p>
                    <p className="is-button"> <button onClick={orderDetails} className="btn btn-md btn-primary">Check order </button> </p>
                </div>
            </div>
        </>
    )
}

export default OrderBox