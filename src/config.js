// config.js
export const config = {
    unitGroup: 'metric', // or 'imperial'
    apiKey: 'RCFQPET5NKRMVHV5QZ3C67MEG',
    iconGroup: 'icons2'
};

export function setUnitGroup(value) {
    config.unitGroup = value;
}

export const getProperties = {
    'conditions': 'Conditions',
    'temp': 'Temperature',
    'feelslike': 'Feels like',
    'humidity': 'Humidity',
    'pressure': 'Pressure',
    'snow': 'Snow',
    'snowdepth': 'Snow depth',
    'windspeed': 'Wind speed',
    'winddir': 'Wind direction',
    'uvindex': 'UV index'
};
