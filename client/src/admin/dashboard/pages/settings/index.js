import HandleScroll from "../../components/go-top";

const StoreSettings = () => {
    return (
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

                                <form>

                                    <div className="form-group">
                                        <label className="form-label">Business Email </label>
                                        <input type="email" className="form-control" placeholder="yourname@email.com" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Business Phone 1 </label>
                                        <input type="text" className="form-control" placeholder="+2347037344408" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Business Phone 2 </label>
                                        <input type="text" className="form-control" placeholder="+2347037344408" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Store Address</label>
                                        <input type="text" className="form-control" placeholder="John Doe" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Instagram Link</label>
                                        <input type="text" className="form-control" placeholder="https://instagram.com/storename" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Facebook Link</label>
                                        <input type="text" className="form-control" placeholder="https://facebook.com/storename" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Twitter Link</label>
                                        <input type="text" className="form-control" placeholder="https://twitter.com/storename" required={true} />
                                    </div>




                                    <div className="form-group form-button">
                                        <button className="btn btn-primary"> Save Settings </button>
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

export default StoreSettings;