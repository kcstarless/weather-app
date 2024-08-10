// domUtils.js
export function getElement(selector) {
    return document.querySelector(selector);
}
  
export function getAllElements(selector) {
    return document.querySelectorAll(selector);
}

export function showLoading() {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.style.display = 'flex';
    });
}

export function hideLoading() {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.style.display = 'none';
    });
}

// units group
export const unitSymbols = {
    metric: {
        temp: '°C',
        feelslike: '°C',
        humidity: '%',
        pressure: 'hPa',
        snow: 'cm',
        snowdepth: 'cm',
        windspeed: 'km/h',
        winddir: '', // No symbol
        uvindex: '' // No symbol
    },
    us: {
        temp: '°F',
        feelslike: '°F',
        humidity: '%',
        pressure: 'inHg',
        snow: 'in',
        snowdepth: 'in',
        windspeed: 'mph',
        winddir: '', // No symbol
        uvindex: '' // No symbol
    }
};