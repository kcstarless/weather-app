// apiHandler.js
import { config } from './config.js';
import { handleApiError, handleHttpError } from './errorHandler.js';

function getApiURL(location) {
    const { iconGroup, apiKey, unitGroup } = config;    
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&iconSet=${iconGroup}&unitGroup=${unitGroup}`;
}

async function apiFetch(url) {
    try {
        let response = await fetch(url);

        if (response.ok) {
            let weatherData = await response.json();
            return weatherData;
        } else {
            handleHttpError(response.status);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }      
    } catch(error) {
        handleApiError(error);
        return null;
    }
}

export async function getWeatherData(location) {
    try {
        const url = getApiURL(location);
        const data = await apiFetch(url);
        if (data && data.currentConditions) {
            console.log(data);
            return data;
        } else {
            throw new Error(`No data recieved.`);
        }
    } catch(error) {
        handleApiError(error);
        return null;
    }
}