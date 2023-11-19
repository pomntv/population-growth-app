import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PopulationData = ({ selectedMode }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // axios.get('http://localhost:8081/api/population')
        axios.get('https://population-growth.onrender.com/api/population')

            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data!</p>;

    return (
        <div>
            <h1>Population Data</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        
                        {item.countryName} ({item.year}): {getPopulationByMode(item, selectedMode)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopulationData;
// Helper function to get population based on the selected mode
const getPopulationByMode = (item, selectedMode) => {
    switch (selectedMode) {
        case 'PopulationChildrenUnder1':
            return item.populationChildrenUnder1;
        case 'PopulationChildrenUnder5':
            return item.populationChildrenUnder5;
        case 'PopulationChildrenUnder15':
            return item.populationChildrenUnder15;
        case 'PopulationUnder25':
            return item.populationUnder25;
        case 'PopulationAged15To64':
            return item.populationAged15To64;
        case 'PopulationOlderThan15':
            return item.populationOlderThan15;
        case 'PopulationOlderThan18':
            return item.populationOlderThan18;
        case 'PopulationAtAge1':
            return item.populationAtAge1;
        case 'PopulationAged1To4':
            return item.populationAged1To4;
        case 'PopulationAged5To9':
            return item.populationAged5To9;
        case 'PopulationAged10To14':
            return item.populationAged10To14;
        case 'PopulationAged15To19':
            return item.populationAged15To19;
        case 'PopulationAged20To29':
            return item.populationAged20To29;
        case 'PopulationAged30To39':
            return item.populationAged30To39;
        case 'PopulationAged40To49':
            return item.populationAged40To49;
        case 'PopulationAged50To59':
            return item.populationAged50To59;
        case 'PopulationAged60To69':
            return item.populationAged60To69;
        case 'PopulationAged70To79':
            return item.populationAged70To79;
        case 'PopulationAged80To89':
            return item.populationAged80To89;
        case 'PopulationAged90To99':
            return item.populationAged90To99;
        case 'PopulationOlderThan100':
            return item.populationOlderThan100;
        default:
            return item.population;
    }
};
