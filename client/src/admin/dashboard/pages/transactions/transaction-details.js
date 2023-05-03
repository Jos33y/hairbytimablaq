import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config"
import HandleScroll from "../../components/go-top";
import DashSpinner from "../../components/dash-spinner";
import formatPrice from "../../components/format-price";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const TransactionDetailsPage = () => {

    const location = useLocation();
    const isMounted = useRef()
    const MySwal = withReactContent(Swal)
    const [isDisabled, setIsDisbaled] = useState(false)
    const [loading, setLoading] = useState(true)
    const [transactionData, setTransactionData] = useState([])
    const [paymentStatus, setPaymentStatus] = useState("");
    const [contactEmail, setContactEmail] = useState("");



    const fetchTransactionDetails = async () => {
        setLoading(true)

        try {
            const docRef = doc(db, 'transactions', location.state.payment_id)
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setTransactionData(docSnap.data())
                fetchCustomers(docSnap.data().orderId);
                setPaymentStatus(`${docSnap.data().paymentStatus}`)

            } else {
                console.log("no transaction found");
                //setLoading(false)
            }
        }
        catch (error) {
            console.log({ error })
        }

        setLoading(false)

    }

    const getPaymentStatus = () => {
        let payment_status;
        if (transactionData.paymentStatus === 'processing') {
            payment_status = "Not Confirmed";
        } else if (transactionData.paymentStatus === 'success') {
            payment_status = "Confirmed";

        } else if (transactionData.paymentStatus === 'pending') {
            payment_status = "Awaiting Payment";

        }
        else if (transactionData.paymentStatus === 'failed') {
            payment_status = "Rejected";
        }

        return payment_status;
    }


    const handleChanges = async () => {
        setIsDisbaled(true)
        try {

            MySwal.fire({
                title: 'Do you want to update this payment?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update it!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const updateOrder = {
                        payment_status: `${paymentStatus}`,
                    }
                    const updatePayment = {
                        paymentStatus: `${paymentStatus}`,
                    }

                    const paymentDataRef = doc(db, 'transactions', `${location.state.payment_id}`)
                    await updateDoc(paymentDataRef, updatePayment)
                    const orderDataRef = doc(db, 'orders', `${transactionData.orderId}`)
                    await updateDoc(orderDataRef, updateOrder)
                    if(paymentStatus === 'success') {
                        sendConfirmationEmail();
                    }
                    Swal.fire(
                        'Updated!',
                        'payment status has been updated.',
                        'success'
                    )
                    fetchTransactionDetails().then();
                }
            })


        }
        catch (error) {
            console.log({ error })
        }
        setIsDisbaled(false)
    }


    const sendConfirmationEmail = async () => {

        fetch('/order-confirmed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: contactEmail,
                from: 'support@hairbytimablaq.com',
                subject: 'Order Confirmed!',
                order_id: transactionData.orderId,
            }),
        })
            .then((response) => {
                if (response.ok) {

                }
            })
            .catch((error) => {
                console.error(error);
            });

    }


    const fetchCustomers = async (order_id) => {

        setLoading(true)

        const docRef = doc(db, 'orders', order_id)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const customersRef = doc(db, 'customers', docSnap.data().customer_id)
            const customerSnap = await getDoc(customersRef)

            if (customerSnap.exists()) {

                if (customerSnap.data().contact_mode === 'email') {
                    setContactEmail(customerSnap.data().contact_info)
                }
            }
            else {
                console.log('no customer data')
            }

            setLoading(false)

        }

    }


    const onChange = (e) => {

        setPaymentStatus(e.target.value)
    }

    useEffect(() => {
        if (isMounted) {

            fetchTransactionDetails().then()

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
                                                <p className="title">Transaction Details</p>
                                                <p></p>
                                            </div>

                                            <hr />

                                            <div className="order-header">
                                                <p className="date"><i className="fa-solid fa-calendar-day"></i> {`${transactionData.timeStamp.toDate().toLocaleString()}`} </p>
                                                <p className="order-id"> Trans ID: {transactionData ? (transactionData.payment_id) : ('')} </p>
                                                <p className="order-id"> Order ID: {transactionData ? (transactionData.orderId) : ('')}</p>
                                            </div>

                                            <div className="form-actions">
                                                <div className="row">
                                                    <div className="col-md-6">

                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group order-form">
                                                            <select value={paymentStatus}
                                                                onChange={onChange}
                                                                className="form-control">
                                                                <option disabled={true} >Change Transaction Status</option>
                                                                <option value="success">Confirmed</option>
                                                                <option value="processing">Not Confirmed</option>
                                                                <option value="failed">Invalid Transaction</option>
                                                            </select>
                                                            <button disabled={isDisabled} onClick={handleChanges} className="btn btn-md btn-secondary">
                                                                {isDisabled ? ('Saving...') : ('Save')}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />

                                            <div className="order-info">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="info-box">
                                                            <div className="info-box-icon">
                                                                <i className="fa-solid fa-circle-user"></i>
                                                            </div>
                                                            <div className="info-box-inner">
                                                                <p className="info-title">Account Paid From</p>
                                                                <p className="info-text">{`${transactionData.customerName}`}</p>
                                                                <p className="info-text">{`${transactionData.customerBank}`}</p>
                                                                <p className="info-text">Amount: <span className="amount-paid">&#8358;{formatPrice(Number(transactionData.amountPaid))} </span> </p>
                                                                <p className="info-text">Trans Status: <span className={`status ${transactionData.paymentStatus}`}> {getPaymentStatus()} </span> </p>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="info-box">
                                                            <div className="info-box-icon">
                                                                <i className="fa-solid fa-building-columns"></i>
                                                            </div>
                                                            <div className="info-box-inner">
                                                                <p className="info-title">Bank Transfer To</p>
                                                                <p className="info-text">{`${transactionData.accountName}`}</p>
                                                                <p className="info-text">{`${transactionData.accountNumber}`}</p>
                                                                <p className="info-text">{`${transactionData.bankName}`}</p>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="info-box">
                                                            <div className="info-box-icon">
                                                                <i className="fa-solid fa-file-invoice"></i>
                                                            </div>
                                                            <div className="info-box-inner info-box-img">
                                                                <p className="info-title">Payment Receipt</p>
                                                                <div className="receipt-img">
                                                                    <img src={transactionData.paymentReceipt ? (`${transactionData.paymentReceipt}`) : ('https://placehold.jp/70x70.png')} alt="receipt" className="img-fluid" />
                                                                </div>

                                                                <Link to={`${transactionData.paymentReceipt}`} target="_blank" className="btn btn-md btn-primary">View receipt</Link>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                            <hr />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)}
        </>
    )
}

export default TransactionDetailsPage;