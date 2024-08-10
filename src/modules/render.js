// render.js - takes care of all renders to DOM.
import { format, parse } from 'date-fns';
import { unitSymbols } from './domUtils.js';
import { config, getProperties } from './config.js';
import { initializeCarousel } from './carousel.js';

let cachedElement = [];

function elementSelector() {
    cachedElement = {
        carouselWrapperContainer: document.querySelector('.carousel-sevendays'),
        sevenDaysContainer: document.querySelector('.seven-days'),
        conditionsContainer: document.querySelector('.current-condition'),
        iconValueContainer: document.querySelector('.icon-value'),
        iconTempContainer: document.querySelector('.icon-temp'),
        iconTimeContainer: document.querySelector('.icon-time'),
        headerContainer: document.querySelector('.overview-location'),
    }
}

export function render(data) {
    elementSelector(); // Cache DOM elements
    renderOverview(data);
    renderCurrentConditions(data);
    renderSevenDays(data);
}

function renderSevenDays(data) {
    const { carouselWrapperContainer } = cachedElement;

    const sevenDays = data.days.slice(1, 8);
    console.log(sevenDays);

    carouselWrapperContainer.innerHTML = '';

    sevenDays.forEach((day, index) => {
        const divSevendays = document.createElement('divSevendays');
        divSevendays.className = `carousel-card`;
        divSevendays.dataset.index = `${index}`;

        const conditionIcon = data.days[index].icon;
        const iconURL = data.getIcon(conditionIcon);
        divSevendays.style.backgroundImage = `url(${iconURL})`

        const dayOfWeek = parse(day.datetime, 'yyyy-MM-dd', new Date());

        const dayDay = document.createElement('div');
        dayDay.textContent = format(dayOfWeek, 'EE');
        dayDay.className = 'day';

        const dayDate = document.createElement('div');
        dayDate.textContent = format(dayOfWeek, 'd/M' )
        dayDate.className = 'date';

        const tempMin = document.createElement('div');
        tempMin.textContent = day.tempmin;
        tempMin.className = 'min';

        const tempMax = document.createElement('div');
        tempMax.textContent = day.tempmax;
        tempMax.className = 'max';

        divSevendays.append(dayDay, dayDate, tempMin, tempMax);
        carouselWrapperContainer.append(divSevendays);
    });

    // initializeCarousel();
}

function renderCurrentConditions(data){
    const { conditionsContainer } = cachedElement;
    const currentConditions = data.current;

    conditionsContainer.innerHTML = '';

    // data properties to collect
    const properties = getProperties;
    // unit conversions
    const units = unitSymbols[config.unitGroup];

    for (const [key, {label, icon}] of Object.entries(properties)) {
        // Check if the property exists in currentConditions
        if (currentConditions.hasOwnProperty(key)) {
            // Create a new div element for the card
            const card = document.createElement('div');
            card.className = 'card';

            card.style.backgroundImage = `url(${icon})`;
            
            // Create a div element for the property name and value
            const cardTitle = document.createElement('div');
            cardTitle.className = 'card-title';
            cardTitle.textContent = label;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            cardBody.textContent =  `${data.getCurrent(key)} ${units[key] || ''}`;

            // const cardIcon = document.createElement('img');
            // cardIcon.className = 'card-img';
            // cardIcon.src = icon;
            
            card.append(cardTitle);
            card.append(cardBody);
            conditionsContainer.append(card);
        }
    }
}

function renderOverview (data) {
    const { iconValueContainer, iconTempContainer, iconTimeContainer, headerContainer  } = cachedElement;
    // Clear specific elements within each container

    headerContainer.textContent = '';

    // Get data
    const headerElement = data.address;
    const apiIcon = data.current.icon;

    const imgElement = document.createElement('img');
    const iconURL = data.getIcon(apiIcon);
    imgElement.src = iconURL;
    imgElement.alt = 'Weather Icon';

    const tempElement = data.getCurrent('temp') + unitSymbols[config.unitGroup]['temp'];
    const currenTime = parse(data.getCurrent('datetime'), 'HH:mm:ss', new Date());
    const timeElement = format(new Date(currenTime), 'h:mm a');

    // iconContainer.innerHTML = '';
    // Append the new all overview elements
    headerContainer.append(headerElement);
    iconValueContainer.append(imgElement);
    iconTempContainer.append(tempElement);
    iconTimeContainer.append(timeElement);
}

export function clearPage () {
    elementSelector(); 
    const { iconValueContainer, iconTempContainer, iconTimeContainer } = cachedElement;


    // Clear content of specific elements
    iconValueContainer.textContent = '';
    iconTempContainer.textContent = '';
    iconTimeContainer.textContent = '';
}