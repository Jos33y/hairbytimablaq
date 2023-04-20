import React from "react";
import { Link } from "react-router-dom";
import FooterNav from "../components/footer";
import HeaderNav from "../components/header";
import SubscribeForm from "../components/subscribe";
import "./error.css";

const ErrorPage = () => {
    return(
        <>
        <HeaderNav />
        
        <div className="error-container">
            <h1> 404 </h1>
            <h4> Oops, Page Not Found!</h4>
            <p>It looks like nothing was found at this location. Click <Link to="/" className="error-link"> here </Link>  to return Homepage</p>
        </div>

        <SubscribeForm />
        <FooterNav />
        </> 
    )
}
export default ErrorPage;