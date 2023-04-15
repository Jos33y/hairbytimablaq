import { Link } from "react-router-dom";
import TimaBlaq from "../../../store/assets/images/timablaq.jpeg";

const SideBar = () => {
    return (
        <>
            <div id="side-bar" className="side-bar">
                <div className="sidebar-container">
                    <div id="sidebar-profile" className="sidebar-profile">
                        <div className="sidebar-admin">
                            <div className="sidebar-image">
                                <img src={TimaBlaq} alt="sidebar profile" className="img-fluid" />
                            </div>
                            <div className="sidebar-admin-info">
                                <p className="name">Lagbalu </p>
                                <p className="role">Administrator </p>
                            </div>
                        </div>

                        <div className="sidebar-mini">
                            <ul>
                                <li>
                                    <button className="btn btn-secondary"> <i className="fa-solid fa-moon"></i> </button>
                                </li>

                                <li>
                                    <button className="btn btn-secondary"> <i className="fa-solid fa-bell"></i> </button>
                                </li>

                                <li>  <button className="btn btn-secondary"> <i className="fa-solid fa-gear"></i> </button> </li>                    </ul>
                        </div>
                        <hr />
                    </div>



                    <div className="sidebar-nav">
                        <nav>
                            <ul className="sidebar-menu">
                                {/* dashboard menu */}
                                <li className="menu-item active">
                                    <Link to="/admin/dashboard/home" className="menu-link">
                                        <i className="fa-solid fa-house"></i>
                                        <span className="sidebar-text">Dashboard</span>
                                    </Link>
                                </li>

                                {/* categories menu */}
                                <li className="menu-item">
                                    <Link to="/admin/dashboard/home" className="menu-link">
                                        <i className="fa-solid fa-layer-group"></i>
                                        <span className="sidebar-text">Categories</span>
                                    </Link>
                                </li>

                                {/* delivery fees menu */}
                                <li className="menu-item">
                                    <Link to="/admin/dashboard/home" className="menu-link">
                                        <i className="fa-solid fa-dolly"></i>
                                        <span className="sidebar-text">Delivery Fees</span>
                                    </Link>
                                </li>


                                {/* add product menu */}
                                <li className="menu-item">
                                    <Link to="/admin/dashboard/home" className="menu-link">
                                        <i className="fa-solid fa-square-plus"></i>
                                        <span className="sidebar-text">Add Product</span>
                                    </Link>
                                </li>

                                {/* view product menu */}
                                <li className="menu-item">
                                    <Link to="/admin/dashboard/home" className="menu-link">
                                        <i className="fa-solid fa-boxes-stacked"></i>
                                        <span className="sidebar-text">Products</span>
                                    </Link>
                                </li>

                                {/* orders menu */}
                                <li className="menu-item">
                                    <Link to="/admin/dashboard/home" className="menu-link">
                                        <i className="fa-solid fa-folder-tree"></i>
                                        <span className="sidebar-text">Orders</span>
                                    </Link>
                                </li>

                                {/* customers menu */}
                                <li className="menu-item">
                                    <Link to="/admin/dashboard/home" className="menu-link">
                                        <i className="fa-solid fa-users-line"></i>
                                        <span className="sidebar-text">Customers </span>
                                    </Link>
                                </li>


                                {/* transactions menu */}
                                <li className="menu-item">
                                    <Link to="/admin/dashboard/home" className="menu-link">
                                        <i className="fa-solid fa-money-bill-transfer"></i>
                                        <span className="sidebar-text">Transactions </span>
                                    </Link>
                                </li>

                                {/* wallet menu */}
                                <li className="menu-item">
                                    <Link to="/admin/dashboard/home" className="menu-link">
                                        <i className="fa-solid fa-wallet"></i>
                                        <span className="sidebar-text">Wallet </span>
                                    </Link>
                                </li>

                                <hr />

                                {/* view store menu */}
                                <li className="menu-item">
                                    <Link to="/admin/dashboard/home" className="menu-link">
                                        <i className="fa-solid fa-shop"></i>
                                        <span className="sidebar-text">View Store</span>
                                    </Link>
                                </li>

                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SideBar;