import HandleScroll from "../../components/go-top";
import CustomerBox from "./customer-box";


const CustomersListPage = () => {
    return (
        <>
        <HandleScroll />
            <div id="category-container" className="category-container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="manage-product">
                            <div className="form-container">
                                <div className="form-header">
                                    <p className="title">Customers List</p>
                                    <p> </p>
                                </div>

                                <hr />

                                <div className="form-actions">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="form-group">
                                                <input className="form-control" type="text" placeholder="Search customers..." />
                                            </div>
                                        </div>
                                        <div className="col-md-2">

                                        </div>
                                        <div className="col-md-5">
                                            <div className="form-group">
                                                <select className="form-control"
                                                    id='productCategory'>
                                                    <option value='all'>Show 20</option>
                                                    <option value='all'>Show 30</option>
                                                    <option value='all'>Show 40</option>
                                                    <option value='all'>Show 50</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div className="customers-list">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <CustomerBox />
                                        </div>

                                        <div className="col-md-6">
                                            <CustomerBox />
                                        </div>

                                        <div className="col-md-6">
                                            <CustomerBox />
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

export default CustomersListPage;