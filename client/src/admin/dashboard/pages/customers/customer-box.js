import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import UserProfile from "../../assets/images/default-user.png";

const CustomerBox = ({ customer }) => {

    const isMounted = useRef()
    const [customerData, setCustomerData] = useState("");


    const getCustomer = async () => {

        const customerRef = doc(db, 'customers', `${customer.customer_id}`, 'shipping', `${customer.shipping_id}`)
        const customerSnap = await getDoc(customerRef)
        if (customerSnap.exists()) {
            setCustomerData(customerSnap.data())

        }
    }


    useEffect(() => {
        if (isMounted) {
            getCustomer().then()

        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
        <>
            <div className="customer-box">
                <div className="customer-info">
                    <div className="customer-img">
                        <img src={UserProfile} alt="customer" className="img-fluid" />
                    </div>
                    <div className="customer-details">
                        <p className="name">{customerData ? (`${customerData.last_name} ${customerData.first_name}`) : ('')}</p>
                        <p className="email"> {customerData ? (`${customerData.contact_info}`) : ('')}  </p>
                        <p className="email"> {customerData ? (`${customerData.delivery_phone}`) : ('')} </p>
                    </div>

                </div>
                <div className="customer-status">
                    <p className="date"> {customerData ? (`${customerData.timeStamp.toDate().toLocaleDateString().replace(/\//g, "-")}`) : ('')} </p>
                    <p> <button className="btn btn-md active">Active </button> </p>
                </div>
            </div>
        </>
    )
}

export default CustomerBox;