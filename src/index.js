// index.js 

import _ from 'lodash';
import './styles/main.scss';

// JS imports
import { getWeatherData } from './visualcrossingAPI.js';
import { WeatherData } from './weatherData.js';
import { render } from './render.js';
import { unitToggle, searchLocation } from './eventHandler.js';
import { getElement, getAllElements } from './domUtils.js';

async function fetchAndStoreWeatherData(location) {
    // const localStorageKey = `weatherData-${location}`;
    // const cachedData = localStorage.getItem(localStorageKey);

    // if (cachedData) {
    //     console.log('Using cached data from local storage');
    //     return JSON.parse(cachedData);
    // }

    const rawData = await getWeatherData(location);

    // if (rawData) {
    //     console.log('rawData');
    //     localStorage.setItem(localStorageKey, JSON.stringify(rawData));
    // }
    return rawData;
}

async function init(location = 'melbourne') {
    const rawData = await fetchAndStoreWeatherData(location);

    if (rawData) {
        const weatherData = new WeatherData(rawData);
        render(weatherData);
    } else {
        console.error('Failed to fetch weather data');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const unitButtons = getAllElements('.units .unit-group');
    const locationInput = getElement('#location');

    // Initialize the app and set up unit toggle. when toggled re-initialize.
    init().then(() => {
        searchLocation(locationInput, (newLocation) => {
            console.log(`Location changed to: ${newLocation}`);
            init(newLocation);
        });
        unitToggle(unitButtons, () => init(locationInput.value || 'melbourne'));
    });
});