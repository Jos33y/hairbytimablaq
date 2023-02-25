import React from "react";
import FooterNav from "../components/footer";
import HeaderNav from "../components/header";
import SubscribeForm from "../components/subscribe";
import TestimonySection from "../components/testimony";
import HomeCategories from "./categories";
import HomeHero from "./hero";
import './home.css';

const Store = () => {


    return (
        <>
            <HeaderNav />
            <HomeHero />
            <HomeCategories />
            <TestimonySection />
            <SubscribeForm />
            <FooterNav />
        </>
    )
}
export default Store;