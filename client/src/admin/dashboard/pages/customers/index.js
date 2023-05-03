import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../../firebase.config";
import { collection, getDocs, query } from "firebase/firestore";
import HandleScroll from "../../components/go-top";
import CustomerBox from "./customer-box";
import { toast } from "react-toastify";
import DashSpinner from "../../components/dash-spinner";

const CustomersListPage = () => {

    const isMounted = useRef()
    const [loading, setLoading] = useState(true)
    const [customers, setCustomers] = useState([]);




    //get total number of customers
    const getContacts = async () => {
        setLoading(true);
        try {
            const getCustomerRef = collection(db, "customers");
            const q = query(getCustomerRef);
            const querySnap = await getDocs(q);

            let customers = [];
            querySnap.forEach((doc) => {
                const data = doc.data();
                if (data.shipping_id) { // check if the customer has a shipping_id field
                    customers.push({
                        id: doc.id,
                        data: data,
                    });
                }
            });
            setCustomers(customers);
        } catch (error) {
            console.log({ error });
            toast.error("currently can't get customers ");
        }

        setLoading(false);
    };





    useEffect(() => {

        if (isMounted) {

            getContacts().then()
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
                                                <p className="title">Customers List</p>
                                                <p> </p>
                                            </div>

                                            <hr />

                                            <div className="form-actions">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="form-group">
                                                            <input className="form-control" type="text" placeholder="Search customers..." />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">

                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="form-group">
                                                            <select className="form-control"
                                                                id='productCategory'>
                                                                <option value='all'>Show 20</option>
                                                                <option value='all'>Show 30</option>
                                                                <option value='all'>Show 40</option>
                                                                <option value='all'>Show 50</option>

                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />

                                            <div className="customers-list">
                                                {customers && customers.length > 0 ? (
                                                    <div className="row">
                                                        {customers.slice(0, 20).map((customer) => ( // only include the first twenty customers in the array
                                                            <div key={customer.id} className="col-md-6">
                                                                <CustomerBox customer={customer.data} />
                                                            </div>
                                                        ))}


                                                    </div>

                                                ) : (
                                                    <div className="empty-box">
                                                        <h3>No Customers</h3>
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

export default CustomersListPage;