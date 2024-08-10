// component: carousel

export function initializeCarousel() {
    const nextButton = document.querySelector('#next');
    const carouselSevendays = document.querySelector('.carousel-sevendays');
    const cards = carouselSevendays.querySelectorAll('.carousel-card');

    const totalItems = cards.length;

    let currentIndex = 0; // Start with the middle item

    function updateCarousel() {
        cards.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('center');
            } else {
                item.classList.remove('center');
            }
            // Adjust the position of items to stack them
            // item.style.transform = `translateX(${(index - currentIndex) * 10}px)`; // Adjust translateX value as needed
        });
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });


    updateCarousel();
}