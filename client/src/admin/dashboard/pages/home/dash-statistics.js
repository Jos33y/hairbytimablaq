import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Link } from "react-router-dom";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);


export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

const labels = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
export const data = {
    labels,
    datasets: [
        {
            label: 'Sales',
            data: [],
            // data: [18, 17, 4, 3, 2, 20, 25, 31, 25, 22,],
            backgroundColor: 'rgb(44, 120, 220)',
        },
        {
            label: 'Visitors',
            data: [],
            // data: [40, 20, 17, 9, 23, 35, 39, 30, 34, 25,],
            backgroundColor: 'rgb(209, 192, 107)',
        },
    ],
};

const DashStatistics = () => {

    return (
        <>
            <div className="dashboard-statistics">
                <div className="row">
                    <div className="col-md-8">
                        <div className="statistics-card">
                            <h5 className="card-title">Sales statistics</h5>
                            <Bar style={{ height: "500px", width: "100%" }} options={options} data={data} />
                        </div>

                    </div>
                    <div className="col-md-4">
                        <div className="to-do-list">
                            <ul>
                                <li> 1. <Link className="to-do-link" to="/" > Set up store look </Link>  </li>
                                <li> 2. <Link className="to-do-link" to="/" > Create product categories </Link>  </li>
                                <li> 3. <Link className="to-do-link" to="/" > Add different products </Link>  </li>
                                <li> 4. <Link className="to-do-link" to="/" > Add delivery locations fees </Link>  </li>
                                <li> 5. <Link className="to-do-link" to="/" > Profile Settings </Link>  </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default DashStatistics