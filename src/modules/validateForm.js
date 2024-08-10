// validateForm.js
import { invalidSearch } from './errorHandler';

export function validateInput(input) {
    const searchInfo = input.nextElementSibling; // Assuming the span is the next sibling
    const validity = input.validity;
    const value = input.value

    const validCharactersPattern = /^[a-zA-Z,]+$/;

    if (!searchInfo) {
        console.error('Search info element not found.');
        return false;
    }

    if (validity.valueMissing) {
        invalidSearch('Location is required.');
        return false;
    } else if (validity.tooShort) {
        invalidSearch(`Location must be at least ${input.minLength} characters long.`);
        return false;
    } else if (!validCharactersPattern.test(value)) {
        invalidSearch('Location can only contain letters and commas.');
        return false;
    } else {
        invalidSearch(''); // Clear message if valid
        return true;
    }
}