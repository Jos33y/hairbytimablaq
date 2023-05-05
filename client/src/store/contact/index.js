import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config"
import "./contact.css";
import BreadCrumb from "../components/breadcrumb";
import ContactImg from "../assets/images/cheerful-young-phone-tp.png";
import HeaderNav from "../components/header";
import SubscribeForm from "../components/subscribe";
import FooterNav from "../components/footer";


const ContactUs = () => { 

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
            <HeaderNav />
            <div className="contact-container">
                <BreadCrumb title="contact" breadImg={ContactImg} />

                <div className="contact-section">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-md-12">
                            <div className="contact-info">
                                <h3 className="title"> Get in touch</h3>
                                <div className="contact-info-text">
                                    <div className="contact-info-desc">
                                        <p className="contact-icon"> <i className="fa-solid fa-location-dot"></i> </p>
                                        <p className="contact-desc"> {storeData ? (`${storeData.storeAddress}`) : ('')}</p>
                                    </div>

                                    <div className="contact-info-desc">
                                        <p className="contact-icon"> <i className="fa-solid fa-phone"></i> </p>
                                        <p className="contact-desc"> {storeData ? (`+${storeData.businessPhoneOne}`) : ('')} / {storeData ? (`+${storeData.businessPhoneTwo}`) : ('')} </p>
                                    </div>

                                    <div className="contact-info-desc">
                                        <p className="contact-icon"> <i className="fa-solid fa-envelope"></i> </p>
                                        <p className="contact-desc"> {storeData ? (`${storeData.businessEmail}`) : ('')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-10 col-sm-12">
                            <div className="contact-form">
                                <h3 className="title"> Send Us an Email</h3>
                                <div className="contact-form-content">
                                    <div className="form-group">
                                        <label className="form-label">Name </label>
                                        <input type="text" name="name" id="name" className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Email </label>
                                        <input type="email" name="email" id="email" className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Subject </label>
                                        <input type="text" name="subject" id="subject" className="form-control" />
                                    </div>


                                    <div className="form-group">
                                        <label className="form-label">Message </label>
                                        <textarea name="message" id="message" cols="10" rows="5" className="form-control"></textarea>

                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary">Send</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SubscribeForm />
            <FooterNav />
        </>
    )
}
export default ContactUs;