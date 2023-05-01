import React, { useEffect, useRef, useState } from "react";
import "./checkout.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import CheckoutBreadCrumb from './breadcrumb';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderNav from '../components/header';
import FooterNav from '../components/footer';
import CheckOutOrderSummary from './order-summary';
import PageLoading from "../components/loading";
import formatPrice from "../components/format-price";

const CheckOutPayment = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const isMounted = useRef()
    const [carts, setCarts] = useState([])
    const itemsPrice = carts.reduce((a, c) => a + c.productPrice * c.qty, 0);
    const [loading, setLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [customerId, setCustomerId] = useState("")
    const [shippingId, setShippingId] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState("bank transfer")
    const [orderId, setOrderId] = useState(null)
    const [shippingMethod, setShippingMethod] = useState("");
    const [shippingData, setShippingData] = useState(null);
    const [paymentMade, setPaymentMade] = useState(false);
    const [deliveryData, setDeliveryData] = useState(null)


    const madePayment = () => {

        setPaymentMade(true);
    }

    const confirmPayment = () => {
        setPaymentMade(false);
    }

    const cancelOrder = () => {
        navigate('/checkout/shipping');
    }


    const fetchCustomers = async () => {

        setLoading(true)

        const customersRef = doc(db, 'customers', location.state.customer_id)
        const customerSnap = await getDoc(customersRef)

        if (customerSnap.exists()) {

            if (customerSnap.data().shipping_id) {
                setShippingId(customerSnap.data().shipping_id)
                const shippingRef = doc(db, 'customers', location.state.customer_id, 'shipping', `${customerSnap.data().shipping_id}`)
                const shippingSnap = await getDoc(shippingRef)
                if (shippingSnap.exists()) {
                    // console.log("Shipping data", shippingSnap.data())
                    setShippingData(shippingSnap.data())
                }

            }
            setCustomerId(location.state.customer_id);
            setShippingMethod(location.state.delivery_method);
            setPaymentMethod(location.state.payment_method);
        }
        else {
            console.log('no customer data')
        }

        setLoading(false)

    }

    const fetchDelivery = async () => {
        const deliveryRef = doc(db, 'delivery_locations', location.state.delivery_method)
        const deliverySnap = await getDoc(deliveryRef)

        if (deliverySnap.exists()) {
            setDeliveryData(deliverySnap.data())
        }
      
    }

    const fetchPayment = async () => {
        const deliveryRef = doc(db, 'delivery_locations', location.state.delivery_method)
        const deliverySnap = await getDoc(deliveryRef)

        if (deliverySnap.exists()) {
            setDeliveryData(deliverySnap.data())
        }
      
    }


    const goToShipping = () => {

        navigate('/checkout/shipping', { state: { customer_id: customerId, delivery_method: shippingMethod } })

    }


    useEffect(() => {
        if (isMounted) {

            fetchCustomers().then();
            fetchDelivery().then();
            let localCart = localStorage.getItem("cart");
            localCart = JSON.parse(localCart);
            if (localCart) {
                setCarts(localCart)
            }

            let local_order_id = localStorage.getItem("order_id");
            local_order_id = JSON.parse(local_order_id);
            if (local_order_id) {
                setOrderId(local_order_id)
            }
        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])


    return (
        <>
            {loading ?
                (<PageLoading />) : (
                    <>
                        <HeaderNav />
                        <div className="checkout-container">
                            <CheckoutBreadCrumb page="payment" />

                            <div className='checkout-section'>
                                <div className='row'>
                                    <div className='col-md-7'>
                                        <div className='checkout-table'>
                                            <div className='checkout-table-info'>
                                                <div className='checkout-info'>
                                                    <p className='title'>Full  Name</p>
                                                    <p className='sub-title'> {`${shippingData.last_name} ${shippingData.first_name}`} </p>
                                                </div>
                                                <hr />
                                                <div className='checkout-info'>
                                                    <p className='title'>Contact Info</p>
                                                    <p className='sub-title'> {shippingData.contact_info}</p>
                                                </div>
                                                <hr />
                                                <div className='checkout-info'>
                                                    <p className='title'>Call Number</p>
                                                    <p className='sub-title'>  {shippingData.delivery_phone}</p>
                                                </div>
                                                <hr />
                                                <div className='checkout-info'>
                                                    <p className='title'>Ship To</p>
                                                    <p className='sub-title'> {`${shippingData.delivery_address}, ${shippingData.city}, ${shippingData.delivery_state}, ${shippingData.country}. `}</p>
                                                </div>
                                                <hr />
                                                <div className='checkout-info'>
                                                    <p className='title'>Deliver Method</p>
                                                    <p className='sub-title'>  {deliveryData.deliveryLocation} - &#8358;{formatPrice(Number(deliveryData.deliveryPrice))} </p>
                                                </div>
                                                <hr />
                                                <div className='return-info'>
                                                    <p onClick={goToShipping} className='return-link'>Change Info </p>
                                                </div>
                                            </div>

                                        </div>



                                        <div className='checkout-table'>
                                            <div className='checkout-order-info'>
                                                <div className='order-info'>
                                                    <p className='title'>Sub total</p>
                                                    <p className='sub-title'> &#8358;{(formatPrice(itemsPrice))}</p>
                                                </div>
                                                <hr />
                                                <div className='order-info'>
                                                    <p className='title'>Shipping</p>
                                                    <p className='sub-title'>&#8358; {formatPrice(Number(deliveryData.deliveryPrice))}</p>
                                                </div>
                                                <hr />
                                                <div className='order-info'>
                                                    <p className='title total'>Total</p>
                                                    <p className='sub-title total'>  &#8358; {formatPrice(Number(deliveryData.deliveryPrice) + Number(itemsPrice))}</p>
                                                </div>

                                            </div>

                                        </div>

                                        <div className='payment-table'>
                                            <h4 className='title'>Make Payment</h4>
                                            <p className='note'>Make payment to the account below</p>
                                            <p className='sub-note'>Pay exact order amoumt for your order to be processed</p>

                                            <div className='account'>
                                                <div className='account-details'>
                                                    <p>Account Name:</p>
                                                    <p>Account Number:</p>
                                                    <p>Bank Name:</p> 
                                                    <p className='amount'>Amount to Pay: </p>
                                                </div>
                                                <div className='account-info'>
                                                    <p>Lagbalu Joseph Olorunfemi</p>
                                                    <p>3099275203 </p>
                                                    <p>First Bank of Nigeria</p>
                                                    <p className='amount'> ₦16,500.00</p>
                                                </div>
                                            </div>

                                            {!paymentMade &&

                                                <div className='payment-button'>
                                                    <button onClick={madePayment} className='btn btn-secondary'>Payment Made</button>
                                                    <button onClick={cancelOrder} className='btn btn-danger'>Cancel Order</button>
                                                </div>
                                            }

                                            {paymentMade &&
                                                <div className='payment-made'>
                                                    <div className='form-group'>
                                                        <label className='form-label'>Amount Paid </label>
                                                        <input className='form-control' type='text' placeholder='16,500' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label className='form-label'>Account Name Paid From </label>
                                                        <input className='form-control' type='text' placeholder='Name on Account ' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label className='form-label'> Upload Transaction Receipt </label>
                                                        <input className='form-control' type='file' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <button onClick={confirmPayment} className='btn btn-success'>Confirm Payment</button>
                                                        <button onClick={cancelOrder} className='btn btn-outline'>Cancel Order</button>
                                                    </div>
                                                </div>
                                            }

                                        </div>

                                    </div>

                                    <div className='col-md-5'>
                                        <CheckOutOrderSummary shippingMethod={location.state.delivery_method} paymentPage={true} />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <FooterNav />
                    </>)}
        </>
    );
}

export default CheckOutPayment; 