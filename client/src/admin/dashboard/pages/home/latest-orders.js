const LatestOrders = () => {
    return (
        <>
            <div className="dashboard-latest-orders">
                <h3 className="title">Latest Orders</h3>
                <div className="table-container">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>#ID </th>
                                <th>Name</th>
                                <th>Email </th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1. </td>
                                <td>50523438</td>
                                <td className="name">Joshua Kingston</td>
                                <td className="email"> kingstonjosh <br/> @gmail.com</td>
                                <td className="amount"> &#8358;15,200 </td>
                                <td> <span className="status success"> Successful</span> </td>
                                <td> 3-4-2023 </td>
                                <td className="action"> <button className="btn btn-md btn-secondary" >details </button> </td>
                            </tr>

                            <tr>
                                <td>2. </td>
                                <td>75626581</td>
                                <td className="name">James Johnson</td>
                                <td className="email"> johnsonson <br/>@email.com </td>
                                <td className="amount"> &#8358;28,200 </td>
                                <td> <span className="status pending"> Pending </span> </td>
                                <td> 4-4-2023 </td>
                                <td className="action"> <button className="btn btn-md btn-secondary" >details </button> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}
export default LatestOrders;