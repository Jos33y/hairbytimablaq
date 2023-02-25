import "./component.css";
import { Link } from "react-router-dom";
import TimaBlaq from "../assets/images/timablaq.jpeg";
import TestOne from "../assets/images/img-test-1.jpg";
import TestTwo from "../assets/images/img-test-2.jpg";

const TestimonySection = () => {
  return (
    <>
      <div className="Testimony-container">
        <div className="row">
            <h3> A positive Experience in many ways.</h3>
          <div className="col-md-4">
            <div className="testimony-box">
              <div className="testimony-image">
                <img src={TimaBlaq} alt="" className="img-responsive" />
              </div>
              <div className="testimony-text">
                <div className="description">
                  <p>
                    “ Hair by timablaq has exceeded my expectations with their
                    silky, natural-looking hair extensions. The customer service
                    is excellent and I highly recommend them to anyone looking
                    for a new look ”
                  </p>
                </div>
                <div className="testifier">
                  <p> Stephanie </p>
                  <p>
                    <Link to="https://instagram.com" className="testifier-link">
                      <i class="fa-brands fa-instagram"></i>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          


          <div className="col-md-4">
            <div className="testimony-box">
              <div className="testimony-image">
                <img src={TestOne} alt="" className="img-responsive" />
              </div>
              <div className="testimony-text">
                <div className="description">
                  <p>
                    “ Hair by timablaq has given me the confidence to try new styles. Their hair extensions are versatile and I can style them in so many different ways ”
                  </p>
                </div>
                <div className="testifier">
                  <p> Aryarr Star </p>
                  <p>
                    <Link to="https://instagram.com" className="testifier-link">
                      <i class="fa-brands fa-instagram"></i>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>




          <div className="col-md-4">
            <div className="testimony-box">
              <div className="testimony-image">
                <img src={TestTwo} alt="" className="img-responsive" />
              </div>
              <div className="testimony-text">
                <div className="description">
                  <p>
                    “  I am in love with Hair by timablaq! The hair extensions are so soft and natural-looking, I get so many compliments. Plus, the customer service is fantastic ”
                  </p>
                </div>
                <div className="testifier">
                  <p> Tochi deluxe </p>
                  <p>
                    <Link to="https://instagram.com" className="testifier-link">
                      <i class="fa-brands fa-instagram"></i>
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
