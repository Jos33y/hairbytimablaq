import OrderBox from "../orders/order-box";

const LatestOrders = ({ orders }) => {
    return (
        <>
            <div className="dashboard-latest-orders">
                <h3 className="title">Latest Orders</h3>
                <hr />
                <div className="dash-latest-orders">
                    <div className="order-list">

                        {orders && orders.length > 0 ? (
                            <div className="row">
                                 {orders.slice(0, 5).map((order) => ( // only include the first five orders in the array
                                    <div key={order.id} className="col-md-6">
                                        <OrderBox order={order.data} order_id={order.id} />
                                    </div>
                                ))}

                            </div> 

                        ) : (
                            <div className="empty-box">
                                <h3>No Latest Orders</h3>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </>
    )
}
export default LatestOrders;