import React, { useState } from 'react';
import "./checkout.css";
import CheckoutBreadCrumb from './breadcrumb';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '../components/header';
import FooterNav from '../components/footer';

const CheckOutPayment = () => {

    const navigate = useNavigate();

    const [paymentMade, setPaymentMade] = useState(false);


    const madePayment = () => {

        setPaymentMade(true);
    }

    const confirmPayment = () => {
        setPaymentMade(false);
    }

    const cancelOrder = () => {
        navigate('/cart');
    }

    return (
        <>
            <HeaderNav />
            <div className="checkout-container">
                <CheckoutBreadCrumb page="payment" />

                <div className='checkout-section'>
                    <div className='row justify-content-center'>
                        <div className='col-md-8'>
                            <div className='checkout-table'>
                                <div className='checkout-table-info'>
                                    <div className='checkout-info'>
                                        <p className='title'>Full  Name</p>
                                        <p className='sub-title'> Jameson Johnson</p>
                                    </div>
                                    <hr />
                                    <div className='checkout-info'>
                                        <p className='title'>Email</p>
                                        <p className='sub-title'> jameson@email.com</p>
                                    </div>
                                    <hr />
                                    <div className='checkout-info'>
                                        <p className='title'>Phone Number</p>
                                        <p className='sub-title'>  09034782932</p>
                                    </div>
                                    <hr />
                                    <div className='checkout-info'>
                                        <p className='title'>Ship To</p>
                                        <p className='sub-title'> Agbado Street, Ikeja, Lagos state, Nigeria</p>
                                    </div>
                                    <hr />
                                    <div className='checkout-info'>
                                        <p className='title'>Deliver Method</p>
                                        <p className='sub-title'> Within Lagos  ₦500 </p>
                                    </div>
                                    <hr />
                                    <div className='return-info'>
                                        <p onClick={() => { navigate('/checkout') }} className='return-link'>Change Info </p>
                                    </div>
                                </div>

                            </div>



                            <div className='checkout-table'>
                                <div className='checkout-order-info'>
                                    <div className='order-info'>
                                        <p className='title'>Sub total</p>
                                        <p className='sub-title'> ₦16,000.00</p>
                                    </div>
                                    <hr />
                                    <div className='order-info'>
                                        <p className='title'>Shipping</p>
                                        <p className='sub-title'> ₦500.00</p>
                                    </div>
                                    <hr />
                                    <div className='order-info'>
                                        <p className='title total'>Total</p>
                                        <p className='sub-title total'>  ₦16,500.00</p>
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

                    </div>
                </div>
            </div>
            <FooterNav />
        </>
    );
}

export default CheckOutPayment;