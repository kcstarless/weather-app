// render.js - takes care of all renders to DOM.
import { format, parse } from 'date-fns';
import { unitSymbols } from './domUtils.js';
import { config, getProperties } from './config.js';

export function render(data) {
    renderOverview(data);
    renderCurrentConditions(data);
}

function renderCurrentConditions(data){
    const currentConditions = data.current;
    const conditionsContainer = document.querySelector('.current-condition');

    conditionsContainer.innerHTML = '';

    // data properties to collect
    const properties = getProperties;
    // unit conversions
    const units = unitSymbols[config.unitGroup];

    for (const [key, label] of Object.entries(properties)) {
        // Check if the property exists in currentConditions
        if (currentConditions.hasOwnProperty(key)) {
            // Create a new div element for the card
            const card = document.createElement('div');
            card.className = 'card';

            // Create a div element for the property name and value
            const cardTitle = document.createElement('div');
            cardTitle.className = 'card-title';
            cardTitle.textContent = label;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            cardBody.textContent =  `${data.getCurrent(key)} ${units[key] || ''}`;

            card.append(cardTitle);
            card.append(cardBody)
            conditionsContainer.append(card);
        }
    }
}

function renderOverview (data) {
    const iconValueContainer = document.querySelector('.icon-value');
    const tempValueContainer = document.querySelector('.icon-temp');
    const timeValueContainer = document.querySelector('.icon-time');
    const headerContainer = document.querySelector('.overview-location');
   
    // Clear specific elements within each container

    headerContainer.textContent = '';

    // Get data
    const headerElement = data.address;

    const imgElement = document.createElement('img');
    const iconURL = data.getIcon();
    imgElement.src = iconURL;
    imgElement.alt = 'Weather Icon';

    const tempElement = data.getCurrent('temp') + unitSymbols[config.unitGroup]['temp'];
    const currenTime = parse(data.getCurrent('datetime'), 'HH:mm:ss', new Date());
    const timeElement = format(new Date(currenTime), 'h:mm a');

    // iconContainer.innerHTML = '';
    // Append the new all overview elements
    headerContainer.append(headerElement);
    iconValueContainer.append(imgElement);
    tempValueContainer.append(tempElement);
    timeValueContainer.append(timeElement);
}

export function clearPage () {
    // Clear specific elements within each container
    const iconValueContainer = document.querySelector('.icon-value');
    const tempValueContainer = document.querySelector('.icon-temp');
    const timeValueContainer = document.querySelector('.icon-time');

    // Clear content of specific elements
    iconValueContainer.textContent = '';
    tempValueContainer.textContent = '';
    timeValueContainer.textContent = '';
}