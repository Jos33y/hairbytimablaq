import React, { useState, useEffect, useRef } from "react";
import "./component.css";
import { collection, getDocs, query, limit, doc, getDoc, orderBy } from "firebase/firestore";
import { db } from "../../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import TimaBlaq from "../assets/images/timablaq.jpeg";
import { useCart } from "./cart-context";
import he from 'he';

const HeaderNav = () => {
    const navigate = useNavigate();

    const isMounted = useRef()
    const [cart] = useCart();
    const [rateCurrency, setRateCurrency] = useState('');
    const [rateInfo, setRateInfo] = useState([]);


    const fetchRates = async () => {
        try {
            // const auth = getAuth()
            const rateRef = collection(db, 'exchange_rates')
            const q = query(rateRef, orderBy('timeStamp', 'asc'), limit(10))
            const querySnap = await getDocs(q)

            let rateInfo = [];

            querySnap.forEach((doc) => {
                return rateInfo.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setRateInfo(rateInfo)

            const localRate = JSON.parse(localStorage.getItem("rate"));
            //load persisted cart into state if it exists
            if (localRate) {
                setRateCurrency(localRate.rate_id)
            } else {
                getRateDetails(rateInfo[0].id)
            }
            // console.log("rate info: ", rateInfo[0].id)

        }
        catch (error) {

            console.log({ error })
        }

    }

    const onChange = (e) => {

        if (e.target.id) {
           getRateDetails(e.target.value);
           setRateCurrency(e.target.value);
        }

    }

    const getRateDetails = async (rate_id) => {
        
        try {
            const rateRef = doc(db, 'exchange_rates', rate_id)
            const rateSnap = await getDoc(rateRef)

            if (rateSnap.exists()) {
                localStorage.setItem('rate', JSON.stringify(rateSnap.data()));
                setRateCurrency(rateSnap.data().id);
                window.location.reload();
                // console.log("rate data", rateSnap.data())
            }
        }
        catch (error) {
            console.log({ error })
        }
       
    }
    useEffect(() => {

        if (isMounted) {

            fetchRates().then();
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
        <>
            <div className="top-bar">
                <div className="row">
                    <div className="col-lg-3 col-md-2 col-sm-2 col-0"></div>
                    <div className="col-lg-5 col-md-5 col-sm-5 col-12">
                        <p className="tag-line"> Life is short make every hair flip count</p>
                    </div>
                    <div className="col-lg-3 col-md-5 col-sm-5 col-12">
                        <div className="top-bar-side">
                        {rateInfo && rateInfo.length > 0 ? (
                            <select value={rateCurrency} onChange={onChange} className="form-control" id="rateCurrency">
                                {rateInfo.map((rate) => (
                                    <option key={rate.id} value={rate.data.rate_id}>
                                        {rate.data.rateCurrency} { he.decode(rate.data.rateSymbol)} 
                                    </option>
                                ))} 
                            </select>) : ('')}
                            <p
                                onClick={() => {
                                    navigate("/track");
                                }}
                            >
                                Track order <i className="fa-solid fa-truck-fast"></i>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Header-nav">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <Link to="/" className="navbar-brand">
                        <img src={TimaBlaq} className="img-logo" alt="tima-blaq" />
                        Hair by Tima Blaq
                    </Link>


                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/shop" className="nav-link">
                                    shop
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/about" className="nav-link">
                                    About
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <p>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </p>
                            <p
                                onClick={() => {
                                    navigate("/track");
                                }}
                            >
                                <i className="fa-solid fa-truck-fast"></i>
                            </p>
                            <p
                                onClick={() => {
                                    navigate("/cart");
                                }}
                            >
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span className="cart-number">({cart.length > 0 ? (cart.length) : '0'})</span>
                            </p>
                        </form>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default HeaderNav;
