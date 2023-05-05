import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs, orderBy, query, setDoc, where, serverTimestamp, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { v4 as uuidv4 } from "uuid";
import "./checkout.css";
import CheckoutBreadCrumb from './breadcrumb';
import { useNavigate } from 'react-router-dom';
import CheckOutOrderSummary from './order-summary';
import HeaderNav from '../components/header';
import FooterNav from '../components/footer';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { toast } from 'react-toastify';
import { formatPrice, formatSymbol } from "../components/format-price";


const CheckOut = () => {

    const isMounted = useRef()
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [deliveries, setDeliveries] = useState([])
    const [shippingMethod, setShippingMethod] = useState("within-gambia-3dad2");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState();
    const [isCode, setCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [getCode, setGetCode] = useState('');
    const [getPinId, setPinId] = useState('');
    const [rateData, setRateData] = useState('GM');


    const onContactChange = (contact_status) => {

        if (contact_status === 'email') {
            setIsActive(false)
            setIsCodeSent(false)
            setCode('')
        }
        else if (contact_status === 'phone') {
            setIsActive(true)
            setIsCodeSent(false)
            setCode('')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsDisabled(true)


        if (isCodeSent) {

            if (isActive) {

                let contact_mode = 'phone';
                let contact_info = contactPhone;
                verifyCode(contact_mode, contact_info);

                // navigate('/checkout/shipping', { state: { contact_mode: 'phone', contact_info: contactPhone, delivery_method: shippingMethod } })

            } else {
                if (`${isCode}` === `${getCode}`) {
                    toast.success('verification successful');
                    let contact_mode = 'email';
                    let contact_info = contactEmail;
                    createCustomer(contact_mode, contact_info);
                }
                else {
                    toast.error('invalid code');
                    setCode('');
                }

            }

        } else {
            const theCode = Math.floor(100000 + Math.random() * 900000);

            if (isActive) {

                const pattern = /^[\d+]+$/; // Match numbers and the + symbol
                let phoneValid = pattern.test(contactPhone);
                if (phoneValid) {
                    sendSms();
                }
                else {
                    toast.error('invalid phone number')
                }

            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                let emailValid = emailRegex.test(contactEmail);
                if (emailValid) {
                    sendEmail(theCode);

                } else {
                    toast.error('invalid email address')
                }
            }
        }
        setIsDisabled(false)

    }


    const createCustomer = async (contact_mode, contact_info) => {
        const rand_Id = uuidv4().slice(0, 20)

        const customerRef = collection(db, 'customers')
        let q;
        q = query(customerRef, where("contact_info", "==", `${contact_info}`))

        const querySnap = await getDocs(q)
        let customers = []
        querySnap.forEach((doc) => {
            return customers.push({
                id: doc.id,
                data: doc.data(),
            })
        })

        if (customers.length > 0) {
            navigate('/checkout/shipping', { state: { customer_id: customers[0].data.customer_id, delivery_method: shippingMethod } })
        }
        else {

            // console.log('will create customers:', customers)
            let customer_id = rand_Id.toLowerCase();
            const customerData = {}
            customerData.customer_id = customer_id;
            customerData.contact_mode = contact_mode;
            customerData.contact_info = contact_info;
            customerData.timeStamp = serverTimestamp();
            const customerRef = doc(db, 'customers', customer_id)
            await setDoc(customerRef, customerData).then(() => {
                navigate('/checkout/shipping', { state: { customer_id: customer_id, delivery_method: shippingMethod } })

            })

        }

    }

    const verifyCode = async (contact_mode, contact_info) => {

        try {
            const url = '/verify-code';
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    pin_id: getPinId,
                    pin: isCode,
                }),
            };

            await fetch(url, options)
                .then(res => res.json())
                .then(json => {
                    if (json.verified === true) {
                        toast.success('verification successful');
                        createCustomer(contact_mode, contact_info);
                    } else if (json.verified === false) {
                        toast.error('invalid code')
                    } else {
                        toast.error('unable to verify phone number')
                    }

                    // console.log(json)
                })

        } catch (error) {
            toast.error('unable to verify phone')
            console.log({ error })
        }

    }

    const sendSms = async () => {

        try {
            const url = '/send-code-phone';
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    phone_number: contactPhone,
                }),
            };

            await fetch(url, options)
                .then(res => res.json())
                .then(json => {
                    if (json.status === 200) {

                        if (json.smsStatus === "Message Sent") {
                            toast.success('Code sent successfully');
                            setIsCodeSent(true)
                            setPinId(json.pinId)
                            // console.log("pin ID", json.pinId)
                        }
                    } else {
                        toast.error('something went wrong')
                    }

                    // console.log(json)
                })

        } catch (error) {
            toast.error('something went wrong')
            console.log({ error })
        }
    }



    const sendEmail = async (theCode) => {

        fetch('/send-code-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: contactEmail,
                from: 'support@hairbytimablaq.com',
                subject: 'Email Verification!',
                verification_code: theCode,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success('Code sent successfully');
                    setGetCode(theCode);
                    setIsCodeSent(true)
                } else {
                    toast.error('something went wrong')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


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

    }



    const handleEmailKeyDown = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Control', 'c', 'v', 'a'];
        if (!allowedKeys.includes(e.key) && !/^[a-zA-Z0-9@._-]*$/.test(e.key)) {
            e.preventDefault();
        }
    };

    const handleNumKeyDown = (e) => {
        const allowedKeys = ['Backspace'];
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V' || e.key === 'a' || e.key === 'A')) {
            // Allow copy and paste shortcuts
            return;
        } else if (!allowedKeys.includes(e.key) && !/^[0-9]*$/.test(e.key)) {
            // Prevent any other keys that are not numeric
            e.preventDefault();
        }
    };


    const onChange = (e) => {

        if (e.target.id) {
            let newValue = e.target.value;

            if (e.target.id === 'email') {
                newValue = newValue.replace(/[^a-zA-Z0-9@._\s-]/g, ''); // Remove any non-alphanumeric characters, spaces, and some special characters
                setContactEmail(newValue)
            }
            if (e.target.id === 'inputCode') {
                newValue = newValue.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
                setCode(newValue);
            }
        }
    };

    const onLocationChange = (e) => {
        setShippingMethod(e.target.value);
    }

    const fetchRate = () => {

        const localRate = JSON.parse(localStorage.getItem("rate"));
        if (localRate) {
            if (localRate.rateCurrency === 'gmd') {
                setRateData('GM');
            } else if (localRate.rateCurrency === 'ngn') {
                setRateData('NG');
            } else if (localRate.rateCurrency === 'usd') {
                setRateData('US');
            }
        }
    }

    useEffect(() => {
        if (isMounted) {
            fetchRate();
            fetchDeliveries().then();
        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
        <>
            <HeaderNav />
            <div className="checkout-container">
                <CheckoutBreadCrumb page="checkout" />

                <div className='checkout-section'>
                    <div className='row'>
                        <div className='col-md-7'>
                            <div className='checkout-form'>

                                {/* check out form content here */}
                                <div className='checkout-form-content'>
                                    <p className='form-title'>Delivery Method </p>

                                    {/* row for form group */}
                                    <div className='row'>
                                        <div className='col-md-10'>
                                            <div className='form-group'>

                                                <label className='form-label'>Select Delivery <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                <select
                                                    value={shippingMethod}
                                                    onChange={onLocationChange}
                                                    name='delivery_method'
                                                    id='delivery_method'
                                                    className='form-control'>
                                                    <option value="null">-- Select Delivery--</option>
                                                    {deliveries.map((delivery) => (
                                                        <option key={delivery.id}
                                                            value={delivery.data.delivery_id}>
                                                            {delivery.data.deliveryLocation} - {formatSymbol()}{formatPrice(delivery.data.deliveryPrice)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* check out form content here */}
                                <div className='checkout-form-content'>
                                    <p className='form-title'>Contact Information <span className='info-icon'> </span></p>
                                    {/* row for form group */}

                                    <div className='form-header-container'>
                                        <button onClick={() => { onContactChange('email') }} className={`btn btn-secondary ${isActive ? '' : 'btn-active'}`}> Email </button>
                                        <button onClick={() => { onContactChange('phone') }} className={`btn btn-secondary ${isActive ? 'btn-active' : ''}`}> Phone Number </button>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        {/* row for form group */}
                                        <div className='row'>
                                            {isActive ? (
                                                <div className='col-md-12'>
                                                    <div className='form-group'>
                                                        <label className='form-label'>Phone Number <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                        <PhoneInput

                                                            value={contactPhone}
                                                            onChange={setContactPhone}
                                                            placeholder="220 700000000"
                                                            defaultCountry={rateData} />
                                                    </div>
                                                </div>

                                            ) : (
                                                <div className='col-md-12'>
                                                    <div className='form-group'>
                                                        <label className='form-label'>Email <span className='required'><i className="fa-solid fa-star-of-life"></i></span> </label>
                                                        <input type="email"
                                                            id="email"
                                                            value={contactEmail}
                                                            onChange={onChange}
                                                            onKeyDown={handleEmailKeyDown}
                                                            className="form-control"
                                                            autoComplete="email"
                                                            placeholder="yourname@email.com" />
                                                    </div>
                                                </div>
                                            )}

                                            {isCodeSent ? (
                                                <div className='col-md-12'>
                                                    <div className="form-group">
                                                        <label className="form-label">Input Code </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            id="inputCode"
                                                            value={isCode}
                                                            onChange={onChange}
                                                            onKeyDown={handleNumKeyDown}
                                                            placeholder="00000"
                                                            required={true} />
                                                    </div>
                                                </div>
                                            ) : ('')}

                                        </div>

                                        <div className='row'>

                                            <div className='col-md-6'>

                                            </div>
                                            <div className='col-md-6'>
                                                <div className='form-button'>
                                                    <button disabled={isDisabled} className='btn btn-primary btn-submit'> {isCodeSent ? ('Continue to Shipping') : ('Send Code')} </button>
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-5'>
                            <CheckOutOrderSummary />

                            <div className='form-buttons'>
                                <p> &nbsp; </p>
                                <p onClick={() => { navigate('/cart') }} className='return-link'>Return to Cart </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterNav />
        </>
    );
}

export default CheckOut;