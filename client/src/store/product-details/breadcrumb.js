
import { Link } from "react-router-dom";

const DetailsBreadCrumb = ({prod_name, cat_name}) => {
    return ( 
        <>

    <div className="bread-header">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="bread-width"> 
                            <div className="bread-header-text">
                                <h4> {prod_name}  </h4>
                                <div className="breadcrumb">
                                    <ul>
                                        <li> <Link to="/" className="breadcrumb-link" >Home <i className="fa-solid fa-angle-right"></i> </Link></li>
                                        <li> <Link to="/shop" className="breadcrumb-link" >Shop <i className="fa-solid fa-angle-right"></i> </Link></li>
                                        <li> <span className="breadcrumb-link"> {cat_name} </span> </li>
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