import React from 'react';
import "./checkout.css";
import CheckoutBreadCrumb from './breadcrumb';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '../components/header';
import FooterNav from '../components/footer';


const OrderConfirmation = () => {

    const navigate = useNavigate();

    return (
        <>

            <HeaderNav />
            <div className="checkout-container">
                <CheckoutBreadCrumb page="order confirmation" />

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
                                        <p onClick={() => { navigate('/track') }} className='return-link'>Change Info </p>
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