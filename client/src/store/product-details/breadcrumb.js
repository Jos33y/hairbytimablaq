
import ProdOne from "../assets/products/prod-1.jpeg";
import { Link } from "react-router-dom";

const DetailsBreadCrumb = () => {
    return ( 
        <>

    <div className="bread-header">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="bread-width">
                            <div className="bread-header-text">
                                <h4> Woolen T-Shirt  </h4>
                                <div className="breadcrumb">
                                    <ul>
                                        <li> <Link to="/" className="breadcrumb-link" >Home <i class="fa-solid fa-angle-right"></i> </Link></li>
                                        <li> <Link to="/shop" className="breadcrumb-link" >Shop <i class="fa-solid fa-angle-right"></i> </Link></li>
                                        <li> <span className="breadcrumb-link"> Woolen T-Shirt </span> </li>
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

export default DetailsBreadCrumb;