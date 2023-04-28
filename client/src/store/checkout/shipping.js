import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import "./checkout.css";
import formatPrice from "../components/format-price";
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
    const [loading, setLoading] = useState(true)
    const [orderNote, setOrderNote] = useState("");
    const [customerData, setCustomerData] = useState({
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
        shipping_id: '',
        time_Stamp: '',
    });

    const {first_name, last_name, delivery_address, city, delivery_state, postal_code, country, delivery_phone } = customerData


    const fetchCustomers = async () => {

        setLoading(true)
        const customersRef = doc(db, 'customers', location.state.contact_info)
        const customerSnap = await getDoc(customersRef)

        if (customerSnap.exists()) {
            console.log("profile data", customerSnap.data())
            // console.log("Params Name:", params.dash_url)
            setCustomerData(customerSnap.data())
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
        }
        setCustomerData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }


    useEffect(() => {
        if (isMounted) {

            fetchCustomers().then();
            setCustomerData((prevState) => ({
                ...prevState,
                contact_info: location.state.contact_info,
                contact_mode: location.state.contact_mode,
            }))
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
                                                                name='town_city'
                                                                id='town_city'
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
                                                                name='state_county'
                                                                id='state_county'
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
                                                                name='zip_code'
                                                                id='zip_code'
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
                                                                name='delivery_number'
                                                                id='delivery_number'
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



                                        </div>
                                    </div>

                                    <div className='col-md-5'>
                                        <CheckOutOrderSummary shippingMethod={location.state.delivery_method} />

                                        <div className='form-buttons'>
                                            <button onClick={() => { navigate('/checkout/payment') }} className='btn btn-primary'> Place Order </button>
                                            <p onClick={() => { navigate('/cart') }} className='return-link'>Return to Cart </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <FooterNav />
                    </>)}
        </>
    );
}

export default CheckOutShipping;