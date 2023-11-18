import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationChart = ({ data, selectedYear, sortType }) => {
    // Filter data by the selected year
    const filteredData = data.filter((item) => item.year === selectedYear);

    // Function to sort the data based on the selected sort type
    const sortData = (data) => {
        if (sortType === 'alphabetical') {
            return [...data].sort((a, b) => a.countryName.localeCompare(b.countryName));
        } else if (sortType === 'maxPopulation') {
            return [...data].sort((a, b) => b.population - a.population);
        }
        return data;
    };

    // Sort the filtered data
    const sortedData = sortData(filteredData);

    const chartData = {
        labels: sortedData.map(item => item.countryName),
        datasets: [
            {
                label: 'Population',
                data: sortedData.map(item => item.population),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const chartOptions = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                // max: 8000000000,
            },
        },
    };

    return <Bar data={chartData} options={chartOptions} />;
};

export default PopulationChart;
