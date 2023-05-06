import React, { useEffect, useRef, useState } from "react";
import "./checkout.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import CheckoutBreadCrumb from './breadcrumb';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderNav from '../components/header';
import FooterNav from '../components/footer';
import TimaBlaq from "../assets/images/timablaq.jpeg";
import PageLoading from "../components/loading";
import { formatPrice, formatSymbol } from "../components/format-price";


const OrderConfirmation = () => {
 
    const isMounted = useRef()
    const location = useLocation();
    // eslint-disable-next-line
    const navigate = useNavigate();
    // clear order in sessionStorage
    const [loading, setLoading] = useState(true)
    const [deliveryData, setDeliveryData] = useState(null)
    const [paymentData, setPaymentData] = useState(null)
    const [orderData, setOrderData] = useState(null)
    const [customerData, setCustomerData] = useState(null)

    const fetchDelivery = async () => {
        const deliveryRef = doc(db, 'delivery_locations', location.state.delivery_method)
        const deliverySnap = await getDoc(deliveryRef)

        if (deliverySnap.exists()) {
            setDeliveryData(deliverySnap.data())
        }
    }

    const fetchTransaction = async () => {
        const paymentRef = doc(db, 'transactions', location.state.payment_id)
        const paymentSnap = await getDoc(paymentRef)

        if (paymentSnap.exists()) {
            setPaymentData(paymentSnap.data())
        }

    }

    const fetchOrder = async () => {

        try {

            const orderRef = doc(db, 'orders', location.state.order_id)
            const orderSnap = await getDoc(orderRef)

            if (orderSnap.exists()) {
                setOrderData(orderSnap.data())
            }

        } catch (error) {

            console.log('no order data')
        }
    }


    const fetchCustomers = async () => {

        setLoading(true)

        const customersRef = doc(db, 'customers', location.state.customer_id)
        const customerSnap = await getDoc(customersRef)

        if (customerSnap.exists()) {
            if (customerSnap.data().shipping_id) {
                const shippingRef = doc(db, 'customers', location.state.customer_id, 'shipping', `${customerSnap.data().shipping_id}`)
                const shippingSnap = await getDoc(shippingRef)
                if (shippingSnap.exists()) {
                    // console.log("Shipping data", shippingSnap.data())
                    setCustomerData(shippingSnap.data())

                }

            }

        }
        else {
            console.log('no customer data')
        }

        setLoading(false)

    }

    const trackOrder = () => {
        navigate('/track')
    }


    useEffect(() => {
        if (isMounted) {

            if (location.state === null) {
                navigate('/cart')

            } else {
                fetchDelivery().then()
                fetchTransaction().then();
                fetchCustomers().then();
                fetchOrder().then();
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
                            <CheckoutBreadCrumb page="order confirmation" />

                            <div className='checkout-section'>
                                <div className='row justify-content-center'>
                                    <div className='col-lg-7 col-md-10 col-sm-12'>
                                        <div className='print-order-box'>
                                            <div className='store-logo'>
                                                <img src={TimaBlaq} alt='store logo here' className='img-fluid' />
                                            </div>
                                            <div className='order-confirmed'>
                                                <div className='order-icon'>
                                                    <i className="fa-regular fa-circle-check"></i>
                                                </div>
                                                <div className='confirmed-info'>
                                                    <p className='order-id'>Order ID: <span className='id-no'>#{orderData.order_id} </span> </p>
                                                    <p className='order-name'>Thank you {customerData.first_name}!</p>
                                                </div>

                                            </div>
                                            <div className='confirmation-box'>
                                                <div className='confirmed-order-list'>
                                                    {orderData.product_ordered.map((product) => (
                                                        <div className='c-product-order'>
                                                            <div className='c-product-details'>
                                                                <div className='c-prod-img'>
                                                                    <img src={product.imgUrls[0]} alt='product here' className='img-fluid' />
                                                                </div>
                                                                <div className='c-prod-name'>
                                                                     <p className='prod-name'>{product.productName} </p>
                                                                    <p className='prod-span'> <span className='prod-price'>{formatSymbol()}{formatPrice(product.productPrice)} </span>    x  <span className='prod-price'> {product.qty} </span></p>
                                                                </div>
                                                            </div>
                                                            <div className='c-prod-total'>
                                                                <p className='prod-total'> {formatSymbol()}{formatPrice(Number(product.productPrice) * Number(product.qty))}  </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <hr />
                                                    <div className='c-shipping-total'>
                                                        <p className='light-text'>Subtotal</p>
                                                        <p className='bold-text'> {formatSymbol()}{formatPrice(orderData.order_total)} </p>
                                                    </div>

                                                    <div className='c-shipping-total'>
                                                        <p className='light-text'>Shipping</p>
                                                        <p className='bold-text'>{formatSymbol()}{formatPrice(deliveryData.deliveryPrice)} </p>
                                                    </div>

                                                    <hr />
                                                    <div className='c-shipping-total'>
                                                        <p className='light-text big-total'>Total</p>
                                                        <p className='bold-text big-total'>{formatSymbol()}{formatPrice(Number(orderData.order_total) + Number(deliveryData.deliveryPrice))} </p>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='confirmation-box'>
                                                <div className='order-updated'>
                                                    <h5 className='title'>Order updated</h5>
                                                    <p className='note'>You'll get shipping and delivery update by email.</p>

                                                    <div className='buttons'>
                                                        <button onClick={trackOrder} className='btn btn-primary'>track order </button>
                                                        <button className='btn btn-secondary'>print receipt </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='confirmation-box'>
                                                <div className='customer-info'>
                                                    <h5 className='title'>Customer Information </h5>
                                                    <div className='row'>
                                                        <div className='col-lg-6 col-md-6 col-sm-6'>
                                                            <div className='info-box'>
                                                                <h6 className='heading'>Contact Information</h6>
                                                                <p className='sub-heading'>{`${customerData.last_name} ${customerData.first_name}`} </p>
                                                                <p className='sub-heading'>{customerData.contact_info} </p>
                                                                <p className='sub-heading'> {customerData.delivery_phone} </p>
                                                            </div>
                                                        </div>

                                                        <div className='col-lg-6 col-md-6 col-sm-6'>
                                                            <div className='info-box'>
                                                                <h6 className='heading'>Payment Method</h6>
                                                                <p className='sub-heading payment'>{paymentData ? (paymentData.paymentMethod) : ('')} </p>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='row'>
                                                        <div className='col-lg-6 col-md-6 col-sm-6'>
                                                            <div className='info-box'>
                                                                <h6 className='heading'>Shipping Address</h6>
                                                                <p className='sub-heading'>{customerData.delivery_address} </p>
                                                                <p className='sub-heading'>{`${customerData.city}, ${customerData.delivery_state}`} </p>
                                                                <p className='sub-heading'>{customerData.country} </p>
                                                            </div>
                                                        </div>

                                                        <div className='col-lg-6 col-md-6 col-sm-6'>
                                                            <div className='info-box'>
                                                                <h6 className='heading'>Shipping Method</h6>
                                                                <p className='sub-heading'>{deliveryData ? (deliveryData.deliveryLocation) : ('')} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </>)}
            <FooterNav />

        </>
    )
}

export default OrderConfirmation;