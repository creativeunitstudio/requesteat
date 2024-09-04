document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.modal .close');
    const clearCartButton = document.getElementById('clear-cart');
    const checkoutButton = document.getElementById('checkout-button');
    const cartItemsList = document.getElementById('cart-items');
    let cart = []; 

    // Load cart from local storage
    function loadCart() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            updateCart();
        }
    }

    // Save cart to local storage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Open cart modal
    cartButton.addEventListener('click', function() {
        cartModal.style.display = 'block';
    });

    // Clear cart
    clearCartButton.addEventListener('click', function() {
        cart = [];
        saveCart(); // Save the empty cart
        updateCart();
    });

    // Close cart modal
    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            const name = product.querySelector('h2').textContent;
            const price = parseFloat(product.getAttribute('data-price'));
            cart.push({ name, price });
            saveCart(); // Save the updated cart
            updateCart();
        });
    });

    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price;
            cartItemsList.innerHTML += `<li>${item.name} - R${item.price.toFixed(2)}</li>`;
        });
        cartButton.textContent = `Cart (${cart.length}) - R${total.toFixed(2)}`;
    }

    // Checkout via WhatsApp
    checkoutButton.addEventListener('click', function() {
        let message = 'I would like to purchase the following items:\n';
        cart.forEach(item => {
            message += `${item.name} - R${item.price.toFixed(2)}\n`;
        });
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        message += `\nTotal: R${total.toFixed(2)}`;
        window.open(`https://wa.me/27726962588?text=${encodeURIComponent(message)}`, '_blank');
    });

    // Initialize the cart when the page loads
    loadCart();
});

// The rest of your code remains unchanged

// Example for the rest of your script, like modals and form handling, etc.

function filterProducts() {
    // Get the search input value
    const searchValue = document.getElementById('search-input').value.toLowerCase();

    // Get all products
    const products = document.querySelectorAll('#products .product');

    // Loop through each product
    products.forEach(product => {
        // Get the product name and description
        const productName = product.querySelector('h2').textContent.toLowerCase();
        const productDescription = product.querySelector('h5').textContent.toLowerCase();

        // Check if the search value matches the product name or description
        if (productName.includes(searchValue) || productDescription.includes(searchValue)) {
            product.style.display = ''; // Show the product
        } else {
            product.style.display = 'none'; // Hide the product
        }
    });
}
document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', icon.dataset.link);
    });

    icon.addEventListener('click', (e) => {
        window.location.href = icon.dataset.link;
    });
});


// Get the modal
var modal = document.getElementById("signupModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to show the modal
function showModal() {
    modal.style.display = "block";
}

// Set a 30-second delay before showing the modal
window.onload = function() {
    setTimeout(showModal, 15000); // 15000 milliseconds = 15 seconds
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission
document.getElementById('signupForm').onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var whatsapp = document.getElementById('whatsapp').value;

    // Create a WhatsApp link with the form data
    var message = `*New Sign-Up*\nName: ${name}\nEmail: ${email}\nWhatsApp Number: ${whatsapp}`;
    var whatsappLink = `https://wa.me/27726962588?text=${encodeURIComponent(message)}`;

    // Open WhatsApp with the pre-filled message
    window.open(whatsappLink, '_blank');

    // Optionally, close the modal after submission
    modal.style.display = "none";
}

let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    slideIndex++;
    
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].style.display = "block";  
    
    setTimeout(showSlides, 4000); // Change slide every 3 seconds
}

showSlides(); // Initialize the slideshow

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.view-details');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.item');
            const itemId = item.getAttribute('data-item-id');
            alert(`Viewing details for item ID: ${itemId}`);
            // Replace alert with actual navigation or detail view logic
            // window.location.href = `item-details.html?id=${itemId}`;
        });
    });
});

// script.js
const ads = [
    {
        image: '1.jpg',
        title: 'Exclusive Discount!',
        text: 'Get 20% off on your next order. Use code SAVE20.',
        link: '#'
    },
    {
        image: '1.jpg',
        title: 'New Menu Items!',
        text: 'Try our new dishes and enjoy a special offer.',
        link: '#'
    },
    {
        image: 'ad3.jpg',
        title: 'Limited Time Offer!',
        text: 'Order now and get a free dessert with every meal.',
        link: '#'
    },
    {
        image: 'ad4.jpg',
        title: 'Order Now & Save!',
        text: 'Enjoy free delivery on orders over $30.',
        link: '#'
    }
];

function getRandomAd() {
    const randomIndex = Math.floor(Math.random() * ads.length);
    return ads[randomIndex];
}

function showPopup() {
    const ad = getRandomAd();
    const popup = document.getElementById('popupAd');
    document.getElementById('popupImage').src = ad.image;
    document.getElementById('popupTitle').textContent = ad.title;
    document.getElementById('popupText').textContent = ad.text;
    document.getElementById('popupButton').href = ad.link;
    popup.style.display = 'flex';
}

function closePopup() {
    document.getElementById('popupAd').style.display = 'none';
}

// Display popup after 10 seconds
setTimeout(showPopup, 10000);

//Footer Humburger
function toggleMenu() {
    document.getElementById('popupMenu').classList.toggle('show');
}

//Regitration Form 

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const locationField = document.getElementById('location');
    
    // Here you might want to use a service like Google Maps API to convert latitude and longitude to a human-readable address
    locationField.value = `Lat: ${lat}, Lon: ${lon}`;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function submitForm() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    
    // Convert form data to query string
    let queryString = '';
    formData.forEach((value, key) => {
        queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
    });

    // WhatsApp API URL (customize with your WhatsApp number)
    const whatsappNumber = '27726962588';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(queryString)}`;

    window.location.href = whatsappUrl;
}


//Product Filter 
// Function to apply filters
function applyFilters() {
    const category = document.getElementById('category').value;
    
    const products = document.querySelectorAll('#products .product');

    products.forEach(product => {
        const productCategory = product.querySelector('h6').textContent.toLowerCase(); // You may need to adjust this to match your actual category logic

        let showProduct = true;

        // Category Filter
        if (category && !productCategory.includes(category)) {
            showProduct = false;
        }

        // Show or hide the product
        product.style.display = showProduct ? 'block' : 'none';
    });
}

// Initialize the filter functionality when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Apply filters on form submission
    document.getElementById('filter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        applyFilters();
    });
});
