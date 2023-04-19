import HandleScroll from "../../components/go-top";

const CategoriesPage = () => {
    return (
        <>
        <HandleScroll />
            <div id="category-container" className="category-container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="add-category">
                            <div className="form-container">
                                <div className="form-header">
                                    <p className="title">Create category</p>
                                    <button className="btn btn-primary">View Categories</button>
                                </div>

                                <form>
                                    <div className="form-group">
                                        <label className="form-label">Category Name </label>
                                        <input type="text" className="form-control" placeholder="Bone Straight" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Category Description </label>
                                        <textarea className="form-control" rows="5" cols="10" placeholder="Quality Bone straight" required={true}></textarea>
                                    </div>


                                    <div className="form-group image-placeholder">
                                        <label className="form-label">Category Image </label>
                                        <label htmlFor="upload-cover-photo">
                                            <div className="placeholder-container">
                                                <img src='https://placehold.jp/340x340.png' alt="" className="img-fluid" />
                                            </div>
                                        </label>
                                        <input type="file"
                                            id="upload-cover-photo"
                                            accept='image/*'
                                            hidden={true}
                                            className="form-control" />
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
                                    <p className="title">Product Categories</p>
                                    <button className="btn btn-primary">Add Category</button>
                                </div>

                                <div className="category-list">
                                    <div className="cat-list-box">
                                        <div className="cat-list-info">
                                            <div className="cat-list-img">
                                                <img src="https://placehold.jp/70x70.png" alt="category " className="img-fluid" />
                                            </div>
                                            <div className="cat-list-details">
                                                <p className="name">Uncategorized </p>
                                                <p className="description">Product that are not categorized</p>
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

export default CategoriesPage;