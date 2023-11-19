import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import PopulationChart from './PopulationChart';

function App() {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(1950);
    const [sortType, setSortType] = useState('maxPopulation');
    const [showTop10, setShowTop10] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedMode, setSelectedMode] = useState('Population'); // Default mode set to 'Population'
    const scrollRef = useRef(null);
    const [animationInterval, setAnimationInterval] = useState(null);

    const uniqueYears = [...new Set(data.map((item) => item.year))];

    useEffect(() => {
        // fetch('http://localhost:8081/api/population')
        
        fetch('https://population-growth.onrender.com/api/population')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
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

    const handlePlayClick = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            setSelectedYear(1950);
            scrollRef.current.scrollTo({
                left: 0,
                behavior: 'smooth',
            });

            let currentYear = 1950;
            const interval = setInterval(() => {
                if (currentYear < 2021) {
                    currentYear += 1;
                    setSelectedYear(currentYear);
                } else {
                    clearInterval(interval);
                    setIsPlaying(false);
                }
            }, 350);

            setAnimationInterval(interval);
        }
    };

    const handleStopClick = () => {
        if (animationInterval) {
            clearInterval(animationInterval);
            setIsPlaying(false);
        }
    };

    const handleYearRangeChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    const handleModeChange = (e) => {
        setSelectedMode(e.target.value);
    };

    const filteredData = data.filter((item) => item.year === selectedYear);

    let modifiedData = filteredData;
    if (sortType === 'maxPopulation' && showTop10) {
        modifiedData = filteredData
            .sort((a, b) => b.population - a.population)
            .slice(0, 10);
        modifiedData = modifiedData.map((item) => ({
            ...item,
            population: Math.min(item.population, 8000000000),
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
            <div className="year-range">
                <label htmlFor="yearRange">Year Range:</label>
                <input
                    type="range"
                    id="yearRange"
                    min={1950}
                    max={2021}
                    step={1}
                    value={selectedYear}
                    onChange={handleYearRangeChange}
                />
                <span>{selectedYear}</span>
            </div>
            <button onClick={handlePlayClick} disabled={isPlaying}>
                {isPlaying ? 'Playing...' : 'Play'}
            </button>
            {isPlaying ? (
                <button onClick={handleStopClick}>Stop</button>
            ) : null}
            <div className="population-mode">
                <label htmlFor="modeSelect">Population Mode:</label>
                <select id="modeSelect" value={selectedMode} onChange={handleModeChange}>
                    <option value="Population">Population</option>
                    <option value="PopulationChildrenUnder1">Population of children under 1</option>
                    <option value="PopulationChildrenUnder5">Population of children under 5</option>
                    <option value="PopulationChildrenUnder15">Population of children under 15</option>
                    <option value="PopulationUnder25">Population under 25</option>
                    <option value="PopulationAged15To64">Population aged 15 to 64 years</option>
                    <option value="PopulationOlderThan15">Population older than 15 years</option>
                    <option value="PopulationOlderThan18">Population older than 18 years</option>
                    <option value="PopulationAtAge1">Population at age 1</option>
                    <option value="PopulationAged1To4">Population aged 1 to 4 years</option>
                    <option value="PopulationAged5To9">Population aged 5 to 9 years</option>
                    <option value="PopulationAged10To14">Population aged 10 to 14 years</option>
                    <option value="PopulationAged15To19">Population aged 15 to 19 years</option>
                    <option value="PopulationAged20To29">Population aged 20 to 29 years</option>
                    <option value="PopulationAged30To39">Population aged 30 to 39 years</option>
                    <option value="PopulationAged40To49">Population aged 40 to 49 years</option>
                    <option value="PopulationAged50To59">Population aged 50 to 59 years</option>
                    <option value="PopulationAged60To69">Population aged 60 to 69 years</option>
                    <option value="PopulationAged70To79">Population aged 70 to 79 years</option>
                    <option value="PopulationAged80To89">Population aged 80 to 89 years</option>
                    <option value="PopulationAged90To99">Population aged 90 to 99 years</option>
                    <option value="PopulationOlderThan100">Population older than 100 years</option>
                </select>
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
            <PopulationChart data={modifiedData} selectedYear={selectedYear} sortType={sortType} selectedMode={selectedMode} className="chart-container" />
        </div>
    );
}

export default App;
