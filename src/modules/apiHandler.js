// apiHandler.js
import { config } from './config.js';
import { handleApiError, handleHttpError } from './errorHandler.js';
import { showMessage } from './errorHandler.js';

function getApiURL(location) {
    const { iconGroup, apiKey, unitGroup } = config;    
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&iconSet=${iconGroup}&unitGroup=${unitGroup}`;
}

async function apiFetch(url) {
    try {
        let response = await fetch(url);

        if (response.ok) {
            showMessage('Please enter your location.');
            return response.json();
        } else {
            // Differentiate messages based on status code
            switch (response.status) {
                case 404:
                    showMessage('Location not found. Please try a different location.');
                    break;
                case 500:
                    showMessage('Server error. Please try again later.');
                    break;
                default:
                    showMessage(`HTTP Error! Status: ${response.status}`);
            }
            return null;
        }
    } catch (error) {
        showMessage('Network error. Please check your connection.');
        return null;
    }
}

export async function getWeatherData(location) {
    try {
        const url = getApiURL(location);
        const data = await apiFetch(url);
        if (data && data.currentConditions) {
            return data;
        } else {
            showMessage('Location not found. Please try a different location.');
            return null;
        }
    } catch (error) {
        showMessage('Error fetching weather data. Please try again.');
        return null;
    }
}