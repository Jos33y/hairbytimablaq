import ProdOne from "../../../../store/assets/products/prod-1.jpeg";
import HandleScroll from "../../components/go-top";

const OrderDetailsPage = () => {
    return (
        <>
        <HandleScroll />
            <div id="category-container" className="category-container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="manage-product">
                            <div className="form-container">
                                <div className="form-header">
                                    <p className="title">Order Details</p>
                                    <p></p>
                                </div>

                                <hr />

                                <div className="order-header">
                                    <p className="date"><i class="fa-solid fa-calendar-day"></i> 3/4/2023, 6:31:08 AM </p>
                                    <p className="order-id"> Order ID: 50523438</p>
                                </div>

                                <div className="form-actions">
                                    <div className="row">
                                        <div className="col-md-7">

                                        </div>
                                        <div className="col-md-5">
                                            <div className="form-group order-form">
                                                <select className="form-control">
                                                    <option disabled={true} selected value="status">Change Delivery Status</option>
                                                    <option value="uncategorized">Shipped</option>
                                                    <option value="null">Not Shipped</option>
                                                    <option value="null">Delivered</option>
                                                </select>
                                                <button className="btn btn-md btn-secondary">Save </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div className="order-info">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="info-box">
                                                <div className="info-box-icon">
                                                    <i class="fa-solid fa-user"></i>
                                                </div>
                                                <div className="info-box-inner">
                                                    <p className="info-title">Customer Info</p>
                                                    <p className="info-text">Joshua Kingston</p>
                                                    <p className="info-text">kingstonjosh@gmail.com</p>
                                                    <p className="info-text">08098765432</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-4">
                                            <div className="info-box">
                                                <div className="info-box-icon">
                                                    <i class="fa-solid fa-truck-fast"></i>
                                                </div>
                                                <div className="info-box-inner">
                                                    <p className="info-title">Order info</p>
                                                    <p className="info-text">Shipping: Lagos to Owerri</p>
                                                    <p className="info-text">Pay method: Bank Transfer</p>
                                                    <p className="info-text">Payment: <span className="status success"> Success</span> </p>
                                                    <p className="info-text">Shipping: <span className="status pending"> Not Shipped</span> </p>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="col-md-4">
                                            <div className="info-box">
                                                <div className="info-box-icon">
                                                    <i class="fa-solid fa-location-dot"></i>
                                                </div>
                                                <div className="info-box-inner">
                                                    <p className="info-title">Deliver to</p>
                                                    <p className="info-text">Street: 2276 Tedesca Drive</p>
                                                    <p className="info-text">City: Nnewi</p>
                                                    <p className="info-text">State: Enugu</p>
                                                    <p className="info-text">Country: Nigeria</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div className="product-ordered">
                                    <div className="prod-ordered-info">
                                        <div className="prod-ordered-one">
                                            <div className="prod-ordered-img">
                                                <img src={ProdOne} className="img-fluid" alt="" />
                                            </div>
                                            <div className="prod-ordered-details">
                                                <p className="prod-name"> Raw Layered hd frontal wig</p>
                                                <p className="prod-price"> &#8358;200,000 X 3</p>
                                            </div>
                                        </div>

                                        <div className="prod-ordered-two">
                                            <p className="total-price"> &#8358;400,000</p>
                                        </div>
                                    </div>

                                    <hr />
                                    <div className="shipping-info">
                                        <p className="light-text">Sub total: </p>
                                        <p className="bold-text">&#8358;400,000 </p>
                                    </div>
                                    <div className="shipping-info">
                                        <p className="light-text">Shipping cost: </p>
                                        <p className="bold-text">&#8358;30,000 </p>
                                    </div>

                                    <hr />

                                    <div className="shipping-info">
                                        <p className="light-text big-total">Total: </p>
                                        <p className="bold-text big-total">&#8358;430,000 </p>
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

export default OrderDetailsPage;