let cart = JSON.parse(localStorage.getItem("yummiesCart") || "[]");

const addButtons = document.querySelectorAll(".add-btn");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");
const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");
const menuSections = document.querySelectorAll(".menu-section");

addButtons.forEach(button => {
    button.addEventListener("click", function () {
        const card = this.closest(".product-card");
        const name = card.dataset.name;
        const price = Number(card.dataset.price);
        const existing = cart.find(item => item.name === name);
        if (existing) existing.quantity++;
        else cart.push({ name, price, quantity: 1 });
        updateCart();
        this.innerHTML = "Added ✓";
        setTimeout(() => { this.innerHTML = "Add +"; }, 800);
    });
});

function updateCart() {
    cartItems.innerHTML = "";
    let totalItems = 0;
    let totalPrice = 0;
    cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        const info = document.createElement("div");
        info.className = "cart-item-info";
        const name = document.createElement("span");
        name.className = "cart-item-name";
        name.textContent = item.name;
        const price = document.createElement("span");
        price.className = "cart-item-price";
        price.textContent = `₹${Number(item.price).toFixed(2)} × ${item.quantity}`;
        info.append(name, price);
        const remove = document.createElement("button");
        remove.className = "remove-item";
        remove.type = "button";
        remove.setAttribute("aria-label", `Remove ${item.name}`);
        remove.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        remove.addEventListener("click", () => removeItem(index));
        cartItem.append(info, remove);
        cartItems.appendChild(cartItem);
    });
    cartCount.innerText = totalItems;
    subtotal.innerText = totalPrice.toFixed(2);
    total.innerText = totalPrice.toFixed(2);
    emptyCart.style.display = cart.length ? "none" : "flex";
    cartItems.style.display = cart.length ? "block" : "none";
    localStorage.setItem("yummiesCart", JSON.stringify(cart));
}

function removeItem(index) {
    if (cart[index].quantity > 1) cart[index].quantity--;
    else cart.splice(index, 1);
    updateCart();
}

const sideCategories = document.querySelectorAll(".side-category");
sideCategories.forEach(category => {
    category.addEventListener("click", function () {
        const selected = this.dataset.category;
        sideCategories.forEach(item => item.classList.remove("active-category"));
        this.classList.add("active-category");
        filterCategory(selected);
    });
});

function filterCategory(category) {
    searchInput.value = "";
    productCards.forEach(card => {
        card.style.display = (category === "all" || card.dataset.category === category) ? "" : "none";
    });
    menuSections.forEach(section => {
        section.style.display = (category === "all" || section.dataset.section === category) ? "block" : "none";
    });
    updateItemCount();
}

const categoryCards = document.querySelectorAll(".category-card");
categoryCards.forEach(card => {
    card.addEventListener("click", function () {
        const category = this.dataset.categoryCard;
        filterCategory(category);
        sideCategories.forEach(item => {
            item.classList.toggle("active-category", item.dataset.category === category);
        });
        document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });
});

function showAllItems() {
    filterCategory("all");
    sideCategories.forEach(item => item.classList.remove("active-category"));
    if (sideCategories[0]) sideCategories[0].classList.add("active-category");
}

searchInput.addEventListener("input", function () {
    const search = this.value.toLowerCase().trim();
    menuSections.forEach(section => {
        let visibleItems = 0;
        section.querySelectorAll(".product-card").forEach(card => {
            const match = card.dataset.name.toLowerCase().includes(search);
            card.style.display = match ? "" : "none";
            if (match) visibleItems++;
        });
        section.style.display = (search === "" || visibleItems > 0) ? "block" : "none";
    });
    updateItemCount();
});

function updateItemCount() {
    let count = 0;
    productCards.forEach(card => { if (card.style.display !== "none") count++; });
    const countElement = document.getElementById("itemCount");
    if (countElement) countElement.innerText = count + " Items";
}

document.getElementById("cartButton").addEventListener("click", () => {
    document.getElementById("cartSection").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("viewCart").addEventListener("click", () => {
    if (!cart.length) alert("Your cart is empty!");
    else document.getElementById("cartSection").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("checkout").addEventListener("click", () => {
    if (!cart.length) {
        alert("Please add an item to your cart first.");
        return;
    }
    localStorage.setItem("yummiesCart", JSON.stringify(cart));
    localStorage.setItem("yummiesTotal", cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0).toFixed(2));
    window.location.href = "payment.html";
});

function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

updateCart();
updateItemCount();
