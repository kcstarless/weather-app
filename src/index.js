// index.js 

import _ from 'lodash';
import './styles/main.scss';

// JS imports
import { getWeatherData } from './apiHandler.js';
import { WeatherData } from './weatherData.js';
import { render, clearPage } from './render.js';
import { unitToggle, searchLocation } from './eventHandler.js';
import { getElement, getAllElements, showLoading, hideLoading, clearContent  } from './domUtils.js';


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// I created a factory, i don't know why...
function createInit() {

    let weatherData;

    // Fetch data from API
    async function fetchWeatherData(location) {
        clearPage();
        showLoading();
        try {
            const rawData = await getWeatherData(location);
            weatherData = new WeatherData(rawData);
            return weatherData;
        } catch (error) {
            console.error('Failed to fetch weather data');
        } finally {
            await delay(3000);
            hideLoading();
        }
    }

    // Initialise location data and renders
    async function init(location = 'melbourne') {
        const data = await fetchWeatherData(location);
        if (data) {
            render(data);
        } else {
            alert('No matching location found.');
        }
    }
    
    function getWeatherDataFromInit() {
        return weatherData;
    }

    return { init, getWeatherDataFromInit };
}

// Destructure 
const { init, getWeatherDataFromInit } = createInit();

// Callback for changed location
function handleLocationChange(newLocation) {
    console.log(`lcoation changed to :${newLocation}`);
    init(newLocation);
}

// Callback for chagned unit group
function handleUnitToggle() {
    const address = getWeatherDataFromInit().getAddress();
    init(address);
}

document.addEventListener('DOMContentLoaded', () => {
    const unitButtons = getAllElements('.units .unit-group');
    const locationInput = getElement('#location');

    // Initialize the app and update unit group and locaiton re-render.
    init().then(() => {
        searchLocation(locationInput, handleLocationChange);
        unitToggle(unitButtons, handleUnitToggle);
    });
});