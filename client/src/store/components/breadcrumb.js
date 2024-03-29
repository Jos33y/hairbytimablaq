import "./component.css";
import { Link } from "react-router-dom";

const BreadCrumb = ({title, breadImg}) => {
    return ( 
        <>

            <div className="bread-header">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                        <div className="header-img">
                            <img src={breadImg} alt="header-img" className="img-fluid" />
                        </div>
                    </div> 
                    <div className="col-lg-7 col-md-7 col-sm-7 col-7">
                        <div className="bread-width">
                            <div className="bread-header-text">
                                <h4> {title}  </h4>
                                <div className="breadcrumb">
                                    <ul>
                                        <li> <Link to="/" className="breadcrumb-link" >Home <i className="fa-solid fa-angle-right"></i> </Link></li>
                                        <li> <span className="breadcrumb-link"> {title} </span> </li>

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

export default BreadCrumb