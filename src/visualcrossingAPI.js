// visualcrossingAPI.js
const ICON_SET = 'icons2'; 

function getApiURL(location) {
    const apiKey = 'RCFQPET5NKRMVHV5QZ3C67MEG';
    let apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&iconSet=${ICON_SET}`;
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