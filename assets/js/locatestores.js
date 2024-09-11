document.addEventListener('DOMContentLoaded', () => {
    // Sample store data with coordinates, URLs, and images
    const stores = [
        { name: 'The Pozzie Fast Food', address: '176 Reverend R.T.J. Namane Dr', lat: 28.2388372, lng: -25.997612, page: '../index.html', image: '../assets/img/storeimage/store1.jpg' },
        { name: 'Poppys Kitchen', address: 'Section, 78 Ntozonke St, Sethokga', lat: 28.2423566, lng: -25.9993455, page: 'store2.html', image: '../assets/img/storeimage/store2.jpg' },
        { name: 'Chuff pozzy restaurant', address: '9 Iapetus St', lat: 28.237362, lng: -25.9989343, page: 'store3.html', image: '../assets/img/storeimage/store3.jpg' },
        { name: 'Store 4', address: '101 Oak St', lat: 40.760610, lng: -73.905242, page: 'store4.html', image: 'images/store4.jpg' },
        { name: 'Store 5', address: '202 Pine St', lat: 40.770610, lng: -73.895242, page: 'store5.html', image: 'images/store5.jpg' }
    ];

    const storeList = document.getElementById('store-list');
    const storeDetails = document.getElementById('store-details');
    const storeNameElem = document.getElementById('store-name');
    const storeAddressElem = document.getElementById('store-address');
    const storeDistanceElem = document.getElementById('store-distance');
    const storeImage = document.getElementById('store-image');
    const storeLink = document.getElementById('store-link');
    const closeDetailsButton = document.getElementById('close-details');

    let userLocation = { lat: 0, lng: 0 };

    // Function to calculate distance between two points using Haversine formula
    function calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLng = (lng2 - lng1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                  Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    function updateStoreList() {
        storeList.innerHTML = '';

        stores.forEach(store => {
            const distance = calculateDistance(userLocation.lat, userLocation.lng, store.lat, store.lng);
            store.distance = distance; // Add distance property to store
            
            const listItem = document.createElement('li');
            listItem.textContent = `${store.name} - ${store.distance.toFixed(2)} km`;
            listItem.addEventListener('click', () => {
                storeNameElem.textContent = store.name;
                storeAddressElem.textContent = store.address;
                storeDistanceElem.textContent = `${store.distance.toFixed(2)} km away`;
                storeImage.src = store.image;
                storeLink.href = store.page;
                storeDetails.classList.remove('hidden');
            });
            storeList.appendChild(listItem);
        });
    }

    function handleLocationSuccess(position) {
        userLocation.lat = position.coords.latitude;
        userLocation.lng = position.coords.longitude;
        updateStoreList();
    }

    function handleLocationError() {
        alert('Unable to retrieve your location. Default location used.');
        userLocation.lat = 40.730610; // Default location (New York City)
        userLocation.lng = -73.935242;
        updateStoreList();
    }

    closeDetailsButton.addEventListener('click', () => {
        storeDetails.classList.add('hidden');
    });

    // Request user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    } else {
        handleLocationError(); // Fallback if geolocation is not supported
    }
}); 

// Function to store the current page URL in sessionStorage
function storeCurrentPage() {
    sessionStorage.setItem('lastVisitedPage', window.location.href);
}

// Function to navigate to the last visited page if available
function navigateToLastVisitedPage() {
    const lastVisitedPage = sessionStorage.getItem('lastVisitedPage');
    if (lastVisitedPage && lastVisitedPage !== window.location.href) {
        window.location.href = lastVisitedPage;
    }
}

// Add event listeners for storing the current page and navigating on load
window.addEventListener('load', function() {
    storeCurrentPage();
    navigateToLastVisitedPage();
});
