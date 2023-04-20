import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import "./shop.css";
import ProductCard from "../components/product-card";
import HeaderImg from "../assets/images/african-woman-tp.png";
import HeaderNav from "../components/header";
import FooterNav from "../components/footer";
import SubscribeForm from "../components/subscribe";
import BreadCrumb from "../components/breadcrumb";
import PageLoading from "../components/loading";
import ProductLoading from "../components/prod-loading";

const Shop = () => {

    const isMounted = useRef()
    const location = useLocation();
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [catValue, setCatValue] = useState('all');
    const [loading, setLoading] = useState(true)
    const [prodLoading, setProdLoading] = useState(false)


    //Fetch Product
    const fetchProducts = async (changeCat) => {

        setProdLoading(true)
        let catChange = changeCat ? changeCat : catValue; 
        try {
            const prodRef = collection(db, 'products')
            let q;
            if (catChange === 'all') {
                q = query(prodRef, orderBy('timeStamp', 'desc'),)
            }
            else {
                q = query(prodRef, where("productCategory", "==", `${catChange}`))

            }
            const querySnap = await getDocs(q)
            let products = []

            querySnap.forEach((doc) => {
                return products.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setProducts(products)
        }
        catch (error) {
            console.log({ error })
            toast.error("Unable to retrieve products")

        }
        setLoading(false);
        setProdLoading(false);


    }

    const fetchCategories = async () => {

        try {
            // const auth = getAuth()
            const catRef = collection(db, 'categories')
            const q = query(catRef, orderBy('timeStamp', 'asc'))
            const querySnap = await getDocs(q)

            let categories = [];

            querySnap.forEach((doc) => {
                return categories.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setCategories(categories)
            // setLoading(false)
        }
        catch (error) {
            toast.error("could not fetch categories")
            console.log({ error })
        }
        setLoading(false)

    }


    const onChange = (e) => {

        fetchProducts(e.target.value).then()
        setCatValue(e.target.value);

    }

    useEffect(() => {
        if (isMounted) {

            fetchCategories().then();


            if (location.state) {

                setCatValue(location.state.category_id)
                fetchProducts(location.state.category_id).then();

            } else {

                fetchProducts().then();
                setCatValue('all');
            }

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


                        <div id="shop-container" className="shop-container">
                            <BreadCrumb title="shop" breadImg={HeaderImg} />

                            <div className="shop-section">
                                <div className="shop-actions">
                                    <div className="shop-one">
                                        <p>Showing {products ? products.length : '0'} Products</p>
                                    </div>

                                    <div className="shop-one">
                                        <div className="form-group">
                                            <select className="form-control"
                                                id="shopCategories"
                                                defaultValue={catValue}
                                                onChange={onChange}>
                                                <option value='all'>All Products</option>
                                                {categories.map((category) => (
                                                    <option key={category.id}
                                                        value={category.data.category_id}>{category.data.categoryName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <div className="product-shop">
                                    {prodLoading ? (<ProductLoading />) : products && products.length > 0 ? (
                                        <div className="row">

                                            {products.map((product) => (
                                                <div key={product.id} className="col-lg-3 col-md-4 col-6">
                                                    <ProductCard product={product.data} prod_id={product.id} />
                                                </div>

                                            ))}

                                        </div>
                                    ) :
                                        (
                                            <div className="empty-box">
                                                <h6>No product available</h6>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <SubscribeForm />

                        <FooterNav />
                    </>)}
        </>
    )
}

export default Shop;