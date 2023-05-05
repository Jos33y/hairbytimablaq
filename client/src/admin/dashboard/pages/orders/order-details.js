import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import formatPrice from "../../components/format-price";
import HandleScroll from "../../components/go-top";
import DashSpinner from "../../components/dash-spinner";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const OrderDetailsPage = () => {

    const location = useLocation();
    const isMounted = useRef()
    const MySwal = withReactContent(Swal)
    const [loading, setLoading] = useState(true)
    const [orderData, setOrderData] = useState([])
    const [isDisabled, setIsDisbaled] = useState(false)
    const [customerData, setCustomerData] = useState([])
    const [deliveryData, setDeliveryData] = useState("")
    const [paymentData, setPaymentData] = useState("")
    const [orderStatus, setOrderStatus] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");


    const fetchOrderDetails = async () => {

        setLoading(true)

        try {
            const docRef = doc(db, 'orders', location.state.order_id)
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setOrderData(docSnap.data())
                setOrderStatus(docSnap.data().delivery_status)
                fetchCustomers(docSnap.data().customer_id, docSnap.data().shipping_id)
                fetchDelivery(docSnap.data().shipping_method)
                fetchTransaction(docSnap.data().payment_id)

            } else {
                console.log("no order found");
                //setLoading(false)
            }
        }
        catch (error) {
            console.log({ error })
        }

        setLoading(false)

    }

    const fetchCustomers = async (customer_id, shipping_id) => {
        const shippingRef = doc(db, 'customers', `${customer_id}`, 'shipping', `${shipping_id}`)
        const shippingSnap = await getDoc(shippingRef)
        if (shippingSnap.exists()) {
            // console.log("Shipping data", shippingSnap.data())
            setCustomerData(shippingSnap.data())
            if (shippingSnap.data().contact_mode === 'email') {
                setContactEmail(shippingSnap.data().contact_info)
            } else {
                setContactPhone(shippingSnap.data().contact_info)
            }
        }
        else {
            console.log('no customer data')
        }

    }

    const fetchDelivery = async (delivery_id) => {
        const deliveryRef = doc(db, 'delivery_locations', `${delivery_id}`)
        const deliverySnap = await getDoc(deliveryRef)

        if (deliverySnap.exists()) {
            setDeliveryData(deliverySnap.data())
        }
    }

    const fetchTransaction = async (payment_id) => {
        const paymentRef = doc(db, 'transactions', payment_id)
        const paymentSnap = await getDoc(paymentRef)

        if (paymentSnap.exists()) {
            setPaymentData(paymentSnap.data())
        }

    }



    const getDeliveryStatus = () => {
        let delivery_status;
        if (orderData.delivery_status === 'pending') {
            delivery_status = "Not Shipped";
        } else if (orderData.delivery_status === 'processing') {
            delivery_status = "Shipped";

        } else if (orderData.delivery_status === 'success') {
            delivery_status = "Delivered";
        }

        return delivery_status;
    }


    const getPaymentStatus = () => {
        let payment_status;
        if (orderData.payment_status === 'processing') {
            payment_status = "Not Confirmed";
        } else if (orderData.payment_status === 'success') {
            payment_status = "Confirmed";

        } else if (orderData.payment_status === 'pending') {
            payment_status = "Awaiting Payment";

        }
        else if (orderData.payment_status === 'failed') {
            payment_status = "Rejected";
        }

        return payment_status;
    }


    const handleChanges = async () => {
        setIsDisbaled(true)
        try {
            if (paymentData.paymentStatus === 'success') {

                if (orderStatus === orderData.delivery_status) {
                    MySwal.fire({
                        title: 'Warning!',
                        text: 'Delivery status already updated.',
                        icon: 'warning',
                    })
                    setOrderStatus(orderData.delivery_status);
                } else {

                    MySwal.fire({
                        title: 'Do you want to update this order?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, update it!'
                    }).then(async (result) => {
                        if (result.isConfirmed) {

                            const updateOrder = {}

                            if (orderStatus === 'success') {
                                updateOrder.order_status = `${orderStatus}`;
                                updateOrder.delivery_status = `${orderStatus}`;
                            } else {
                                updateOrder.delivery_status = `${orderStatus}`;
                            }

                            const orderDataRef = doc(db, 'orders', `${location.state.order_id}`)
                            await updateDoc(orderDataRef, updateOrder)
                            if (orderStatus === 'processing') {
                                if (customerData.contact_mode === 'email') {
                                    sendShippedEmail();
                                } else {
                                    sendShippedSms();
                                }

                            } else if (orderStatus === 'success') {
                                if (customerData.contact_mode === 'email') {
                                    orderDeliveredEmail();
                                } else {
                                    orderDeliveredSms();
                                }

                            }
                            Swal.fire(
                                'Updated!',
                                'delivery status has been updated.',
                                'success'
                            )
                            fetchOrderDetails().then();
                        }
                    })
                }

            }
            else {
                MySwal.fire({
                    title: 'Error!',
                    text: 'Check if payment is confirmed before updating order',
                    icon: 'error',
                })
                setOrderStatus(orderData.delivery_status);

            }
        }
        catch (error) {
            console.log({ error })
        }
        setIsDisbaled(false)
    }

    const sendShippedSms = async () => {

        try {
            const url = '/order-shipped-sms';
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    phone_number: contactPhone,
                    order_id: location.state.order_id,
                }),
            };

            await fetch(url, options)
                .then(res => res.json())
                .then(json => {
                    if (json.code === 'ok') {
                    }
                })

        } catch (error) {

            console.log({ error })
        }

    }

    const orderDeliveredSms = async () => {

        try {
            const url = '/order-delivered-sms';
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    phone_number: contactPhone,
                    order_id: location.state.order_id,
                }),
            };

            await fetch(url, options)
                .then(res => res.json())
                .then(json => {
                    if (json.code === 'ok') {
                    }
                })

        } catch (error) {

            console.log({ error })
        }

    }

    const sendShippedEmail = async () => {

        fetch('/order-shipped', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: contactEmail,
                from: 'support@hairbytimablaq.com',
                subject: 'Order Shipped!',
                order_id: location.state.order_id,
            }),
        })
            .then((response) => {
                if (response.ok) {

                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const orderDeliveredEmail = async () => {

        fetch('/order-delivered', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: contactEmail,
                from: 'support@hairbytimablaq.com',
                subject: 'Order Delivered!',
                order_id: location.state.order_id,
                delivery_method: deliveryData.deliveryLocation,
            }),
        })
            .then((response) => {
                if (response.ok) {

                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const onChange = (e) => {
        setOrderStatus(e.target.value)
    }


    useEffect(() => {
        if (isMounted) {

            fetchOrderDetails().then();

        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
        <>

            {loading ?
                (<DashSpinner />) : (
                    <>
                        <HandleScroll />
                        <div id="category-container" className="category-container">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="manage-product">
                                        <div className="form-container">
                                            <div className="form-header">
                                                <p className="title">Order details</p>
                                                <p></p>
                                            </div>

                                            <hr />

                                            <div className="order-header">
                                                <p className="date"><i className="fa-solid fa-calendar-day"></i> {`${orderData.timeStamp.toDate().toLocaleString()}`} </p>
                                                <p className="order-id"> Order ID: {orderData.order_id}</p>
                                            </div>

                                            <div className="form-actions">
                                                <div className="row">
                                                    <div className="col-md-7">

                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="form-group order-form">
                                                            <select value={orderStatus}
                                                                onChange={onChange}
                                                                className="form-control">
                                                                <option disabled={true}>Change Delivery Status</option>
                                                                <option value="processing">Shipped</option>
                                                                <option value="pending">Not Shipped</option>
                                                                <option value="success">Delivered</option>
                                                            </select>
                                                            <button disabled={isDisabled} onClick={handleChanges} className="btn btn-md btn-secondary">
                                                                {isDisabled ? ('saving...') : ('save')}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />

                                            <div className="order-info">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="info-box">
                                                            <div className="info-box-icon">
                                                                <i className="fa-solid fa-user"></i>
                                                            </div>
                                                            <div className="info-box-inner">
                                                                <p className="info-title">Customer Info</p>
                                                                <p className="info-text">{`${customerData.last_name} ${customerData.first_name}`}</p>
                                                                <p className="info-text">{customerData.contact_info}</p>
                                                                <p className="info-text">{customerData.delivery_phone}</p>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-md-4">
                                                        <div className="info-box">
                                                            <div className="info-box-icon">
                                                                <i className="fa-solid fa-truck-fast"></i>
                                                            </div>
                                                            <div className="info-box-inner">
                                                                <p className="info-title">Order info</p>
                                                                <p className="info-text">Shipping: {deliveryData ? (deliveryData.deliveryLocation) : ('')} </p>
                                                                <p className="info-text payment">Pay method: {paymentData ? (paymentData.paymentMethod) : ('')}</p>
                                                                <p className="info-text">Payment: <span className={`status ${orderData.payment_status}`}> {getPaymentStatus()} </span> </p>
                                                                <p className="info-text">Shipping: <span className={`status ${orderData.delivery_status}`}> {getDeliveryStatus()}</span> </p>
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div className="col-md-4">
                                                        <div className="info-box">
                                                            <div className="info-box-icon">
                                                                <i className="fa-solid fa-location-dot"></i>
                                                            </div>
                                                            <div className="info-box-inner">
                                                                <p className="info-title">Deliver to</p>
                                                                <p className="info-text">{customerData.delivery_address}</p>
                                                                <p className="info-text">{`${customerData.city}, ${customerData.postal_code}`} </p>
                                                                <p className="info-text">{customerData.delivery_state}</p>
                                                                <p className="info-text">{customerData.country}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="product-ordered">
                                                {orderData.product_ordered.map((product) => (
                                                    <>

                                                        <hr />
                                                        <div key={product.id} className="prod-ordered-info">
                                                            <div className="prod-ordered-one">
                                                                <div className="prod-ordered-img">
                                                                    <img src={product.imgUrls[0]} className="img-fluid" alt="" />
                                                                </div>
                                                                <div className="prod-ordered-details">
                                                                    <p className="prod-name"> {product.productName}</p>
                                                                    <p className="prod-price"> &#393;{formatPrice(Number(product.productPrice))}  x {product.qty}</p>
                                                                </div>
                                                            </div>

                                                            <div className="prod-ordered-two">
                                                                <p className="total-price"> &#393;{formatPrice(Number(product.productPrice) * Number(product.qty))}</p>
                                                            </div>
                                                        </div>
                                                    </>
                                                ))}


                                                <hr />
                                                <div className="shipping-info">
                                                    <p className="light-text">Sub total: </p>
                                                    <p className="bold-text">&#393;{formatPrice(orderData.order_total)} </p>
                                                </div>
                                                <div className="shipping-info">
                                                    <p className="light-text">Shipping cost: </p>
                                                    <p className="bold-text">&#393;{formatPrice(Number(deliveryData.deliveryPrice))} </p>
                                                </div>

                                                <hr />

                                                <div className="shipping-info">
                                                    <p className="light-text big-total">Total: </p>
                                                    <p className="bold-text big-total">&#393;{formatPrice(Number(orderData.order_total) + Number(deliveryData.deliveryPrice))}  </p>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)}
        </>
    )
}

export default OrderDetailsPage;