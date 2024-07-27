import _ from 'lodash';
import './styles/main.scss';

function getApiURL(location) {
    const apiKey = 'RCFQPET5NKRMVHV5QZ3C67MEG';
    let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
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

async function getWeatherData(location) {
    try {
        const url = getApiURL(location);
        const data = await apiConnect(url);
        if (data && data.currentConditions) {
            return data.currentConditions;
        } else {
            throw new Error(`No data recieved.`);
        }
    } catch(error) {
        console.error('Error while fetching weather data:', error.message);
        return null;
    }
}

function handleData(data) {
    if (data) {
        return {
            getCurrentTemp: () => data.temp,
            getCurrentConditions: () => data.conditions,
            getCurrentConditionsIcon: () => data.icon
        };
    } else {
        console.error('Error while handling data: No data to handle.')
    }
}

const location = 'melbourne'; 
const data = await getWeatherData(location);
console.log(handleData(data).getCurrentTemp());   
