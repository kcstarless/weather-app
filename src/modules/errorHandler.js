// errorHandler.js

export function handleApiError(error) {
    console.error('API Error:', error.message);
    // alert(`API Error: ${error.message}`);
}

export function handleHttpError(status) {
    console.error(`HTTP Error! Status: ${status}`);
    // alert(`HTTP Error! Status: ${status}`);
}

export function handleGenericError(error) {
    console.error('Error:', error.message);
    // alert(`Error: ${error.message}`);
}

export function invalidSearch(message){
    const msgContainer = document.querySelector(".search-info");
    msgContainer.textContent = message;
}

export function showMessage(message) {
    const searchInfo = document.querySelector('.search-info');
    if (searchInfo) {
        searchInfo.textContent = message;
    } else {
        console.error('Search info element not found.');
    }
}