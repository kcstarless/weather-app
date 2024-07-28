// index.js 

import _ from 'lodash';
import './styles/main.scss';
import { getWeatherData } from './visualcrossingAPI.js';
import { WeatherData } from './weatherData.js';
import { render } from './render.js';
import { setUnitGroup } from './config.js';

// Event listener for unit selection
document.addEventListener('DOMContentLoaded', () => {
    const unitButtons = document.querySelectorAll('.units .unit-group');
    
    unitButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'selected' class from all buttons
            unitButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add 'selected' class to the clicked button
            button.classList.add('selected');
            
            // Optionally, you can perform actions here, such as updating a setting
            const selectedUnit = button.getAttribute('data-unit');
            setUnitGroup(selectedUnit);
            init();
            console.log(`Selected unit: ${selectedUnit}`);
        });
    });
});


async function fetchAndStoreWeatherData(location) {
    const localStorageKey = 'weatherData-${location}';
    const cachedData = localStorage.getItem(localStorageKey);

    if (cachedData) {
        console.log('Using cached data from local storage');
        return JSON.parse(cachedData);
    }

    const rawData = await getWeatherData(location);

    if (rawData) {
        localStorage.setItem(localStorageKey, JSON.stringify(rawData));
    }
    return rawData;
}

async function init() {
    const location = 'melbourne';
    const rawData = await fetchAndStoreWeatherData(location);

    if (rawData) {
        const weatherData = new WeatherData(rawData);
        console.log(weatherData.getCurrent('temp'));
        console.log(weatherData.getDays());
        console.log(weatherData.getDay(5));
        console.log(weatherData.getDayByHours(0));
        console.log(weatherData);
        render(weatherData);
    } else {
        console.error('Failed to fetch weather data');
    }
}

init();