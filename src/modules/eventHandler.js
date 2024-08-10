// eventHandler.js
import { setUnitGroup } from './config.js';
import { validateInput } from './validateForm.js';

// Unit (imperial/metric) handler.
export function unitToggle(unitButtons, onUnitChange){
    unitButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'selected' class from all buttons
            unitButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add 'selected' class to the clicked button
            button.classList.add('selected');
            
            // Update unitGroup
            const selectedUnit = button.getAttribute('data-unit');
            setUnitGroup(selectedUnit);

            if (typeof onUnitChange === 'function') {
                onUnitChange(); // Call the callback to re-initialize
            }
        });
    });
}


// User entered location handler.
export function searchLocation(location, onSubmit){
    location.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission

            if (validateInput(location)) { // Validate the input
                console.log(location.value);
                onSubmit(location.value);
            } else {
                console.log('Input is invalid'); // Log or handle invalid input case
            }
        }
    })
}