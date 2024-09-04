const foodItem = document.getElementById('food-item');
const productImage = document.getElementById('product-image');
const toppings = document.querySelectorAll('input[type="checkbox"]');
const size = document.getElementById('size');
const addToCartBtn = document.getElementById('add-to-cart');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.modal .close');
const cartIcon = document.getElementById('cart-icon');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElem = document.getElementById('total-price');
const clearCartBtn = document.getElementById('clear-cart');
const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout');

const itemPrices = {
      //Product Main Page
      "Chicken Kota": 29.99,
      "Hunger Games Kota": 31.99,
      "Kasi Select": 18.99,
      "Beacon Kota": 22.99,
      "Buntu Kota": 24.99,
      "Pap & Mala": 39.99,
      "Grilled Full Chicken": 99.99,
      "Pap & Mogodu": 49.99,
      "Grilled Full Chicken & Chips": 149.99,
      "Double Grilled Thighs": 59.99,
      "Hake & Chips": 109.99,
      "Pap & Stew": 59.99,
      
      //Product Category Page
      
      //Add-ons
      "Xtra Cheese": 4,
      "Achaar": 2,
      "Chakalaka": 5,
      "Egg": 3,
      //Size
      "Regular": 0,
      "Medium": 20,
      "Fully Loaded": 40, 
      //Delivery
      "Pickup": 0,
      "Yes": 10,
};

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateProductImage() {
    const selectedOption = foodItem.options[foodItem.selectedIndex];
    productImage.src = selectedOption.getAttribute('data-image');
}

function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        cartItemsList.innerHTML += `<li>${item.name} - R${item.price.toFixed(2)}</li>`;
        totalPrice += item.price;
    });

    totalPriceElem.textContent = totalPrice.toFixed(2);
}

function addToCart() {
    const selectedFood = foodItem.value;
    const selectedSize = size.value;
    let totalPrice = itemPrices[selectedFood] + itemPrices[selectedSize];
    
    const selectedToppings = Array.from(toppings)
        .filter(topping => topping.checked)
        .map(topping => {
            totalPrice += itemPrices[topping.value];
            return {
                name: topping.value,
                price: itemPrices[topping.value]
            };
        });

    cart.push({
        name: `${selectedFood} (${selectedSize})`,
        price: totalPrice
    });

    selectedToppings.forEach(topping => {
        cart.push(topping);
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartDisplay();
}

function sendWhatsAppCheckout() {
    const phoneNumber = '27726962588'; // Replace with the actual phone number
    const message = cart.map(item => `${item.name}: R${item.price.toFixed(2)}`).join(' ');
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(`My Order: ${message} Total Price: R${totalPrice}`)}`;
    window.open(url, '_blank');
}

addToCartBtn.addEventListener('click', addToCart);

cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    updateCartDisplay();
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

clearCartBtn.addEventListener('click', clearCart);
whatsappCheckoutBtn.addEventListener('click', sendWhatsAppCheckout);

foodItem.addEventListener('change', updateProductImage);

//Footer Humburger
function toggleMenu() {
    document.getElementById('popupMenu').classList.toggle('show');
}
