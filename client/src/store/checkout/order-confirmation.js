import React from 'react';
import "./checkout.css";
import CheckoutBreadCrumb from './breadcrumb';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '../components/header';
import FooterNav from '../components/footer';
import TimaBlaq from "../assets/images/timablaq.jpeg";
import ProdOne from "../assets/products/prod-1.jpeg";


const OrderConfirmation = () => {

     // eslint-disable-next-line
    const navigate = useNavigate();

    return (
        <> 

            <HeaderNav />
            <div className="checkout-container">
                <CheckoutBreadCrumb page="order confirmation" />

                <div className='checkout-section'>
                    <div className='row justify-content-center'>
                        <div className='col-md-7'>
                            <div className='print-order-box'>


                                <div className='store-logo'>
                                    <img src={TimaBlaq} alt='store logo here' className='img-fluid' />
                                </div>
                                <div className='order-confirmed'>
                                    <div className='order-icon'>
                                        <i className="fa-regular fa-circle-check"></i>
                                    </div>
                                    <div className='confirmed-info'>
                                        <p className='order-id'>Order ID: <span className='id-no'>#2343434 </span> </p>
                                        <p className='order-name'>Thank you Kingston!</p>
                                    </div>

                                </div>
                                <div className='confirmation-box'>
                                    <div className='confirmed-order-list'>
                                        <div className='c-product-order'>
                                            <div className='c-product-details'>
                                                <div className='c-prod-img'>
                                                    <img src={ProdOne} alt='product here' className='img-fluid' />
                                                </div>
                                                <div className='c-prod-name'>
                                                    <p className='prod-name'>Asake Bounty Shoe </p>
                                                    <p className='prod-span'> <span className='prod-price'>N3000 </span>    X  <span className='prod-price'> 3 </span></p>
                                                </div>
                                            </div>
                                            <div className='c-prod-total'>
                                                <p className='prod-total'> N9,000 </p>
                                            </div>

                                        </div>
                                        <hr />
                                        <div className='c-shipping-total'>
                                            <p className='light-text'>Subtotal</p>
                                            <p className='bold-text'>N12,000.00 </p>
                                        </div>

                                        <div className='c-shipping-total'>
                                            <p className='light-text'>Shipping</p>
                                            <p className='bold-text'>N12,000.00 </p>
                                        </div>

                                        <hr />
                                        <div className='c-shipping-total'>
                                            <p className='light-text big-total'>Total</p>
                                            <p className='bold-text big-total'>N12,000.00 </p>
                                        </div>
                                    </div>

                                </div>

                                <div className='confirmation-box'>
                                    <div className='order-updated'>
                                        <h5 className='title'>Order updated</h5>
                                        <p className='note'>You'll get shipping and delivery update by email.</p>

                                        <div className='buttons'>
                                            <button className='btn btn-primary'>track order </button>
                                            <button className='btn btn-secondary'>print receipt </button>
                                        </div>
                                    </div>


                                </div>

                                <div className='confirmation-box'>
                                    <div className='customer-info'>
                                        <h5 className='title'>Customer Information </h5>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='info-box'>
                                                    <h6 className='heading'>Contact Information</h6>
                                                    <p className='sub-heading'>Kingstine Joe </p>
                                                    <p className='sub-heading'>kingstinejoe@email.com </p>
                                                    <p className='sub-heading'>0902323232323 </p>
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className='info-box'>
                                                    <h6 className='heading'>Payment Method</h6>
                                                    <p className='sub-heading'>Bank Transfer </p>
                                                </div>
                                            </div>


                                            <div className='col-md-6'>
                                                <div className='info-box'>
                                                    <h6 className='heading'>Shipping Address</h6>
                                                    <p className='sub-heading'>2776 Tedeca Avenue </p>
                                                    <p className='sub-heading'>New Road Estate </p>
                                                    <p className='sub-heading'>Nigeria </p>
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className='info-box'>
                                                    <h6 className='heading'>Shipping Method</h6>
                                                    <p className='sub-heading'>Within Gambia </p>
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
            <FooterNav />

        </>
    )
}

export default OrderConfirmation;