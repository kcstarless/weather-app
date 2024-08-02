// errorHandler.js

export function handleApiError(error) {
    console.error('API Error:', error.message);
    alert(`API Error: ${error.message}`);
}

export function handleHttpError(status) {
    console.error(`HTTP Error! Status: ${status}`);
    alert(`HTTP Error! Status: ${status}`);
}

export function handleGenericError(error) {
    console.error('Error:', error.message);
    alert(`Error: ${error.message}`);
}