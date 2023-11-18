import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import PopulationChart from './PopulationChart';

function App() {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(1950); // Default selected year
    const [sortType, setSortType] = useState('maxPopulation'); // Default sort type set to 'maxPopulation'
    const [showTop10, setShowTop10] = useState(true); // Default set to show top 10 countries
    const [isPlaying, setIsPlaying] = useState(false); // Flag to indicate if the animation is playing
    const scrollRef = useRef(null); // Reference to the scroll container
    const [animationInterval, setAnimationInterval] = useState(null); // Store the animation interval ID

    // Define uniqueYears outside of the return function
    const uniqueYears = [...new Set(data.map((item) => item.year))];

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

    useEffect(() => {
        // Scroll to the selected year when it changes
        if (scrollRef.current) {
            const selectedButton = scrollRef.current.querySelector(`.year-button[data-year="${selectedYear}"]`);
            if (selectedButton) {
                const scrollX = selectedButton.offsetLeft - (scrollRef.current.clientWidth - selectedButton.clientWidth) / 2;
                scrollRef.current.scrollTo({
                    left: scrollX,
                    behavior: 'smooth',
                });
            }
        }
    }, [selectedYear]);

    // Function to handle the play button click
    const handlePlayClick = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            setSelectedYear(1950); // Reset selected year to 1950
            scrollRef.current.scrollTo({
                left: 0, // Reset scroll position to the beginning
                behavior: 'smooth',
            });

            let currentYear = 1950; // Start from 1950
            const interval = setInterval(() => {
                if (currentYear < 2021) {
                    currentYear += 1;
                    setSelectedYear(currentYear);
                } else {
                    clearInterval(interval);
                    setIsPlaying(false);
                }
            }, 350); // Change year (milliseconds)

            // Store the animation interval ID
            setAnimationInterval(interval);
        }
    };

    // Function to handle the stop button click
    const handleStopClick = () => {
        if (animationInterval) {
            clearInterval(animationInterval); // Clear the animation interval
            setIsPlaying(false); // Stop the animation
        }
    };

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
                <div className="horizontal-scroll" ref={scrollRef}>
                    {uniqueYears.map((year) => (
                        <button
                            key={year}
                            className={`year-button ${year === selectedYear ? 'selected' : ''}`}
                            data-year={year}
                            onClick={() => setSelectedYear(year)}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={handlePlayClick} disabled={isPlaying}>
                {isPlaying ? 'Playing...' : 'Play Animation'}
            </button>
            {isPlaying ? (
                <button onClick={handleStopClick}>Stop</button>
            ) : null}
            <PopulationChart data={modifiedData} selectedYear={selectedYear} sortType={sortType} />
        </div>
    );
}

export default App;
