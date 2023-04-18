import React, { useEffect } from "react";
import TransactionBox from "./transaction-box";

const TransactionListPage = () => {


    const handleClickScroll = () => {
        const element = document.getElementById('category-container');
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollTo(0, 1000);
        }
      };

    
    useEffect(() => {
        
        handleClickScroll();
        window.scrollTo(0, 1000);
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
            <div id="category-container" className="category-container">
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