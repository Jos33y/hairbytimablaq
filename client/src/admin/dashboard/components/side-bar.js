import { Link } from "react-router-dom";
import TimaBlaq from "../assets/images/timablaq.jpeg";

const SideBar = ({ pageName }) => {
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
                                <li className={`menu-item ${pageName === 'home' ? 'active' : ''}`}>
                                    <Link to="/admin/dashboard/home" className="menu-link">
                                        <i className="fa-solid fa-house"></i>
                                        <span className="sidebar-text">Dashboard</span>
                                    </Link>
                                </li>

                                {/* categories menu */}
                                <li className={`menu-item ${pageName === 'categories' ? 'active' : ''}`}>
                                    <Link to="/admin/dashboard/categories" className="menu-link">
                                        <i className="fa-solid fa-layer-group"></i>
                                        <span className="sidebar-text">Categories</span>
                                    </Link>
                                </li>

                                {/* delivery fees menu */}
                                <li className={`menu-item ${pageName === 'deliveries' ? 'active' : ''}`}>
                                    <Link to="/admin/dashboard/deliveries" className="menu-link">
                                        <i className="fa-solid fa-dolly"></i>
                                        <span className="sidebar-text">Delivery Fees</span>
                                    </Link>
                                </li>


                                {/* add product menu */}
                                <li className={`menu-item ${pageName === 'add-product' ? 'active' : ''}`}>
                                    <Link to="/admin/dashboard/add-product" className="menu-link">
                                        <i className="fa-solid fa-square-plus"></i>
                                        <span className="sidebar-text">Add Product</span>
                                    </Link>
                                </li>

                                {/* view product menu */}
                                <li className={`menu-item ${pageName === 'products' ? 'active' : ''}`}>
                                    <Link to="/admin/dashboard/products" className="menu-link">
                                        <i className="fa-solid fa-boxes-stacked"></i>
                                        <span className="sidebar-text">Products</span>
                                    </Link>
                                </li>

                                {/* orders menu */}
                                <li className={`menu-item ${pageName === 'orders' ? 'active' : ''}`}>
                                    <Link to="/admin/dashboard/orders" className="menu-link">
                                        <i className="fa-solid fa-folder-tree"></i>
                                        <span className="sidebar-text">Orders</span>
                                    </Link>
                                </li>

                                {/* customers menu */}
                                <li className={`menu-item ${pageName === 'customers' ? 'active' : ''}`}>
                                    <Link to="/admin/dashboard/customers" className="menu-link">
                                        <i className="fa-solid fa-users-line"></i>
                                        <span className="sidebar-text">Customers </span>
                                    </Link>
                                </li>


                                {/* transactions menu */}
                                <li className={`menu-item ${pageName === 'transactions' ? 'active' : ''}`}>
                                    <Link to="/admin/dashboard/transactions" className="menu-link">
                                        <i className="fa-solid fa-money-bill-transfer"></i>
                                        <span className="sidebar-text">Transactions </span>
                                    </Link>
                                </li>

                                {/* wallet menu */}
                                <li className={`menu-item ${pageName === 'wallet' ? 'active' : ''}`}>
                                    <Link to="/admin/dashboard/wallet" className="menu-link">
                                        <i className="fa-solid fa-wallet"></i>
                                        <span className="sidebar-text">Wallet </span>
                                    </Link>
                                </li>

                                {/* wallet menu */}
                                <li className={`menu-item ${pageName === 'profile-settings' ? 'active' : ''}`}>
                                    <Link to="/admin/dashboard/profile-settings" className="menu-link">
                                    <i class="fa-solid fa-user-gear"></i>
                                        <span className="sidebar-text">Profile Settings </span>
                                    </Link>
                                </li>

                                {/* wallet menu */}
                                <li className={`menu-item ${pageName === 'payment-account' ? 'active' : ''}`}>
                                    <Link to="/admin/dashboard/payment-account" className="menu-link">
                                    <i class="fa-solid fa-money-check"></i>
                                        <span className="sidebar-text">Payment Account </span>
                                    </Link>
                                </li>


                                {/* wallet menu */}
                                <li className={`menu-item ${pageName === 'moderators' ? 'active' : ''}`}>
                                    <Link to="/admin/dashboard/moderators" className="menu-link">
                                    <i class="fa-solid fa-user-pen"></i>
                                        <span className="sidebar-text">Moderators </span>
                                    </Link>
                                </li>

                                {/* wallet menu */}
                                <li className={`menu-item ${pageName === 'store-settings' ? 'active' : ''}`}>
                                    <Link to="/admin/dashboard/store-settings" className="menu-link">
                                    <i class="fa-solid fa-toolbox"></i>
                                        <span className="sidebar-text">Store Settings </span>
                                    </Link>
                                </li>

                                <hr />

                                {/* view store menu */}
                                <li className="menu-item">
                                    <Link to="/" className="menu-link">
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