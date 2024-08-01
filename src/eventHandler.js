// eventHandler.js
import { setUnitGroup } from './config.js';


// Unit (imperial/metric) handler.
export function unitToggle(unitButtons, onUnitChange){
    unitButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'selected' class from all buttons
            unitButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add 'selected' class to the clicked button
            button.classList.add('selected');
            
            // Optionally, you can perform actions here, such as updating a setting
            const selectedUnit = button.getAttribute('data-unit');
            setUnitGroup(selectedUnit);

            if (typeof onUnitChange === 'function') {
                onUnitChange(); // Call the callback to re-initialize
            }
        });
    });
}


// User entered location hanlder.
export function searchLocation(location, onSubmit){
    location.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            console.log(location.value);
            event.preventDefault();
            onSubmit(location.value);
        }
    })
}