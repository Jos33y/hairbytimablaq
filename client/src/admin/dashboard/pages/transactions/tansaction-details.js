import ProdOne from "../../../../store/assets/products/prod-1.jpeg";
import HandleScroll from "../../components/go-top";

const TransactionDetailsPage = () => {
    return (
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
                                    <p className="date"><i className="fa-solid fa-calendar-day"></i> 3/4/2023, 6:31:08 AM </p>
                                    <p className="order-id"> Trans ID: 50523438</p>
                                    <p className="order-id"> Order ID: 50523438</p>
                                </div>

                                <div className="form-actions">
                                    <div className="row">
                                        <div className="col-md-6">

                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group order-form">
                                                <select className="form-control">
                                                    <option disabled={true} selected value="status">Change Transaction Status</option>
                                                    <option value="uncategorized">Confirmed</option>
                                                    <option value="null">Not Confirmed</option>
                                                    <option value="null">Invalid Transaction</option>
                                                </select>
                                                <button className="btn btn-md btn-secondary">Save </button>
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
                                                    <p className="info-text">Joshua Kingston</p>
                                                    <p className="info-text">Amount: <span className="amount-paid">&#8358; 400,000 </span> </p>
                                                    <p className="info-text">Trans Status: <span className="status processing"> Not Confirmed</span> </p>
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
                                                    <p className="info-text">Joseph Lagbalu</p>
                                                    <p className="info-text">3099275203</p>
                                                    <p className="info-text">First Bank of Nigeria</p>
                                
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
                                                    <img src={ProdOne}  alt="receipt" class="img-fluid" />
                                                    </div>

                                                    <button class="btn btn-md btn-primary">View receipt</button>
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
        </>
    )
}

export default TransactionDetailsPage;