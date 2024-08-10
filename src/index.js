// index.js 

import _ from 'lodash';
import './styles/main.scss';

// JS imports
import { getWeatherData } from './modules/apiHandler.js';
import { WeatherData } from './modules/weatherData.js';
import { render, clearPage } from './modules/render.js';
import { unitToggle, searchLocation } from './modules/eventHandler.js';
import { showMessage } from './modules/errorHandler.js';
import { getElement, getAllElements, showLoading, hideLoading  } from './modules/domUtils.js';

// I created a factory, i don't know why...
function createInit() {

    let weatherData;

    // Fetch data from API
    async function fetchWeatherData(location) {
        const locationInput = getElement('#location');
        clearPage();
        showLoading();
        try {
            const rawData = await getWeatherData(location);
            weatherData = new WeatherData(rawData);
            locationInput.value = '';
            console.log(weatherData);
            return weatherData;
        } catch (error) {
            console.log('Failed to fetch weather data');

            return null
        } finally {
            // await delay(2000);
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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', () => {
    const unitButtons = getAllElements('.units .unit-group');
    const locationInput = getElement('#location');
   

    // showMessage('Please enter your location.');


    // Initialize the app and update unit group and locaiton re-render.
    init().then(() => {
            searchLocation(locationInput, handleLocationChange);
            unitToggle(unitButtons, handleUnitToggle);
    });
});