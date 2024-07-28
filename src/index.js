// index.js 

import _ from 'lodash';
import './styles/main.scss';
import { getWeatherData } from './visualcrossingAPI.js';
import { WeatherData } from './weatherData.js';
import { render } from './render.js';

const location = 'melbourne'; 
const rawData = await getWeatherData(location);
const weatherData = new WeatherData(rawData);
console.log(weatherData.getCurrent('temp'));
console.log(weatherData.getDays());
console.log(weatherData.getDay(5));
console.log(weatherData.getDayByHours(0));


render(weatherData);

const iconUrl = weatherData.getIcon();

// Use the icon URL in your rendering logic
console.log('Icon URL:', iconUrl);