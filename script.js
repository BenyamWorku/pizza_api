// Initialize the app on window load
window.onload = function() {
    initializeApp();
};

// Function to initialize the application
function initializeApp() {
    hideFavoriteButton(); // Initially hide the favorite button
    setFavoritePizzaFromLocalStorage(); // Set favorite pizza if it exists in localStorage
    addEventListeners(); // Attach event listeners
}

// Function to hide the favorite button
function hideFavoriteButton() {
    const favoritePizzaBtn = document.getElementById('favoritePizzaBtn');
    favoritePizzaBtn.style.display = 'none';
}

// Function to add event listeners
function addEventListeners() {
    document.getElementById('dataSelect').addEventListener('change', handlePizzaSelection);
    document.getElementById('favoritePizzaBtn').addEventListener('click', saveFavoritePizza);
}

// Function to handle pizza selection from the dropdown
function handlePizzaSelection() {
    const value = this.value;
    const favoritePizzaBtn = document.getElementById('favoritePizzaBtn');

    if (value) {
        fetchPizzaImage(value); // Fetch and display the pizza image
        favoritePizzaBtn.style.display = 'block'; // Show the favorite button
    } else {
        showDefaultImage(); // Show default image if no pizza selected
        hideFavoriteButton(); // Hide the favorite button for default image
    }
}

// Function to fetch and display the pizza image based on code
function fetchPizzaImage(code) {
    const imageUrl = `https://http.pizza/${code}.jpg`;

    const pizzaImage = document.getElementById('pizzaImage');
    pizzaImage.src = imageUrl; // Set the image source to the pizza image

    // Update the placeholder text
    document.getElementById('apiResult').querySelector('p').innerText = `Displaying pizza for HTTP code: ${code}`;
}

// Function to show default pizza image
function showDefaultImage() {
    const pizzaImage = document.getElementById('pizzaImage');
    pizzaImage.src = "media/freepizza.jpeg"; // Set default image source
    document.getElementById('apiResult').querySelector('p').innerText = "Pizza image will be displayed here...";
}

// Function to save the favorite pizza to localStorage
function saveFavoritePizza() {
    const code = document.getElementById('dataSelect').value;
    if (code) {
        localStorage.setItem('favoritePizza', code); // Save pizza code to localStorage
        alert(`Pizza for HTTP code ${code} saved as favorite!`);
    }
}

// Function to set favorite pizza from localStorage on page load
function setFavoritePizzaFromLocalStorage() {
    const favoritePizza = localStorage.getItem('favoritePizza');
    if (favoritePizza) {
        document.getElementById('dataSelect').value = favoritePizza; // Set dropdown to favorite pizza
        document.getElementById('dataSelect').dispatchEvent(new Event('change')); // Trigger change event to load pizza
    }
}
