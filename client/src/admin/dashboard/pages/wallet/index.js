import React, { useEffect, useRef, useState } from "react";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "../../../../firebase.config";
import DashSpinner from "../../components/dash-spinner";
import HandleScroll from "../../components/go-top";
import { toast } from "react-toastify";

const WalletPage = () => {

    const isMounted = useRef()
    const [loading, setLoading] = useState(true);
    const [paymentInfo, setPaymentInfo] = useState(null)


    const fetchPaymentAccounts = async () => {

        setLoading(true);
        try {
            // const auth = getAuth()
            const payRef = collection(db, 'payment_accounts')
            const q = query(payRef, orderBy('timeStamp', 'desc'), limit(10))
            const querySnap = await getDocs(q)

            let paymentInfo = [];

            querySnap.forEach((doc) => {
                return paymentInfo.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setPaymentInfo(paymentInfo)
            console.log("payment info: ", paymentInfo)

        }
        catch (error) {
            toast.error("could not fetch payment accounts")
            console.log({ error })
        }
        setLoading(false)
    }


    useEffect(() => {

        if (isMounted) {

            fetchPaymentAccounts().then();
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
                                    <div className="wallet-dashboard">
                                        <div className="wallet-container">
                                            <div className="row">

                                                <div className="col-md-4">
                                                    <div className="wallet-box">
                                                        <div className="wallet-icon">
                                                            <i className="fa-solid fa-money-bill-trend-up"></i>
                                                        </div>
                                                        <div className="wallet-balance">
                                                            <p className="title">Confirmed Balance </p>
                                                            <p className="balance">&#8358; 21,900,000</p>

                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="wallet-box">
                                                        <div className="wallet-icon">
                                                            <i className="fa-solid fa-money-bill-transfer"></i>
                                                        </div>
                                                        <div className="wallet-balance">
                                                            <p className="title">Not Confirmed Balance </p>
                                                            <p className="balance">&#8358; 900,000</p>

                                                        </div>

                                                    </div>
                                                </div>


                                                <div className="col-md-4">
                                                    <div className="wallet-box">
                                                        <div className="wallet-icon">
                                                            <i className="fa-solid fa-money-bill-wave"></i>
                                                        </div>
                                                        <div className="wallet-balance">
                                                            <p className="title">Inavlid Balance </p>
                                                            <p className="balance">&#8358; 10,000</p>

                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="account-wallet">
                                            <div className="row">

                                                {paymentInfo && paymentInfo.length > 0 ? (

                                                    <>
                                                        {paymentInfo.map((payment_account) => (
                                                            <div key={payment_account.id} className="col-md-5">
                                                                <div className="account-box">
                                                                    <div className="account-box-one">
                                                                        <p className="name">Account Name:</p>
                                                                        <p className="name">Account Number:</p>
                                                                        <p className="name">Bank Name:</p>
                                                                    </div>

                                                                    <div className="account-box-one">
                                                                        <p className="name-two">{payment_account.data.accountName}</p>
                                                                        <p className="name-two">{payment_account.data.accountNumber}</p>
                                                                        <p className="name-two">{payment_account.data.bankName}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </>

                                                ) : (
                                                    <div className="col-md-5">
                                                        <div className="empty-box">
                                                            <h3>No Payment Account Added</h3>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default WalletPage;