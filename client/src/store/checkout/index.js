import React, { useState } from 'react';
import "./checkout.css";
import CheckoutBreadCrumb from './breadcrumb';
import { useNavigate } from 'react-router-dom';
import CheckOutOrderSummary from './order-summary';
import HeaderNav from '../components/header';
import FooterNav from '../components/footer';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { toast } from 'react-toastify';
import nodemailer from "nodemailer";
import ejs from "ejs";


const CheckOut = () => {
    const [isActive, setIsActive] = useState(false);
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState();
    const [isCode, setCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    // eslint-disable-next-line
    const [isCodeValid, setIsCodeValid] = useState(false);
    const [getCode, setGetCode] = useState('');


    const navigate = useNavigate();

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

        if (isCodeSent) {
            toast.success('verifying code');
        }
        else {

            const theCode = Math.floor(100000 + Math.random() * 900000);

            if (isActive) {
                console.log("Phone ", contactPhone, "code", theCode);
                setIsCodeSent(true)

            } else {

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                let emailValid = emailRegex.test(contactEmail);
                if (emailValid) {

                    sendEmail(theCode).then(() => {
                        toast.success('verification code sent successfully');
                        setGetCode(theCode);
                        setIsCodeSent(true)
                    })

                    console.log("Email", contactEmail, "code", theCode);

                } else {

                    toast.error('invalid email address')
                }
            }
        }
    }


    const sendEmail = async (theCode) => {
        // Create a nodemailer transporter
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "youremail@gmail.com",
                pass: "yourpassword",
            },
        });

        // Render the email template with the data
        let html = await ejs.renderFile("./verification-email.ejs", {
            verificationCode: theCode,
        });

        // Define the email message
        let message = {
            from: "support@hairbytimablaq.com",
            to: contactEmail,
            subject: "Email Verification!",
            html: html,
        };

        // Send the email
        await transporter.sendMail(message);
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

    const goToShipping = () => {
        if (isCodeValid === false) {
            navigate('/checkout/shipping')
        } else {
            toast.error('validate contact info')
        }
    }




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
                                                            defaultCountry="GM" />
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

                                                    <button className='btn btn-primary btn-submit'> {isCodeSent ? ('Continue to Shipping') : ('Send Code')} </button>
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
                                <button onClick={goToShipping} className='btn btn-primary'> Place Order </button>
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