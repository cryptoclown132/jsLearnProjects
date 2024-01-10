// Optional: You can use JavaScript to dynamically create the explosive element.
// In this example, the explosive element is created in the HTML file.

// Get the explosive element
const explosiveElement = document.querySelector('.explosive');

// Optional: Add an event listener to trigger the explosive animation on a user action
document.addEventListener('click', () => {
    // Add a class to trigger the explosion animation
    explosiveElement.classList.add('explode');
});
