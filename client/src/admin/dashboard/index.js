
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/dashboard.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { getAuth } from "firebase/auth";
import DashSpinner from "./components/dash-spinner";
import DashboardHome from "./pages/home";
import TopBar from "./components/top-bar";
import SideBar from "./components/side-bar";
import CategoriesPage from "./pages/categories";
import DeliveryPage from "./pages/deliveries";
import AddProductPage from "./pages/products/add-product";
import ProductListPage from "./pages/products";
import EditProductPage from "./pages/products/edit-product";
import ProductDetailsPage from "./pages/products/product-details";
import OrderListPage from "./pages/orders";
import OrderDetailsPage from "./pages/orders/order-details";
import CustomersListPage from "./pages/customers";
import TransactionListPage from "./pages/transactions";
import TransactionDetailsPage from "./pages/transactions/tansaction-details";
import WalletPage from "./pages/wallet";
import ProfileSettings from "./pages/settings/profile-settings";
import PaymentAccount from "./pages/settings/payment-account";
import AccountModerators from "./pages/settings/account-moderators";
import StoreSettings from "./pages/settings";

const AdminDashboard = () => {

    const auth = getAuth()
    const isMounted = useRef()
    const params = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    // eslint-disable-next-line
    const [profileData, setProfileData] = useState(null)



    // get user function 
    const getUser = async () => {
        setLoading(true)
        const profileRef = doc(db, 'admins', auth.currentUser.uid)
        const profileSnap = await getDoc(profileRef)

        if (profileSnap.exists()) {
            // console.log("profile data", profileSnap.data())
            // console.log("Params Name:", params.dash_url)
            setProfileData(profileSnap.data())
        }
        else {
            navigate("/admin/login") 
        }

        setLoading(false)
    }


    const pages = () => {

        if (params.dash_url === "home") {
            return <DashboardHome userId={auth.currentUser.uid} />
        }
        else if (params.dash_url === "categories") {
            return <CategoriesPage userId={auth.currentUser.uid} />
        }

        else if (params.dash_url === "deliveries") {
            return <DeliveryPage userId={auth.currentUser.uid} />
        }
        else if (params.product_url === "add") {
            return <AddProductPage userId={auth.currentUser.uid} />
        }

        else if (params.product_url === "manage") {
            return <ProductListPage userId={auth.currentUser.uid} />
        }

        else if (params.product_url === "edit") {
            return <EditProductPage userId={auth.currentUser.uid} />
        }

        else if (params.product_url === "details") {
            return <ProductDetailsPage userId={auth.currentUser.uid} />
        }

        else if (params.dash_url === "orders") {
            return <OrderListPage userId={auth.currentUser.uid} />
        }
        else if (params.dash_url === "order-details") {
            return <OrderDetailsPage userId={auth.currentUser.uid} />
        }

        else if (params.dash_url === "customers") {
            return <CustomersListPage userId={auth.currentUser.uid} />
        }

        else if (params.dash_url === "transactions") {
            return <TransactionListPage userId={auth.currentUser.uid} />
        }

        else if (params.dash_url === "transaction-details") {
            return <TransactionDetailsPage userId={auth.currentUser.uid} />
        }

        else if (params.dash_url === "wallet") {
            return <WalletPage userId={auth.currentUser.uid} />
        }

      
        else if (params.settings_url === "profile") {
            return <ProfileSettings userId={auth.currentUser.uid} profileData={profileData} />
        }

        else if (params.settings_url === "moderators") {
            return <AccountModerators userId={auth.currentUser.uid} />
        }
        else if (params.settings_url === "store") {
            return <StoreSettings userId={auth.currentUser.uid} />
        }
        else if (params.settings_url === "account") {
            return <PaymentAccount userId={auth.currentUser.uid} />
        }

    }


    useEffect(() => {
        if (isMounted) {
            getUser().then()

            window.scrollTo(0, 0);
        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, auth.currentUser.uid])



    return (
        <>
            {loading ?
                (<DashSpinner />) : (
                    <>
                        <div className="admin-wrap">

                            <TopBar />
                            <div className="main-wrap">
                                <SideBar pageName={params.dash_url || params.settings_url || params.product_url} profileData = {profileData} />
                                <div id="main-body" className="main-body">
                                    {pages()}
                                </div>
                            </div>
                        </div>

                    </>
                )}
        </>
    )

}

export default AdminDashboard; 