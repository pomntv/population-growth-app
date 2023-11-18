import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationChart = ({ data, selectedYear }) => {
    // Filter data by the selected year
    const filteredData = data.filter((item) => item.year === selectedYear);

    const chartData = {
        labels: filteredData.map(item => item.countryName),
        datasets: [
            {
                label: 'Population',
                data: filteredData.map(item => item.population),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const chartOptions = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                max: 8000000000,
            },
        },
    };

    return <Bar data={chartData} options={chartOptions} />;
};

export default PopulationChart;
