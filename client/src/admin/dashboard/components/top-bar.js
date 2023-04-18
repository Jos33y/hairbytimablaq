import React, { useEffect, useRef, useState } from "react";
import "./components.css";
import TimaBlaq from "../assets/images/timablaq.jpeg";

const TopBar = () => {


    const isMounted = useRef()
    const [sideBar, setSidebar] = useState(true);

    const handleSidebar = () => {


        const allText = document.querySelectorAll(".sidebar-text");


        let mediaCheck = window.matchMedia("(max-width: 900px)")

        let checkMedia = window.matchMedia("(max-width: 720px)")

        if (mediaCheck.matches) {
            // If media query matches

            if (sideBar) {
                setSidebar(false);

                if (checkMedia.matches) {
                    document.getElementById('side-bar').style.width = "60px";
                }
                else {
                    document.getElementById('side-bar').style.width = "70px";
                }

                document.getElementById('sidebar-profile').style.display = "none";
                allText.forEach((element) => {
                    element.style.display = "none";
                });

            }
            else {
                setSidebar(true);
                document.getElementById('side-bar').style.width = "250px";
                document.getElementById('sidebar-profile').style.display = "block";
                allText.forEach((element) => {
                    element.style.display = "inline-block";
                });
            }

        } else {
            if (sideBar) {
                setSidebar(false);
                document.getElementById('side-bar').style.width = "70px";
                document.getElementById('main-body').style.marginLeft = "70px";
                document.getElementById('sidebar-profile').style.display = "none";
                allText.forEach((element) => {
                    element.style.display = "none";
                });

            }
            else {
                setSidebar(true);
                document.getElementById('side-bar').style.width = "250px";
                document.getElementById('sidebar-profile').style.display = "block";
                document.getElementById('main-body').style.marginLeft = "250px";
                allText.forEach((element) => {
                    element.style.display = "inline-block";
                });
            }
        }

    };


    useEffect(() => {
        if (isMounted) {
            let mediaCheck = window.matchMedia("(max-width: 900px)")

            if (mediaCheck.matches) {
                setSidebar(false)
            }

        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])


    return (
        <>
       
            <div id="top-header" className="top-header">
                <div className="navbar-header">
                    <div className="navbar-logo">
                        <div className="hamburger-menu">
                            <button onClick={handleSidebar} className="btn btn-md btn-secondary">  <i className="fa-solid fa-bars"></i> </button>
                        </div>
                        <div className="logo-name">
                            <p className="logo-text">HairbyTimablaq </p>
                        </div>
                    </div>

                    <div className="navbar-others">
                        <ul>
                            <li>
                                <button className="btn btn-secondary"> <i className="fa-solid fa-moon"></i> </button>
                            </li>

                            <li>
                                <button className="btn btn-secondary"> <i className="fa-solid fa-bell"></i> </button>
                            </li>

                            <li>  <button className="btn btn-secondary"> <i className="fa-solid fa-gear"></i> </button> </li>
                            <li> <div className="nav-profile"> <img src={TimaBlaq} alt="nav-profile" className="img-fluid" /> </div> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TopBar;