import React from "react";
import TransactionBox from "./transaction-box";
import HandleScroll from "../../components/go-top";

const TransactionListPage = () => {

    
    return (
        <>
        <HandleScroll />
            <div id="category-container"  className="category-container" >
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
                                                <select className="form-control" id='productCategory'>
                                                    <option disabled={true} selected value="status">Transaction Status</option>
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
                                    <div className="row">
                                        <div className="col-md-6">
                                            <TransactionBox />
                                        </div>

                                        <div className="col-md-6">
                                            <TransactionBox />
                                        </div>

                                        <div className="col-md-6">
                                            <TransactionBox />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionListPage;