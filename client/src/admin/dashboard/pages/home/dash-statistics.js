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
import PieChart from '../../assets/images/pie-chart.png';

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
                        <div className="count-box">
                            <div className="count-container">
                                <h3>Users</h3>
                                <div className="visitors-count">
                                    <p className="today">Today</p>
                                    <p className="count">001</p>
                                </div>
                                <div className="chart-box">
                                    <img src={PieChart} alt="" className="img-fluid"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default DashStatistics