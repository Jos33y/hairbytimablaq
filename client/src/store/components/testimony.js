import "./component.css";
import { Link } from "react-router-dom";
import TimaBlaq from "../assets/images/timablaq.jpeg";

const TestimonySection = () => {
  return (
    <>
      <div className="Testimony-container"> 
        <div className="row">
          <h3> A positive Experience in many ways.</h3>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="testimony-box">
              <div className="testimony-image">
                <img src={TimaBlaq} alt="" className="img-responsive" />
              </div>
              <div className="testimony-text">
                <div className="description">
                  <p>
                    “ I highly recommend Hair by timablaq to anyone seeking a
                    new look, as their silky and natural-looking hair extensions
                    have surpassed my expectations. Their customer service is
                    exceptional. ”
                  </p>
                </div>
                <div className="testifier">
                  <p> Stephanie </p>
                  <p>
                    <Link to="https://instagram.com" className="testifier-link">
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="testimony-box">
              <div className="testimony-image">
                <img src={TimaBlaq} alt="" className="img-responsive" />
              </div>
              <div className="testimony-text">
                <div className="description">
                  <p>
                    “ Thanks to Hair by timablaq, I have gained the confidence
                    to experiment with new hairstyles as their hair extensions
                    are flexible and can be styled in numerous ways. ”
                  </p>
                </div>
                <div className="testifier">
                  <p> Oyindamola </p>
                  <p>
                    <Link to="https://instagram.com" className="testifier-link">
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="testimony-box">
              <div className="testimony-image">
                <img src={TimaBlaq} alt="" className="img-responsive" />
              </div>
              <div className="testimony-text">
                <div className="description">
                  <p>
                    “ The hair extensions from Hair by timablaq have captured my
                    heart! They are incredibly soft and have a natural
                    appearance, which often results in many compliments.
                    Furthermore, their customer service is exceptional. ”
                  </p>
                </div>
                <div className="testifier">
                  <p> Halimat  </p>
                  <p>
                    <Link to="https://instagram.com" className="testifier-link">
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonySection;
