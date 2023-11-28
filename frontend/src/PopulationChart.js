import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { countryCodes, getCountryCode } from './countryCodes'; 
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
const PopulationChart = ({ data, selectedYear, sortType, selectedMode }) => {
    const chartRef = useRef();
    let dynamicFontSize = 10;
    const onLoad = (chartInstance) => {
        chartRef.current = chartInstance;
    };

    useEffect(() => {
        const resizeChart = () => {
            if (chartRef.current) {
                chartRef.current.resize();
            }
        };

        window.addEventListener('resize', resizeChart);

        return () => {
            window.removeEventListener('resize', resizeChart);
        };
    }, []);

    const filteredData = data.filter((item) => item.year === selectedYear);

    const sortData = (data) => {
        switch (sortType) {
            case 'alphabetical':
                return [...data].sort((a, b) => a.countryName.localeCompare(b.countryName));
            case 'maxPopulation':
                return [...data].sort((a, b) => {
                    switch (selectedMode) {
                        case 'Population':
                            return b.population - a.population;
                        case 'PopulationChildrenUnder1':
                            return b.populationChildrenUnder1 - a.populationChildrenUnder1;
                        case 'PopulationChildrenUnder5':
                            return b.populationChildrenUnder5 - a.populationChildrenUnder5;
                        case 'PopulationChildrenUnder15':
                            return b.populationChildrenUnder15 - a.populationChildrenUnder15;
                        case 'PopulationUnder25':
                            return b.populationUnder25 - a.populationUnder25;
                        case 'PopulationAged15To64':
                            return b.populationAged15To64 - a.populationAged15To64;
                        case 'PopulationOlderThan15':
                            return b.populationOlderThan15 - a.populationOlderThan15;
                        case 'PopulationOlderThan18':
                            return b.populationOlderThan18 - a.populationOlderThan18;
                        case 'PopulationAtAge1':
                            return b.populationAtAge1 - a.populationAtAge1;
                        case 'PopulationAged1To4':
                            return b.populationAged1To4 - a.populationAged1To4;
                        case 'PopulationAged5To14':
                            return b.populationAged5To14 - a.populationAged5To14;
                        case 'PopulationAged10To24':
                            return b.populationAged10To24 - a.populationAged10To24;
                        case 'PopulationAged15To19':
                            return b.populationAged15To19 - a.populationAged15To19;
                        case 'PopulationAged20To29':
                            return b.populationAged20To29 - a.populationAged20To29;
                        case 'PopulationAged30To39':
                            return b.populationAged30To39 - a.populationAged30To39;
                        case 'PopulationAged40To49':
                            return b.populationAged40To49 - a.populationAged40To49;
                        case 'PopulationAged50To59':
                            return b.populationAged50To59 - a.populationAged50To59;
                        case 'PopulationAged60To69':
                            return b.populationAged60To69 - a.populationAged60To69;
                        case 'PopulationAged70To79':
                            return b.populationAged70To79 - a.populationAged70To79;
                        case 'PopulationAged80To89':
                            return b.populationAged80To89 - a.populationAged80To89;
                        case 'PopulationAged90To99':
                            return b.populationAged90To99 - a.populationAged90To99;
                        case 'PopulationOlderThan100':
                            return b.populationOlderThan100 - a.populationOlderThan100;
                        default:
                            return 0;
                    }
                });
            default:
                return data;
        }
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
        labels: sortedData.map((item) => item.countryName),
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
        plugins: {
            datalabels: {
                display: true,
                color: 'black',
                align: 'end',
                formatter: (value) => value.toLocaleString(),
                anchor: 'end',
                color: '#333',
                font: {
                    weight: 'bold',
                    size: dynamicFontSize, 
                    
                },
                offset: 0,
            },
        },
        animation: {
            // onComplete: () => {
            //     drawFlagImages();
            // },
            onProgress: () => {
                drawFlagImages();
            },
        },
    };

    const drawFlagImages = () => {
        const chart = chartRef.current;
        
        if (chart) {
            const ctx = chart.ctx;
            const xAxis = chart.scales['x-axis-0'];
            const yAxis = chart.scales['y-axis-0'];
    
            sortedData.forEach((item, index) => {
                const flagImage = new Image();
                const bar = chart.getDatasetMeta(0).data[index];
                const width = bar.width; // Use the width of the bar : big (horizontal)
                const height = bar.height; // Use the height of the bar : small (vertical)
                dynamicFontSize = height / 3;
                const barX = bar.x; // Use the x property to get the x-position
                const barY = bar.y; // Use the x property to get the x-position

                console.log(bar);
                // console.log("barX",barX);
                // https://flagcdn.com/16x12/ua.png

                console.log("item.countryName",item.countryName);

                const countryCode = getCountryCode(item.countryName);
                flagImage.src = `https://flagcdn.com/16x12/${countryCode.toLowerCase()}.png`;
                // flagImage.src = `https://flagcdn.com/16x12/ua.png`;
                console.log(flagImage); //hereeeee
                // console.log(item.countryName);
                // console.log(item.population);
                let heightFlag = height/1.5;
                let xPos = barX - 20;
                let yPos = barY - height/2.8;
                // let xPos = xAxis.getPixelForValue(item.countryName);
                // let yPos = yAxis.getPixelForValue(item.population);
          

                ctx.drawImage(flagImage, xPos, yPos ,16 , heightFlag);// Adjust the positioning as needed
            });
        }
    };
    

    return (
        <div className="chart-container">
            <Bar ref={chartRef} data={chartData} options={chartOptions} plugins={[ChartDataLabels]} onLoad={onLoad} />
        </div>
    );
};

export default PopulationChart;
