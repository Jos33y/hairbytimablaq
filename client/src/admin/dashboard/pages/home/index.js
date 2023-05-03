import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import HandleScroll from "../../components/go-top";
import DashStatistics from "./dash-statistics";
import LatestOrders from "./latest-orders";
import { toast } from "react-toastify";
import formatString from "../../components/format-string";
import formatPrice from "../../components/format-price";
import DashSpinner from "../../components/dash-spinner";

const DashboardHome = () => {


    const isMounted = useRef()
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([]);
    const [totalSales, setTotalSales] = useState(null);


    //get total number of orders
    const getOrders = async () => {
        setLoading(true)

        try {
            const getOrdersRef = collection(db, 'orders')
            const q = query(getOrdersRef)
            const querySnap = await getDocs(q)

            let orders = []
            querySnap.forEach((doc) => {
                return orders.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setOrders(orders)
            getTotalSales().then()

        }
        catch (error) {
            console.log({ error })
            toast.error("currently can't get your orders")
        }
        setLoading(false)

    }

    //get total number of products
    const getProducts = async () => {

        try {
            const getProdsRef = collection(db, 'products')
            const q = query(getProdsRef)
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
            toast.error("currently can't get Products ")
        }
    }

    //get total number of customers
    const getCustomers = async () => {
        try {
            const getCustomerRef = collection(db, 'customers')
            const q = query(getCustomerRef)
            const querySnap = await getDocs(q)

            let customers = []
            querySnap.forEach((doc) => {
                return customers.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setCustomers(customers)
        }
        catch (error) {
            console.log({ error })
            toast.error("currently can't get customers ")
        }

    }

    const getTotalSales = async () => {
        setLoading(true)
        try {
            const getTotalRef = collection(db, 'orders')
            const q = query(getTotalRef, where("payment_status", "==", 'success'))
            const querySnap = await getDocs(q)

            let salesTotal = []
            querySnap.forEach((doc) => {
                return salesTotal.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            const sales = salesTotal.reduce((a, c) => a + c.data.order_total++, 0);
            setTotalSales(sales)

        }
        catch (error) {
            console.log({ error })
            toast.error("currently can't get your total sales")
        }
        setLoading(false)
    }



    useEffect(() => {

        if (isMounted) {
            getOrders().then()
            getProducts().then()
            getCustomers().then()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
        <>
            {loading ?
                (<DashSpinner />) : (
                    <>
                        <HandleScroll />
                        <div id="category-container" className="main-container">
                            <div className="dashboard-home">
                                <div className="dashboard-box">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="dashboard-card">
                                                <div className="dashboard-text">
                                                    <p className="title">Revenue</p>
                                                    <p className="sub-title revenue"> &#8358;{totalSales ? formatPrice(totalSales) : '0'}</p>
                                                </div>
                                                <div className="dashboard-icon gold-one">
                                                    <i className="fa-solid fa-file-invoice-dollar"></i>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="dashboard-card">
                                                <div className="dashboard-text">
                                                    <p className="title">Orders</p>
                                                    <p className="sub-title"> {orders && orders.length > 0 ? (`${formatString(orders.length)}`) : ('0')}</p>
                                                </div>
                                                <div className="dashboard-icon gold-one">
                                                    <i className="fa-solid fa-file-invoice"></i>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-3">
                                            <div className="dashboard-card">
                                                <div className="dashboard-text">
                                                    <p className="title">Products</p>
                                                    <p className="sub-title"> {products && products.length > 0 ? (`${formatString(products.length)}`) : ('0')}</p>
                                                </div>
                                                <div className="dashboard-icon gold-one">
                                                    <i className="fa-solid fa-cubes-stacked"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="dashboard-card">
                                                <div className="dashboard-text">
                                                    <p className="title">Customers</p>
                                                    <p className="sub-title">{customers && customers.length > 0 ? (`${formatString(customers.length)}`) : ('0')}</p>
                                                </div>
                                                <div className="dashboard-icon gold-one">
                                                    <i className="fa-solid fa-users"></i>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <DashStatistics />
                                <LatestOrders orders={orders} />
                            </div>
                        </div>
                    </>)}
        </>
    )
}

export default DashboardHome;