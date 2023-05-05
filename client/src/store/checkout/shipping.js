import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { v4 as uuidv4 } from "uuid";
import "./checkout.css";
import CheckoutBreadCrumb from './breadcrumb';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckOutOrderSummary from './order-summary';
import HeaderNav from '../components/header';
import FooterNav from '../components/footer';
import PageLoading from "../components/loading";

const CheckOutShipping = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const isMounted = useRef()
    const [carts, setCarts] = useState([])
    const itemsPrice = carts.reduce((a, c) => a + c.productPrice * c.qty, 0);
    const [loading, setLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [customerId, setCustomerId] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("bank transfer")
    const [shippingId, setShippingId] = useState(null)
    const [orderId, setOrderId] = useState(null)
    // eslint-disable-next-line
    const [shippingMethod, setShippingMethod] = useState("");
    const [orderNote, setOrderNote] = useState("");
    const [shippingData, setShippingData] = useState({
        first_name: '',
        last_name: '',
        delivery_address: '',
        contact_info: '',
        contact_mode: '',
        city: '',
        delivery_state: '',
        postal_code: '',
        country: 'Gambia',
        delivery_phone: '',
        timeStamp: '',
    });

    const { first_name, last_name, delivery_address, city, delivery_state, postal_code, country, delivery_phone } = shippingData

    const orderData = {
        order_id: '',
        customer_id: '',
        shipping_id: '',
        shipping_method: '',
        payment_id: '',
        payment_status: 'processing',
        delivery_status: 'pending',
        order_status: 'processing',
        order_total: '',
        product_ordered: [],
        order_note: '',
        timeStamp: '',
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        setIsDisabled(true);
        e.preventDefault()
        const rand_Id = uuidv4().slice(0, 10);
        const unique_order_id = (Math.floor(Math.random() * 1000000000));

        try {
            let shipping_unique = `shipping-${rand_Id}`;
            let shipping_id = shipping_unique.toLowerCase()
            let order_id = unique_order_id.toString();

            const shippingDataCopy = { ...shippingData }
            shippingDataCopy.customer_id = customerId;
            shippingDataCopy.timeStamp = serverTimestamp();
            const customerData = {}
            customerData.shipping_id = shipping_id;


            if (shippingId) {
                const shippingRef = doc(db, 'customers', `${customerId}`, "shipping", shippingId)
                await updateDoc(shippingRef, shippingDataCopy).then(() => {
                    saveOrder(order_id, shippingId);
                })

            } else {
                const shippingRef = doc(db, 'customers', `${customerId}`, "shipping", shipping_id)
                await setDoc(shippingRef, shippingDataCopy).then(() => {
                    const customerRef = doc(db, 'customers', `${customerId}`)
                    updateDoc(customerRef, customerData);
                    saveOrder(order_id, shipping_id);
                })
            }

        }
        catch (error) {
            console.log({ error })
            setLoading(false);
        }
       
        setIsDisabled(false);

    }

    const saveOrder = async (order_id, shipping_id) => {
        const orderCopy = { ...orderData }
        orderCopy.customer_id = customerId;
        orderCopy.shipping_id = shipping_id;
        orderCopy.shipping_method = shippingMethod;
        orderCopy.order_note = orderNote;
        orderCopy.product_ordered = [...carts]
        orderCopy.order_total = itemsPrice;
        orderCopy.timeStamp = serverTimestamp();

        if (orderId) {
            orderCopy.order_id = orderId;
            const orderRef = doc(db, 'orders', orderId)
            await updateDoc(orderRef, orderCopy).then(() => {
                
                navigate('/checkout/payment', { state: { customer_id: customerId, order_id: orderId, delivery_method: shippingMethod, payment_method: paymentMethod } })
               
            })

        } else {

            orderCopy.order_id = order_id;
            let string_order = JSON.stringify(order_id);
            localStorage.setItem("order_id", string_order)

            const orderRef = doc(db, 'orders', order_id)
            await setDoc(orderRef, orderCopy).then(() => {
               
                navigate('/checkout/payment', { state: { customer_id: customerId, order_id: order_id, delivery_method: shippingMethod, payment_method: paymentMethod } })
                
            })
        }

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

            } else {
                // console.log("profile data", customerSnap.data())
                setShippingData((prevState) => ({
                    ...prevState,
                    contact_info: customerSnap.data().contact_info,
                    contact_mode: customerSnap.data().contact_mode,
                }))
            }


            setCustomerId(location.state.customer_id);
            setShippingMethod(location.state.delivery_method);
        }
        else {
            console.log('no customer data')
        }

        setLoading(false)

    }


    // onChange function to make input functional
    const onChange = (e) => {

        if (e.target.id === 'order_note') {
            setOrderNote(e.target.value);
        } else if (e.target.id === 'paymentMethod') {
            setPaymentMethod(e.target.value);
        }
        else {

            setShippingData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }))
        }

    }


    useEffect(() => {
        if (isMounted) {

            fetchCustomers().then();
            let localCart = localStorage.getItem("cart");
            localCart = JSON.parse(localCart);
            if (localCart) {
                setCarts(localCart)
            } else {
                navigate('/cart')
            }

            let local_order_id = localStorage.getItem("order_id");
            local_order_id = JSON.parse(local_order_id);
            if (local_order_id) {
                setOrderId(local_order_id)
            } else {
                setOrderId(null);
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
                            <CheckoutBreadCrumb page="shipping" />

                            <div className='checkout-section'>
                                <form onSubmit={handleSubmit} >
                                    <div className='row'>
                                        <div className='col-md-7'>
                                            <div className='checkout-form'>

                                                {/* check out form content here */}
                                                <div className='checkout-form-content'>
                                                    <p className='form-title'>Personal Information</p>
                                                    {/* row for form group */}
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <div className='form-group'>
                                                                <label className='form-label'>First Name <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                                <input type="text"
                                                                    name='first_name'
                                                                    id='first_name'
                                                                    className='form-control'
                                                                    value={first_name}
                                                                    onChange={onChange}
                                                                    required={true} />
                                                            </div>
                                                        </div>

                                                        <div className='col-md-6'>
                                                            <div className='form-group'>
                                                                <label className='form-label'>Last Name <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                                <input type="text"
                                                                    name='last_name'
                                                                    id='last_name'
                                                                    className='form-control'
                                                                    value={last_name}
                                                                    onChange={onChange}
                                                                    required={true} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* check out form content here */}
                                                <div className='checkout-form-content'>
                                                    <p className='form-title'>Shipping Information</p>
                                                    {/* row for form group */}
                                                    <div className='row'>
                                                        <div className='col-md-12'>
                                                            <div className='form-group'>
                                                                <label className='form-label'>Delivery Address <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                                <input type="text"
                                                                    name='delivery_address'
                                                                    id='delivery_address'
                                                                    placeholder='Apt No / House Number and Street Name'
                                                                    className='form-control'
                                                                    value={delivery_address}
                                                                    onChange={onChange}
                                                                    required={true} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* row for form group */}
                                                    <div className='row'>
                                                        <div className='col-md-4'>
                                                            <div className='form-group'>
                                                                <label className='form-label'>Town / City <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                                <input type="text"
                                                                    name='city'
                                                                    id='city'
                                                                    className='form-control'
                                                                    value={city}
                                                                    onChange={onChange}
                                                                    required={true} />
                                                            </div>
                                                        </div>

                                                        <div className='col-md-4'>
                                                            <div className='form-group'>
                                                                <label className='form-label'>State / County <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                                <input type="text"
                                                                    name='delivery_state'
                                                                    id='delivery_state'
                                                                    className='form-control'
                                                                    value={delivery_state}
                                                                    onChange={onChange}
                                                                    required={true} />
                                                            </div>
                                                        </div>

                                                        <div className='col-md-4'>
                                                            <div className='form-group'>
                                                                <label className='form-label'>Post Code / Zip Code <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                                <input type="text"
                                                                    name='postal_code'
                                                                    id='postal_code'
                                                                    className='form-control'
                                                                    value={postal_code}
                                                                    onChange={onChange}
                                                                    required={true} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* row for form group */}
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <div className='form-group'>
                                                                <label className='form-label'>Country <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                                <select defaultValue={country}
                                                                    onChange={onChange}
                                                                    className='form-control'
                                                                    name='country'
                                                                    id='country'>
                                                                    <option value='Nigeria'>Nigeria</option>
                                                                    <option value="Gambia">Gambia</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className='col-md-6'>
                                                            <div className='form-group'>
                                                                <label className='form-label'>Phone Number <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                                <input type="text"
                                                                    name='delivery_phone'
                                                                    id='delivery_phone'
                                                                    value={delivery_phone}
                                                                    onChange={onChange}
                                                                    className='form-control' required={true} />
                                                            </div>
                                                        </div>

                                                    </div>

                                                    {/* row for form group */}
                                                    <div className='row'>
                                                        <div className='col-md-10'>
                                                            <div className='form-group'>
                                                                <label className='form-label'>Delivery Note  </label>
                                                                <textarea cols='10'
                                                                    rows='5'
                                                                    className='form-control'
                                                                    id='order_note'
                                                                    name='order_note'
                                                                    value={orderNote}
                                                                    onChange={onChange}
                                                                    placeholder='Notes about your order, e.g: special note for delivery ' ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                {/* check out form content here */}
                                                <div className='checkout-form-content'>
                                                    <p className='form-title'>Payment Method</p>
                                                    {/* row for form group */}
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <div className='form-group'>
                                                                <label className='form-label'>Select Payment Method <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                                <select
                                                                    value={paymentMethod}
                                                                    onChange={onChange}
                                                                    name='paymentMethod'
                                                                    id='paymentMethod'
                                                                    className='form-control'>
                                                                    <option value="null">-- Select Payment Method--</option>
                                                                    <option value="bank transfer"> Bank Transfer </option>
                                                                    <option value="international bank transfer">International Bank Transfer </option>
                                                                </select> 
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-md-5'>
                                            <CheckOutOrderSummary shippingMethod={location.state.delivery_method} />

                                            <div className='form-buttons'>
                                                <button disabled={isDisabled} type="submit" className='btn btn-primary'> Place Order </button>
                                                <p onClick={() => { navigate('/cart') }} className='return-link'>Return to Cart </p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <FooterNav />
                    </>)}
        </>
    );
}

export default CheckOutShipping;