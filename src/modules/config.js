// config.js

import conditionsIcon from '../images/conditions-icon.png';
import tempIcon from '../images/temp-icon.png';
import feelslikeIcon from '../images/feelslike-icon.png';
import humidityIcon from '../images/humidity-icon.png';
import pressureIcon from '../images/pressure-icon.png';
import snowIcon from '../images/snow-icon.png';
import snowdepthIcon from '../images/snowdepth-icon.png';
import windspeedIcon from '../images/windspeed-icon.png';
import winddirIcon from '../images/winddir-icon.png';
import uvindexIcon from '../images/uvindex-icon.png';

export const config = {
    unitGroup: 'metric', // or 'imperial'
    apiKey: 'RCFQPET5NKRMVHV5QZ3C67MEG',
    iconGroup: 'icons2'
};

export function setUnitGroup(value) {
    config.unitGroup = value;
}

export const getProperties = {
    'conditions': { label: 'Conditions', icon: conditionsIcon },
    'temp': { label: 'Temperature', icon: tempIcon },
    'feelslike': { label: 'Feels like', icon: feelslikeIcon },
    'humidity': { label: 'Humidity', icon: humidityIcon },
    'pressure': { label: 'Pressure', icon: pressureIcon},
    'snow': { label: 'Snow', icon: snowIcon },
    'snowdepth': { label: 'Snow depth', icon: snowdepthIcon },
    'windspeed': { label: 'Wind speed', icon: windspeedIcon },
    'winddir': { label: 'Wind direction', icon: winddirIcon},
    'uvindex': { label: 'UV index', icon: uvindexIcon }
};
