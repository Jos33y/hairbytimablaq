import React from "react";
import "./contact.css";
import BreadCrumb from "../components/breadcrumb";
import ContactImg from "../assets/images/cheerful-young-phone-tp.png";
import HeaderNav from "../components/header";
import SubscribeForm from "../components/subscribe";
import FooterNav from "../components/footer";


const ContactUs = () => {
    return (
        <>
            <HeaderNav />
            <div className="contact-container">
                <BreadCrumb title="contact" breadImg={ContactImg} />

                <div className="contact-section">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="contact-info">
                                <h3 className="title"> Get in touch</h3>
                                <div className="contact-info-text">
                                    <div className="contact-info-desc">
                                        <p className="contact-icon"> <i class="fa-solid fa-location-dot"></i> </p>
                                        <p className="contact-desc"> 203, Envato Labs, Behind Alis Steet</p>
                                    </div>

                                    <div className="contact-info-desc">
                                        <p className="contact-icon"> <i class="fa-solid fa-phone"></i> </p>
                                        <p className="contact-desc"> +12 345 678 910 / +23 122 345 678 </p>
                                    </div>

                                    <div className="contact-info-desc">
                                        <p className="contact-icon"> <i class="fa-solid fa-envelope"></i> </p>
                                        <p className="contact-desc"> Infor.deercreative@gmail.com </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-7">
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