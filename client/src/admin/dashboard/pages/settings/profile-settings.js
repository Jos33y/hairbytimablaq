import React, { useEffect, useRef, useState } from "react";
import {doc, serverTimestamp, updateDoc} from "firebase/firestore";
import {db} from "../../../../firebase.config";
import HandleScroll from "../../components/go-top";
import { toast } from "react-toastify";

const ProfileSettings = ({ userId, profileData }) => {

    const isMounted = useRef()

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        adminRole: '',
        email: '',
        phoneNumber: '',
        updateTime: '', 
    })

    const { fullName, adminRole, email, phoneNumber } = formData;
 
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const formDataCopy = {
                ...formData,
                updateTime: serverTimestamp(),
            }
            delete formDataCopy.email;
            delete formDataCopy.adminRole;
            const formDataRef = doc(db, 'admins', userId)
            await updateDoc(formDataRef, formDataCopy).then();
            toast.success("Profile Updated Successfully")
            window.location.reload();
        }
        catch (error) {
            console.log({ error })
        }
        setLoading(false)
    }




    const handleNumKeyDown = (e) => {
        const allowedKeys = ['Backspace'];
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V' || e.key === 'a' || e.key === 'A')) {
            // Allow copy and paste shortcuts
            return;
        } else if (!allowedKeys.includes(e.key) && !/^[0-9]*$/.test(e.key)) {
            // Prevent any other keys that are not numeric
            e.preventDefault();
        }
    };

    const handleAlphaKeyDown = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
        if (!allowedKeys.includes(e.key) && !/^[a-zA-Z0-9\s]*$/.test(e.key)) {
            e.preventDefault();
        }
    };




    const onChange = (e) => {

        if (e.target.id) {
            let newValue = e.target.value;
            if (e.target.id === 'phoneNumber') {
                newValue = newValue.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
            }

            if (e.target.id === 'fullName') {
                newValue = newValue.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove any non-alphanumeric characters
            }
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: newValue,
            }));
        }

    }




    const getProfile = async () => {

        try {
            setFormData(profileData)
        }
        catch (error) {
            console.log({ error })
        }

    }


    useEffect(() => {
        if (isMounted) {
            getProfile().then()
            
        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
        <>
            <HandleScroll />
            <div id="category-container" className="category-container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="add-category">
                            <div className="form-container">
                                <div className="form-header">
                                    <p className="title">Profile Settings</p>
                                    <p></p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">Full Name </label>
                                        <input type="text"
                                            className="form-control"
                                            id="fullName"
                                            value={fullName}
                                            onChange={onChange}
                                            onKeyDown={handleAlphaKeyDown}
                                            required={true}
                                            placeholder="John Doe" />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Email </label>
                                        <input type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            placeholder="yourname@email.com"
                                            readOnly={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Phone Number </label>
                                        <input type="text"
                                            className="form-control"
                                            id="phoneNumber"
                                            value={phoneNumber}
                                            onChange={onChange}
                                            onKeyDown={handleNumKeyDown}
                                            placeholder="2348000000008"
                                            required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Role </label>
                                        <input type="text"
                                            className="form-control"
                                            id="adminRole"
                                            value={adminRole}
                                            placeholder="Administrator"
                                            readOnly={true} />
                                    </div>




                                    <div className="form-group form-button">
                                        <button disabled={loading} type="submit" className="btn btn-primary"> Update Profile </button>
                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileSettings;