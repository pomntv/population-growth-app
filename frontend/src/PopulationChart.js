import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationChart = ({ data, selectedYear, sortType, selectedMode }) => {
    const filteredData = data.filter((item) => item.year === selectedYear);

    const sortData = (data) => {
        if (sortType === 'alphabetical') {
            return [...data].sort((a, b) => a.countryName.localeCompare(b.countryName));
        } else if (sortType === 'maxPopulation') {
            return [...data].sort((a, b) => b.population - a.population);
        }
        return data;
    };

    const sortedData = sortData(filteredData);

    let label = '';
    let chartDataArray = [];

    if (selectedMode === 'Population') {
        label = 'Population';
        chartDataArray = sortedData.map((item) => item.population);
    } else if (selectedMode === 'PopulationChildrenUnder1') {
        label = 'Population of Children Under 1';
        chartDataArray = sortedData.map((item) => item.populationChildrenUnder1);
    } else if (selectedMode === 'PopulationChildrenUnder5') {
        label = 'Population of Children Under 5';
        chartDataArray = sortedData.map((item) => item.populationChildrenUnder5);
    } else if (selectedMode === 'PopulationChildrenUnder15') {
        label = 'Population of Children Under 15';
        chartDataArray = sortedData.map((item) => item.populationChildrenUnder15);
    } else if (selectedMode === 'PopulationUnder25') {
        label = 'Population Under 25';
        chartDataArray = sortedData.map((item) => item.populationUnder25);
    } else if (selectedMode === 'PopulationAged15To64') {
        label = 'Population Aged 15 to 64';
        chartDataArray = sortedData.map((item) => item.populationAged15To64);
    } else if (selectedMode === 'PopulationOlderThan15') {
        label = 'Population Older Than 15';
        chartDataArray = sortedData.map((item) => item.populationOlderThan15);
    } else if (selectedMode === 'PopulationOlderThan18') {
        label = 'Population Older Than 18';
        chartDataArray = sortedData.map((item) => item.populationOlderThan18);
    } else if (selectedMode === 'PopulationAtAge1') {
        label = 'Population At Age 1';
        chartDataArray = sortedData.map((item) => item.populationAtAge1);
    } else if (selectedMode === 'PopulationAged1To4') {
        label = 'Population Aged 1 to 4';
        chartDataArray = sortedData.map((item) => item.populationAged1To4);
    } else if (selectedMode === 'PopulationAged5To14') {
        label = 'Population Aged 5 to 14';
        chartDataArray = sortedData.map((item) => item.populationAged5To14);
    } else if (selectedMode === 'PopulationAged10To24') {
        label = 'Population Aged 10 to 24';
        chartDataArray = sortedData.map((item) => item.populationAged10To24);
    } else if (selectedMode === 'PopulationAged15To19') {
        label = 'Population Aged 15 to 19';
        chartDataArray = sortedData.map((item) => item.populationAged15To19);
    } else if (selectedMode === 'PopulationAged20To29') {
        label = 'Population Aged 20 to 29';
        chartDataArray = sortedData.map((item) => item.populationAged20To29);
    } else if (selectedMode === 'PopulationAged30To39') {
        label = 'Population Aged 30 to 39';
        chartDataArray = sortedData.map((item) => item.populationAged30To39);
    } else if (selectedMode === 'PopulationAged40To49') {
        label = 'Population Aged 40 to 49';
        chartDataArray = sortedData.map((item) => item.populationAged40To49);
    } else if (selectedMode === 'PopulationAged50To59') {
        label = 'Population Aged 50 to 59';
        chartDataArray = sortedData.map((item) => item.populationAged50To59);
    } else if (selectedMode === 'PopulationAged60To69') {
        label = 'Population Aged 60 to 69';
        chartDataArray = sortedData.map((item) => item.populationAged60To69);
    } else if (selectedMode === 'PopulationAged70To79') {
        label = 'Population Aged 70 to 79';
        chartDataArray = sortedData.map((item) => item.populationAged70To79);
    } else if (selectedMode === 'PopulationAged80To89') {
        label = 'Population Aged 80 to 89';
        chartDataArray = sortedData.map((item) => item.populationAged80To89);
    } else if (selectedMode === 'PopulationAged90To99') {
        label = 'Population Aged 90 to 99';
        chartDataArray = sortedData.map((item) => item.populationAged90To99);
    } else if (selectedMode === 'PopulationOlderThan100') {
        label = 'Population Older Than 100';
        chartDataArray = sortedData.map((item) => item.populationOlderThan100);
    } else {
        label = 'Population';
        chartDataArray = sortedData.map((item) => item.population);
    }

    const chartData = {
        labels: sortedData.map(item => item.countryName),
        datasets: [
            {
                label: label,
                data: chartDataArray,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const chartOptions = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default PopulationChart;
