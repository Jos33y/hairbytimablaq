
const AccountModerators = () => {
    return (
        <>
            <div className="category-container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="add-category">
                            <div className="form-container">
                                <div className="form-header">
                                    <p className="title">Add Moderators</p>
                                    <button className="btn btn-primary">View Moderators</button>
                                </div>

                                <form>
                                    <div className="form-group">
                                        <label className="form-label">Full Name </label>
                                        <input type="text" className="form-control" placeholder="John Doe" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Email </label>
                                        <input type="email" className="form-control" placeholder="0123456789" required={true} />
                                    </div>


                                    <div className="form-group">
                                        <label className="form-label">Phone Number </label>
                                        <input type="text" className="form-control" placeholder="First Bank Nigeria" required={true} />
                                    </div>
                                    <div className="Account Role">
                                        <select className="form-control">
                                            <option disabled={true} selected value="status">Moderators</option>
                                            <option value="uncategorized">All moderaors</option>
                                            <option value="null">Not Confirmed</option>
                                            <option value="null">Confirmed</option>
                                        </select>
                                    </div>



                                    <div className="form-group form-button">
                                        <button className="btn btn-primary"> Save Payment </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="view-category">
                            <div className="form-container">
                                <div className="form-header">
                                    <p className="title">Account Moderators</p>
                                    <button className="btn btn-primary">Add Moderators</button>
                                </div>

                                <div className="payment-list">
                                    <hr />
                                    <div className="payment-list-box">
                                        <div className="payment-list-details">
                                            
                                            <p className="date">Administrator </p>
                                            <p className="name">Joseph Lagbalu </p>
                                            <p className="name">josephlagbalu@gmail.com </p>
                                            <p className="name">07037344408</p>
                                        </div>
                                        <div className="payment-list-buttons">
                                                <p className="date">20th March, 2023 </p>
                                            <p> <button className="btn btn-md btn-primary">Edit </button> </p>
                                            <p> <button className="btn btn-md btn-danger">Delete </button> </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountModerators;