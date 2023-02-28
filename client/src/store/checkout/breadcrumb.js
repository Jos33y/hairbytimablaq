
import { Link } from "react-router-dom";

const CheckoutBreadCrumb = () => {
    return ( 
        <>

    <div className="bread-header">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="bread-width">
                            <div className="bread-header-text">
                                <h4> Checkout  </h4>
                                <div className="breadcrumb">
                                    <ul>
                                        <li> <Link to="/cart" className="breadcrumb-link" >Cart <i className="fa-solid fa-angle-right"></i> </Link></li>
                                        <li className="active"> <span className="breadcrumb-link"> Information <i className="fa-solid fa-angle-right"></i> </span>  </li>
                                        <li> <span className="breadcrumb-link"> Payment  <i className="fa-solid fa-angle-right"></i> </span> </li>
                                        <li> <span className="breadcrumb-link"> Order confirmation <i className="fa-solid fa-angle-right"></i>  </span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default CheckoutBreadCrumb;