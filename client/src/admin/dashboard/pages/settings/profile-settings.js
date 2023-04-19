import HandleScroll from "../../components/go-top";

const ProfileSettings = () => {
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

                                <form>
                                    <div className="form-group">
                                        <label className="form-label">Full  Name </label>
                                        <input type="text" className="form-control" placeholder="John Doe" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Email </label>
                                        <input type="email" className="form-control" placeholder="yourname@email.com" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Phone Number </label>
                                        <input type="text" className="form-control" placeholder="+2347037344408" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Role </label>
                                        <input type="text" className="form-control" placeholder="Administrator" value="Admninistrator" required={true} readOnly />
                                    </div>


                                   

                                    <div className="form-group form-button">
                                        <button className="btn btn-primary"> Save Profile </button>
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