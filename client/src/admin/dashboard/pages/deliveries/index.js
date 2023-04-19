import HandleScroll from "../../components/go-top";

const DeliveryPage = () => {
    return (
        <>
        <HandleScroll />
            <div id="category-container" className="category-container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="add-location">
                            <div className="form-container">
                                <div className="form-header">
                                    <p className="title">Add Delivery Locations </p>
                                    <button className="btn btn-primary">View Locations</button>
                                </div>

                                <form>
                                    <div className="form-group">
                                        <label className="form-label">Delivery Location </label>
                                        <input type="text" className="form-control" placeholder="Within Gambia" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Delivery Fee </label>
                                        <input type="text" className="form-control" placeholder="2000 in GMD" required={true} />
                                    </div>


                                    <div className="form-group form-button">
                                        <button className="btn btn-primary"> Save </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="view-category">
                            <div className="form-container">
                                <div className="form-header">
                                    <p className="title">Delivery Locations</p>
                                    <button className="btn btn-primary">Add Locations</button>
                                </div>

                                <div className="category-list">
                                    <div className="cat-list-box">
                                        <div className="cat-list-info">
                                            <div className="cat-list-details">
                                                <p className="location">Free Shipping Within Gambia </p>
                                                <p className="fee"> &#8358; 0</p>
                                            </div>

                                        </div>
                                        <div className="cat-list-buttons">
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

export default DeliveryPage;