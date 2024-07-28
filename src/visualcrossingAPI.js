// visualcrossingAPI.js
import { config } from './config.js';

function getApiURL(location) {
    const icons = config.iconGroup; 
    const apiKey = config.apiKey;
    const units = config.unitGroup;
    
    let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&iconSet=${icons}&unitGroup=${units}`;
    return apiURL;
}

async function apiConnect(url) {
    try {
        let response = await fetch(url);

        if (response.ok) {
            let weatherData = await response.json();
            return weatherData;
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }      
    } catch(error) {
        console.error('Error:', error.message);
        return null;
    }
}

export async function getWeatherData(location) {
    try {
        const url = getApiURL(location);
        const data = await apiConnect(url);
        if (data && data.currentConditions) {
            console.log(data);
            return data;
        } else {
            throw new Error(`No data recieved.`);
        }
    } catch(error) {
        console.error('Error while fetching weather data:', error.message);
        return null;
    }
}