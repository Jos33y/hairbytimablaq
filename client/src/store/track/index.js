import BreadCrumb from "../components/breadcrumb";
import "./track.css";
import TrackImg from "../assets/images/cart-with-two-cardboard-tp.png";
import HeaderNav from "../components/header";
import FooterNav from "../components/footer";
import SubscribeForm from "../components/subscribe";

const TrackOrder = () => {
  return (
    <>
    <HeaderNav />
      <div className="track-container">
        <BreadCrumb title="Track order" breadImg={TrackImg} />
        <div className="track-section">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-10 col-sm-10 col-12"> 
              <div className="track-form">
                <p className="track-note">
                  To track your order please enter your Order ID in the box
                  below and click the "Track Order" button. This was given to you on
                  your receipt and in the confirmation email/sms.
                </p>
                <div className="form-group">
                    <label className="form-label"> Order ID</label>
                    <input type="text" name="order-id" className="form-control" placeholder="Enter Order ID" />
                </div>

                <div className="form-group">
                    <label className="form-label"> Contact Info </label>
                    <input type="text" name="order-id" className="form-control" placeholder="Enter Phone or Email" />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-md"> Track Order </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <SubscribeForm />
      <FooterNav />
    </>
  ); 
};

export default TrackOrder;
