import React, { useEffect, useState } from 'react';
import './App.css';
import PopulationChart from './PopulationChart';

function App() {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(1950); // Default selected year
    const [sortType, setSortType] = useState('maxPopulation'); // Default sort type set to 'maxPopulation'
    const [showTop10, setShowTop10] = useState(true); // Default set to show top 10 countries

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

    // Filter data by the selected year
    const filteredData = data.filter((item) => item.year === selectedYear);

    // Apply max value and limit to top 10 countries if the option is enabled
    let modifiedData = filteredData;
    if (sortType === 'maxPopulation' && showTop10) {
        modifiedData = filteredData
            .sort((a, b) => b.population - a.population) // Sort by population in descending order
            .slice(0, 10); // Take the top 10 countries
        modifiedData = modifiedData.map((item) => ({
            ...item,
            population: Math.min(item.population, 8000000000), // Apply the maximum value of 8,000,000,000
        }));
    }

    return (
        <div className="App">
            <h1>Population Growth</h1>
            <div className="sort-options">
                <label>
                    Sort by:
                    <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                        <option value="alphabetical">Alphabetical</option>
                        <option value="maxPopulation">Max Population</option>
                    </select>
                </label>
                {sortType === 'maxPopulation' && (
                    <label>
                        Show Top 10:
                        <input
                            type="checkbox"
                            checked={showTop10}
                            onChange={() => setShowTop10(!showTop10)}
                        />
                    </label>
                )}
            </div>
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
            <PopulationChart data={modifiedData} selectedYear={selectedYear} sortType={sortType} />
        </div>
    );
}

export default App;
