// render.js - takes care of all renders to DOM.
import { format, parse } from 'date-fns';

export function render(data) {
    renderOverview(data);
}

function renderOverview (data) {
    const iconContainer  = document.querySelector('.icon');
    const tempContainer = document.querySelector('.temp');
    const timeContainer = document.querySelector('.time');
    const headerContainer = document.querySelector('.overview-title');
    const iconURL = data.getIcon();

    // Overview header
    const headerElement = data.address;
    // Create a new <img> element for the icon
    const imgElement = document.createElement('img');
    imgElement.src = iconURL;
    imgElement.alt = 'Weather Icon';

    const tempElement = data.getCurrent('temp') + ' \u00B0' + 'F';
    const currenTime = parse(data.getCurrent('datetime'), 'HH:mm:ss', new Date());
    const timeElement = format(new Date(currenTime), 'h:mm a');

    // iconContainer.innerHTML = '';
    // Append the new all overview elements
    headerContainer.append(headerElement)
    iconContainer.append(imgElement);
    tempContainer.append(tempElement);
    timeContainer.append(timeElement);
}