import ProdOne from "../assets/products/prod-1.jpeg";

const CheckOutOrderSummary = () => {
    return (
        <>
            <div className="order-container">
                <div className="coupon-container">
                    <div className="form-group">
                        <label className="form-label">Coupon Code </label>
                        <div className="form-inline">
                            <input type="text" placeholder="Enter coupon code" className="form-control" />
                            <button className="btn btn-md btn-primary"> Apply </button>
                        </div>
                    </div>
                </div>


                <div className="order-summary">

                    <div className="prod-summary">
                        <div className="prod-summary-details">
                            <div className="prod-details">
                                <div className="prod-image">
                                    <img src={ProdOne} alt="mini product" className="img-fluid" />
                                </div>
                                <div className="prod-description">
                                    <p className="prod-name">Layered raw wig </p>
                                    <p className="prod-qty">X 2</p>
                                </div>

                            </div>
                            <div className="prod-prices">
                                <p className="price">₦16,000.00</p>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="order-summary-table">
                        <div className="order-summary-list">
                            <p className="sub-total">Subtotal</p>
                            <p className="sub-total">₦16,000.00</p>
                        </div>
                        <hr />
                        <div className="order-summary-list">
                            <p className="sub-total">Shipping</p>
                            <p className="sub-total">₦16,000.00</p>
                        </div>

                        <hr />
                        <div className="order-summary-list">
                            <p className="total">Total</p>
                            <p className="total">₦16,000.00</p>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );

}

export default CheckOutOrderSummary;