import DashStatistics from "./dash-statistics";
import LatestOrders from "./latest-orders";

const DashboardHome = () => {
    return (
        <>
            <div className="main-container">
                <div className="dashboard-home">
                    <div className="dashboard-box">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <div className="dashboard-icon blue-one">
                                        <i class="fa-solid fa-money-bills"></i>
                                    </div>
                                    <div className="dashboard-text">
                                        <p className="title">Total Sales</p>
                                        <p className="sub-title"> &#8358; 23,000.00</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <div className="dashboard-icon green-one">
                                        <i class="fa-solid fa-truck-fast"></i>
                                    </div>
                                    <div className="dashboard-text">
                                        <p className="title">Total Orders</p>
                                        <p className="sub-title"> 3</p>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-4">
                                <div className="dashboard-card">
                                    <div className="dashboard-icon peach-one">
                                        <i class="fa-solid fa-cubes-stacked"></i>
                                    </div>
                                    <div className="dashboard-text">
                                        <p className="title">Total Produts</p>
                                        <p className="sub-title"> 23</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DashStatistics />
                    <LatestOrders />
                </div>
            </div>
        </>
    )
}

export default DashboardHome;