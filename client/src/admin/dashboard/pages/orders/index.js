import HandleScroll from "../../components/go-top";
import OrderBox from "./order-box";

const OrderListPage = () => {
    return (
        <>
       
            <HandleScroll />
            <div id="category-container" className="category-container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="manage-product">
                            <div className="form-container">
                                <div className="form-header">
                                    <p className="title">Manage Orders</p>
                                    <p></p>
                                </div>

                                <hr />

                                <div className="form-actions">
                                    <div className="row">
                                        <div className="col-md-4">

                                        </div>


                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <select className="form-control" id='productCategory'>
                                                    <option disabled={true} selected value="status">Payment Status</option>
                                                    <option value='all'>Show All</option>
                                                    <option value="uncategorized">Payment Successful</option>
                                                    <option value="null">Awaiting Payment</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <select className="form-control">
                                                    <option disabled={true} selected value="status">Delivery Status</option>
                                                    <option value='all'>Show All</option>
                                                    <option value="uncategorized">Shipped</option>
                                                    <option value="null">Not Shipped</option>
                                                    <option value="null">Delivered</option>
                                                </select>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div className="order-list">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <OrderBox />
                                        </div>


                                        <div className="col-md-6">
                                            <OrderBox />
                                        </div>

                                        <div className="col-md-6">
                                            <OrderBox />
                                        </div>

                                        <div className="col-md-6">
                                            <OrderBox />
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

export default OrderListPage;