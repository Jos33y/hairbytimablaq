import React, { useEffect, useRef, useState } from "react";
import { doc, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import HandleScroll from "../../components/go-top";
import { toast } from "react-toastify";
import DashSpinner from "../../components/dash-spinner";


const StoreSettings = () => {

    const store_unique_id = 'hair-by-timablaq';
    const isMounted = useRef()
    const [loading, setLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [storeData, setStoreData] = useState({
        businessEmail: '',
        businessPhoneOne: '',
        businessPhoneTwo: '',
        storeAddress: '',
        instagramLink: '',
        facebookLink: '',
        twitterLink: '',
    })

    const { businessEmail, businessPhoneOne, businessPhoneTwo, storeAddress, instagramLink, facebookLink, twitterLink } = storeData;


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsDisabled(true)

        try {

            const storeDataCopy = { ...storeData }
            storeDataCopy.timeStamp = serverTimestamp();
            const storeRef = doc(db, 'store_info', store_unique_id)
            await updateDoc(storeRef, storeDataCopy)
            toast.success("store settings updated");

        } catch (error) {
            console.log({ error })
            toast.error("Error updating store setting")
        }
        setIsDisabled(false)
        getStoreInfo();
    }



    const getStoreInfo = async () => {
        setLoading(true);

        try {
            const storeRef = doc(db, 'store_info', store_unique_id)
            const storeSnap = await getDoc(storeRef)

            if (storeSnap.exists()) {
                setStoreData(storeSnap.data())
            }
        }
        catch (error) {
            console.log({ error })
        }
        setLoading(false);
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

    const handleEmailKeyDown = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Control', 'c', 'v', 'a'];
        if (!allowedKeys.includes(e.key) && !/^[a-zA-Z0-9@._-]*$/.test(e.key)) {
            e.preventDefault();
        }
    };



    const onChange = (e) => {

        if (e.target.id) {

            let newValue = e.target.value;
            if (e.target.id === 'businessPhoneOne' || e.target.id === 'businessPhoneTwo') {
                newValue = newValue.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
            }

            if (e.target.id === 'businessEmail') {
                newValue = newValue.replace(/[^a-zA-Z0-9@._\s-]/g, ''); // Remove any non-alphanumeric characters, spaces, and some special characters
            }

            setStoreData((prevState) => ({
                ...prevState,
                [e.target.id]: newValue,
            }));
        }

    }




    useEffect(() => {

        if (isMounted) {

            getStoreInfo().then();
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])


    return (
        <>
            {loading ?
                (<DashSpinner />) : (
                    <>
                        <HandleScroll />
                        <div id="category-container" className="category-container">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="add-category">
                                        <div className="form-container">
                                            <div className="form-header">
                                                <p className="title">Store Settings</p>
                                                <p></p>
                                            </div>

                                            <form onSubmit={handleSubmit}>

                                                <div className="form-group">
                                                    <label className="form-label">Business Email </label>
                                                    <input type="email"
                                                        className="form-control"
                                                        id="businessEmail"
                                                        value={businessEmail}
                                                        onChange={onChange}
                                                        onKeyDown={handleEmailKeyDown}
                                                        placeholder="yourname@email.com"
                                                        required={true} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Business Phone 1 </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        id="businessPhoneOne"
                                                        value={businessPhoneOne}
                                                        onChange={onChange}
                                                        onKeyDown={handleNumKeyDown}
                                                        placeholder="2347037344408"
                                                        required={true} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Business Phone 2 </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        id="businessPhoneTwo"
                                                        value={businessPhoneTwo}
                                                        onChange={onChange}
                                                        onKeyDown={handleNumKeyDown}
                                                        placeholder="2347037344408"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Store Address</label>
                                                    <input type="text"
                                                        id="storeAddress"
                                                        value={storeAddress}
                                                        onChange={onChange}
                                                        className="form-control"
                                                        placeholder="John Doe"
                                                        required={true} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Instagram Link</label>
                                                    <input type="text"
                                                        id="instagramLink"
                                                        value={instagramLink}
                                                        onChange={onChange}
                                                        className="form-control"
                                                        placeholder="https://instagram.com/storename" />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Facebook Link</label>
                                                    <input type="text"
                                                        id="facebookLink"
                                                        value={facebookLink}
                                                        onChange={onChange}
                                                        className="form-control"
                                                        placeholder="https://facebook.com/storename" />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Twitter Link</label>
                                                    <input type="text"
                                                        id="twitterLink"
                                                        value={twitterLink}
                                                        onChange={onChange}
                                                        className="form-control"
                                                        placeholder="https://twitter.com/storename" />
                                                </div>


                                                <div className="form-group form-button">
                                                    <button disabled={isDisabled} type="submit" className="btn btn-primary"> Update Settings </button>
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
        </>
    )
}

export default StoreSettings;