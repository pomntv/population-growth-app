import React, { useEffect, useState } from 'react';
import './App.css';
import PopulationChart from './PopulationChart';

function App() {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(1950); // Default selected year

    useEffect(() => {
        // Fetch data from your API or source here and set it to the 'data' state
        // Replace this with your actual data fetching logic
        fetch('http://localhost:8081/api/population')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Create an array of unique years for the scroll bar
    const uniqueYears = [...new Set(data.map((item) => item.year))];

    return (
        <div className="App">
            <h1>Population Growth</h1>
            <div className="scroll-container">
                <button className="scroll-button" onClick={() => setSelectedYear(selectedYear - 1)}>
                    &lt;
                </button>
                {uniqueYears.map((year) => (
                    <button
                        key={year}
                        className={`year-button ${year === selectedYear ? 'selected' : ''}`}
                        onClick={() => setSelectedYear(year)}
                    >
                        {year}
                    </button>
                ))}
                <button className="scroll-button" onClick={() => setSelectedYear(selectedYear + 1)}>
                    &gt;
                </button>
            </div>
            <PopulationChart data={data} selectedYear={selectedYear} />
        </div>
    );
}

export default App;
