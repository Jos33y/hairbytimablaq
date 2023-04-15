
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
            console.log("profile data", profileSnap.data())
            console.log("Params Name:", params.dash_url)
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

    }


    useEffect(() => {
        if (isMounted) {
            getUser().then()
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
                                <SideBar />
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