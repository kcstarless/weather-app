// render.js - takes care of all renders to DOM.
import { format, parse } from 'date-fns';
import { unitSymbols } from './units.js';
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
    const iconContainer  = document.querySelector('.icon');
    const tempContainer = document.querySelector('.temp');
    const timeContainer = document.querySelector('.time');
    const headerContainer = document.querySelector('.overview-title');
    const iconURL = data.getIcon();

    // Clear existing content
    iconContainer.innerHTML = '';
    tempContainer.innerHTML = '';
    timeContainer.innerHTML = '';
    headerContainer.innerHTML = '';

    // Overview header
    const headerElement = data.address;
    // Create a new <img> element for the icon
    const imgElement = document.createElement('img');
    imgElement.src = iconURL;
    imgElement.alt = 'Weather Icon';

    const tempElement = data.getCurrent('temp') + unitSymbols[config.unitGroup]['temp'];
    const currenTime = parse(data.getCurrent('datetime'), 'HH:mm:ss', new Date());
    const timeElement = format(new Date(currenTime), 'h:mm a');

    // iconContainer.innerHTML = '';
    // Append the new all overview elements
    headerContainer.append(headerElement)
    iconContainer.append(imgElement);
    tempContainer.append(tempElement);
    timeContainer.append(timeElement);
}