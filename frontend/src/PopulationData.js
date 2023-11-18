import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PopulationData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/api/population')
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
            {/* You can format and display your data here as needed */}
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        {item.countryName} ({item.year}): {item.population}
                        {/* Display other data as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopulationData;
