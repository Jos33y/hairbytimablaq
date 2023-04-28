import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import "./checkout.css";
import formatPrice from "../components/format-price";
import CheckoutBreadCrumb from './breadcrumb';
import { useNavigate } from 'react-router-dom';
import CheckOutOrderSummary from './order-summary';
import HeaderNav from '../components/header';
import FooterNav from '../components/footer';
import PageLoading from "../components/loading";

const CheckOutShipping = () => {

    const navigate = useNavigate();
    const isMounted = useRef()
    const [deliveries, setDeliveries] = useState([])
    const [loading, setLoading] = useState(true)


    const fetchDeliveries = async () => {

        try {
            // const auth = getAuth()
            const deliveryRef = collection(db, 'delivery_locations')
            const q = query(deliveryRef, orderBy('timeStamp', 'asc'))
            const querySnap = await getDocs(q)

            let deliveries = [];

            querySnap.forEach((doc) => {
                return deliveries.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setDeliveries(deliveries)
            // setLoading(false)
        }
        catch (error) {
            toast.error("could not fetch delivery list")
            console.log({ error })
        }
        setLoading(false)

    }



    useEffect(() => {
        if (isMounted) {

            fetchDeliveries().then();
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
                                                            <input type="text" name='first_name' id='first_name' className='form-control' required={true} />
                                                        </div>
                                                    </div>

                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <label className='form-label'>Last Name <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                            <input type="text" name='last_name' id='last_name' className='form-control' required={true} />
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
                                                            <input type="text" name='delivery_address' id='delivery_address' placeholder='Apt No / House Number and Street Name' className='form-control' required={true} />
                                                        </div>
                                                    </div>
                                                </div>


                                                {/* row for form group */}
                                                <div className='row'>
                                                    <div className='col-md-4'>
                                                        <div className='form-group'>
                                                            <label className='form-label'>Town / City <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                            <input type="text" name='town_city' id='town_city' className='form-control' required={true} />
                                                        </div>
                                                    </div>

                                                    <div className='col-md-4'>
                                                        <div className='form-group'>
                                                            <label className='form-label'>State / County <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                            <input type="text" name='state_county' id='state_county' className='form-control' required={true} />
                                                        </div>
                                                    </div>

                                                    <div className='col-md-4'>
                                                        <div className='form-group'>
                                                            <label className='form-label'>Post Code / Zip Code <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                            <input type="text" name='zip_code' id='zip_code' className='form-control' required={true} />
                                                        </div>
                                                    </div>
                                                </div>


                                                {/* row for form group */}
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <label className='form-label'>Country <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                            <select defaultValue="Gambia" className='form-control' name='country' id='country'>
                                                                <option value="Gambia">Gambia</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <label className='form-label'>Phone Number <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                            <input type="text" name='phone_number' id='phone_number' className='form-control' required={true} />
                                                        </div>
                                                    </div>

                                                </div>




                                                {/* row for form group */}
                                                <div className='row'>
                                                    <div className='col-md-10'>
                                                        <div className='form-group'>
                                                            <label className='form-label'>Delivery Note  </label>
                                                            <textarea cols='10' rows='7' className='form-control' id='order_note' name='order_note' placeholder='Notes about your order, e.g: special note for delivery ' ></textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>


                                            {/* check out form content here */}
                                            <div className='checkout-form-content'>
                                                <p className='form-title'>Delivery Method </p>

                                                {/* row for form group */}
                                                <div className='row'>
                                                    <div className='col-md-10'>
                                                        <div className='form-group'>

                                                            <label className='form-label'>Select Delivery <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                            <select defaultValue="not selected" className='form-control' name='deliver_method' id='delivery_method'>
                                                                <option value="not selected">-- Select Delivery--</option>
                                                                {deliveries.map((delivery) => (
                                                                    <option key={delivery.id}
                                                                        value={delivery.data.delivery_id}>
                                                                            {delivery.data.deliveryLocation} - &#8358;{formatPrice(Number(delivery.data.deliveryPrice))}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-md-5'>
                                        <CheckOutOrderSummary />

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