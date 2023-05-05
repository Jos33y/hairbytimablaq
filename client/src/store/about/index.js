import "./about.css";
import AboutImg from "../assets/images/beautiful--ab-tp.png";
import MainImg from "../assets/images/women-classic-beauty.jpg";
import BreadCrumb from "../components/breadcrumb";
import HeaderNav from "../components/header";
import TestimonySection from "../components/testimony";
import SubscribeForm from "../components/subscribe";
import FooterNav from "../components/footer";

const AboutUs = () => {
    return (
        <> 
            <HeaderNav />
            <div className="about-container">
                <BreadCrumb title="about" breadImg={AboutImg} />

                <div className="about-section">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="about-section-details">
                                <p className="title">Our Story </p>

                                <div className="about-story">
                                    <p className="p-tag">
                                        Welcome to Hairbytimablaq, your one-stop destination for
                                        top-quality wigs. We are dedicated to providing you with the
                                        latest in wig fashion, designed to help you look and feel
                                        your best. Whether you're searching for a classic look or
                                        something more contemporary, we've got you covered. Our wig
                                        collection is hand-selected to ensure that we only offer the
                                        finest quality hair, ensuring that every wig is both stylish
                                        and comfortable to wear. 
                                    </p>
                                    <p className="p-tag">
                                        At Hairbytimablaq, our commitment to providing exceptional
                                        service is reflected in our salon's ability to offer the
                                        highest quality hair styling services and luxurious hair
                                        products. We prioritize our customers above all else and
                                        take pride in cultivating a loyal and satisfied customer
                                        base that inspires us every day.
                                    </p>

                                    <p className="p-tag">
                                        We believe that everyone deserves
                                        to look and feel their best, and with our wigs, you can
                                        achieve just that. Browse our collection today and find your
                                        new signature look.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="about-img">
                                <img src={MainImg} alt="about us" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TestimonySection />
            <SubscribeForm />
            <FooterNav />
        </>
    );
};
export default AboutUs;
