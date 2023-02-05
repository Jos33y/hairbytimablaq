import React, { useState, useEffect } from "react";
import HeaderNav from "../components/header";
import HomeHero from "./hero";
import './home.css';

const Store = () => {

    const [data, setData] = useState(null);
    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);
    return (
        <>
            <HeaderNav />
            <HomeHero />

            <div className="progress-work">
                <p>{!data ? "Loading..." : data}</p>
            </div>
        </>
    )
}
export default Store;