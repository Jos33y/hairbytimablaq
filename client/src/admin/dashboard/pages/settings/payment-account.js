
const PaymentAccount = () => {
    return (
        <>
            <div className="category-container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="add-category">
                            <div className="form-container">
                                <div className="form-header">
                                    <p className="title">Add Payment Account</p>
                                    <button className="btn btn-primary">View Accounts</button>
                                </div>

                                <form>
                                    <div className="form-group">
                                        <label className="form-label">Account Name </label>
                                        <input type="text" className="form-control" placeholder="John Doe" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Account Number </label>
                                        <input type="text" className="form-control" placeholder="0123456789" required={true} />
                                    </div>


                                    <div className="form-group">
                                        <label className="form-label">Bank Name </label>
                                        <input type="text" className="form-control" placeholder="First Bank Nigeria" required={true} />
                                    </div>



                                    <div className="form-group form-button">
                                        <button className="btn btn-primary"> Save Payment </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="view-category">
                            <div className="form-container">
                                <div className="form-header">
                                    <p className="title">Payment Accounts</p>
                                    <button className="btn btn-primary">Add Payment</button>
                                </div>

                                <div className="payment-list">
                                    <hr />
                                    <div className="payment-list-box">
                                        <div className="payment-list-details">
                                            <p className="date">20th March, 2023 </p>
                                            <p className="name">Joseph Lagbalu </p>
                                            <p className="name">3099275203 </p>
                                            <p className="name">First Bank of Nigeria</p>
                                        </div>
                                        <div className="payment-list-buttons">
                                            <p> <button className="btn btn-md btn-primary">Edit </button> </p>
                                            <p> <button className="btn btn-md btn-danger">Delete </button> </p>
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

export default PaymentAccount;