
// Mobile Navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
    });
});

// Shopping Cart
let cart = [];

const cartButton = document.getElementById("cartButton");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

// Add items to cart
document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();

        // Button animation
        button.innerHTML = '<i class="fas fa-check"></i>';

        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-plus"></i>';
        }, 800);
    });

});

// Update cart display
function updateCart() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    cartCount.textContent = totalItems;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty!</p>';

    }

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        const details = document.createElement("p");
        details.textContent =
            `${item.name} × ${item.quantity} - ₹${item.price * item.quantity}`;

        const removeButton = document.createElement("button");
        removeButton.innerHTML = '<i class="fas fa-trash"></i>';
        removeButton.setAttribute("aria-label", `Remove ${item.name}`);

        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCart();
        });

        cartItem.append(details, removeButton);
        cartItems.appendChild(cartItem);

    });

    cartTotal.textContent = total;
}

// Open Cart
cartButton.addEventListener("click", () => {
    cartModal.classList.add("active");
});

// Close Cart
closeCart.addEventListener("click", () => {
    cartModal.classList.remove("active");
});

// Close cart when clicking outside
cartModal.addEventListener("click", (event) => {

    if (event.target === cartModal) {
        cartModal.classList.remove("active");
    }

});

// Checkout
document.getElementById("checkoutBtn").addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your cart is empty! Please add some delicious food.");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    alert(`Thank you for your order! Your total is ₹${total}.`);

    cart = [];
    updateCart();

    cartModal.classList.remove("active");

});

// Contact Form
document.getElementById("contactForm").addEventListener("submit", (event) => {

    event.preventDefault();

    alert("Thank you for contacting Foodie! We will get back to you soon.");

    event.target.reset();

});
