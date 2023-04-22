import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import FooterNav from "../components/footer";
import HeaderNav from "../components/header";
import SubscribeForm from "../components/subscribe";
import TestimonySection from "../components/testimony";
import HomeCategories from "./categories";
import HomeHero from "./hero";
import './home.css';
import HomeProducts from "./products";
import PageLoading from "../components/loading";

const Store = () => {

    const isMounted = useRef()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)


    //Fetch Product
    const fetchProducts = async () => { 
        setLoading(true)
        try {
            const prodRef = collection(db, 'products')
            const q = query(prodRef, limit(8))
            const querySnap = await getDocs(q)
            let products = []
            querySnap.forEach((doc) => {
                return products.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setProducts(products)

        } catch (error) {
            console.log({ error })
            toast.error("Unable to retrieve products")
        }
        setLoading(false);
    }


    //Fetch Categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const catRef = collection(db, 'categories')
            const q = query(catRef, orderBy('timeStamp', 'asc'), limit(4))
            const querySnap = await getDocs(q)
            let categories = [];
            querySnap.forEach((doc) => {
                return categories.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setCategories(categories)

        }
        catch (error) {
            toast.error("could not fetch categories")
            console.log({ error })
        }
        setLoading(false);
    }



    useEffect(() => {
        if (isMounted) {

            fetchCategories().then();
            fetchProducts().then();

        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])


    return (
        <>
            {loading ?
                (<PageLoading />) : (
                    <>
                        <HeaderNav />
                        <HomeHero />
                        <HomeCategories categories={categories} />
                        <HomeProducts products={products} />
                        <TestimonySection />
                        <SubscribeForm />
                        <FooterNav />
                    </>)}
        </>
    )
}
export default Store;