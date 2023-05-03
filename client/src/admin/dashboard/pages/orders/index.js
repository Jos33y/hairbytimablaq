import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import HandleScroll from "../../components/go-top";
import OrderBox from "./order-box";
import DashSpinner from "../../components/dash-spinner";
import { toast } from "react-toastify";

const OrderListPage = () => {

    const isMounted = useRef()
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([]) 


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

        }
        catch (error) {
            console.log({ error })
            toast.error("currently can't get your orders")
            setOrders([])
        }
        setLoading(false)

    }


    useEffect(() => {

        if (isMounted) {
            getOrders().then()
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
                        <div id="category-container" className="category-container">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="manage-product">
                                        <div className="form-container">
                                            <div className="form-header">
                                                <p className="title">Manage Orders</p>
                                                <p></p>
                                            </div>

                                            <hr />

                                            <div className="form-actions">
                                                <div className="row">
                                                    <div className="col-md-4">

                                                    </div>


                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <select defaultValue="all" className="form-control" id='productCategory'>
                                                                <option disabled={true}>Payment Status</option>
                                                                <option value='all'>Show All</option>
                                                                <option value="uncategorized">Payment Successful</option>
                                                                <option value="null">Awaiting Payment</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <select defaultValue="all" className="form-control">
                                                                <option disabled={true} >Delivery Status</option>
                                                                <option value='all'>Show All</option>
                                                                <option value="uncategorized">Shipped</option>
                                                                <option value="null">Not Shipped</option>
                                                                <option value="null">Delivered</option>
                                                            </select>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />

                                            <div className="order-list">
                                                {orders && orders.length > 0 ? (
                                                    <div className="row">
                                                        {orders.slice(0, 20).map((order) => ( // only include the first five orders in the array
                                                            <div key={order.id} className="col-md-6">
                                                                <OrderBox order={order.data} order_id={order.id} />
                                                            </div>
                                                        ))}

                                                    </div>

                                                ) : (
                                                    <div className="empty-box">
                                                        <h3>No Latest Orders</h3>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)}
        </>
    )
}

export default OrderListPage;