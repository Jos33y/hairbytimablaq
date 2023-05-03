import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import TransactionBox from "./transaction-box";
import HandleScroll from "../../components/go-top";
import DashSpinner from "../../components/dash-spinner";
import { toast } from "react-toastify";

const TransactionListPage = () => {

    const isMounted = useRef()
    const [loading, setLoading] = useState(true)
    const [transactions, setTransactions] = useState(null)


    //get total number of orders 
    const getTransactions = async () => {
        setLoading(true)

        try {
            const getTransactionsRef = collection(db, 'transactions')
            const q = query(getTransactionsRef)
            const querySnap = await getDocs(q)

            let transactions = []
            querySnap.forEach((doc) => {
                return transactions.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setTransactions(transactions)

        }
        catch (error) {
            console.log({ error })
            toast.error("currently can't get your transactions")
            setTransactions([])
        }
        setLoading(false)

    }


    useEffect(() => {

        if (isMounted) {
            getTransactions().then()
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
                        <div id="category-container" className="category-container" >
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="manage-product">
                                        <div className="form-container">
                                            <div className="form-header">
                                                <p className="title">Manage Transactions</p>
                                                <p></p>
                                            </div>

                                            <hr />

                                            <div className="form-actions">
                                                <div className="row">
                                                    <div className="col-md-7">

                                                    </div>


                                                    <div className="col-md-5">
                                                        <div className="form-group">
                                                            <select defaultValue="all" className="form-control" id='productCategory'>
                                                                <option disabled={true}  >Transaction Status</option>
                                                                <option value='all'>Show All</option>
                                                                <option value="uncategorized">Confirmed Payment</option>
                                                                <option value="null">Not Confirmed Payment</option>
                                                                <option value="null">Invalid Payment</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <hr />

                                            <div className="order-list">
                                                {transactions && transactions.length > 0 ? (
                                                    <div className="row">
                                                        {transactions.map((transaction) => ( // only include the first five orders in the array
                                                            <div key={transaction.id} className="col-md-6">
                                                                <TransactionBox transaction_id={transaction.id} transaction={transaction.data} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="empty-box">
                                                        <h3>No Latest Transactions</h3>
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

export default TransactionListPage;