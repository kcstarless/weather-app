// weatherData.js

export class WeatherData {
    constructor(data) {
        if (data) {
            this.current = data.currentConditions;
            this.days = data.days;
            this.address = data.address;
        } else {
            console.error('Error while handling data: No data to handle.');
        }
    }

    getCurrent(value) {
        return this.current[value];
    }

    getDays() {
        return this.days;
    }

    getDay(day = 0) {
        if (day >= 0 && day < this.days.length) {
            return this.days[day];
        } else {
            console.error('Invalid day index.');
            return this.days[0];
        }
    }

    getDayByHours(day) {
        const dayData = this.getDay(day);
        // console.log('Hourly Data:', dayData.hours); // Debugging log
        return dayData.hours || [];
    }

    getIcon() {
        const icon = this.current.icon;

        const ICON_BASE_URL = 'https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/';
        const iconURL = `${ICON_BASE_URL}${icon}.png`;
        
        console.log(`Icon URL: ${iconURL}`);
        
        return iconURL;
    }
}