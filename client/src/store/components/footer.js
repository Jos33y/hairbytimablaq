import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import "./component.css";
import { Link } from "react-router-dom";
import TimaBlaq from "../assets/images/timablaq.jpeg";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import GoToTop from "./go-to-top";

const FooterNav = () => {

    const store_unique_id = 'hair-by-timablaq';
    const isMounted = useRef()
    const [storeData, setStoreData] = useState(null)

    const getStoreInfo = async () => {

        try {
            const storeRef = doc(db, 'store_info', store_unique_id)
            const storeSnap = await getDoc(storeRef)

            if (storeSnap.exists()) {
                setStoreData(storeSnap.data())
            } 
        }
        catch (error) {
            console.log({ error })
        }

    }


    useEffect(() => {

        if (isMounted) {

            getStoreInfo().then();
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
        <>
            <div className="Footer-nav">
                <div className="row">
                    {/* column section */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="footer-lists">
                            <ul>
                                <li> <Link className="footer-link" to="/">Home </Link></li>
                                <li> <Link className="footer-link" to="/about">About Us </Link></li>
                                <li> <Link className="footer-link" to="/shop">Hair Collections </Link></li>
                                <li> <Link className="footer-link" to="/contact">Contact </Link></li>

                            </ul>
                        </div>
                    </div>

                    {/* column section */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="footer-lists">
                            <ul>
                                <li> <Link className="footer-link" to="/track">Track Order </Link></li>
                                <li> <Link className="footer-link" to="/cart">Your Cart </Link></li>
                                <li> <Link className="footer-link" to="/checkout">Your Checkout </Link></li>
                                <li> <Link className="footer-link" to="/admin/login">Admin </Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* column section */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="social-lists">
                            <h5> Follow us</h5>
                            <ul className="social-icons">
                                <li> <Link className="footer-icons" to={storeData ? (`${storeData.twitterLink}`) : ('')}> <i className="fa-brands fa-twitter"></i> </Link> </li>
                                <li> <Link className="footer-icons" to={storeData ? (`${storeData.instagramLink}`) : ('')}> <i className="fa-brands fa-square-instagram"></i> </Link> </li>
                            </ul>
                        </div>

                    </div>


                    {/* column section */}
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="footer-about">
                            <div className="footer-img">
                                <img src={TimaBlaq} alt="footer logo" className="img-fluid" />
                            </div>
                            <div className="footer-address">
                                <p> {storeData ? (`${storeData.storeAddress}`) : ('')}</p>
                                <p> <span className="phone-one">{storeData ? (`+${storeData.businessPhoneOne}`) : ('')}</span> {storeData ? (`+${storeData.businessPhoneTwo}`) : ('')} </p>
                                <p> {storeData ? (`${storeData.businessEmail}`) : ('')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="footer-copy">
                    <p> Copyright <i className="fa-regular fa-copyright"></i> 2023  <span className="name">hairbytimablaq </span> | Designed by <Link to="https://instagram.com/" className="name-link"> boy_programmer </Link>  </p>
                </div>
            </div>
            <TawkMessengerReact
                propertyId="6455022bad80445890eb4e30"
                widgetId="1gvm10utt"/>
                
            <GoToTop />
        </>
    );
}

export default FooterNav;