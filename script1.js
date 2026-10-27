let cart = [];


/* ================= ELEMENTS ================= */

const addButtons =
    document.querySelectorAll(".add-btn");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const subtotal =
    document.getElementById("subtotal");

const total =
    document.getElementById("total");

const searchInput =
    document.getElementById("searchInput");

const productCards =
    document.querySelectorAll(".product-card");

const menuSections =
    document.querySelectorAll(".menu-section");



/* ================= ADD TO CART ================= */

addButtons.forEach(button => {

    button.addEventListener("click", function () {

        const card =
            this.closest(".product-card");

        const name =
            card.dataset.name;

        const price =
            Number(card.dataset.price);


        const existing =
            cart.find(item => item.name === name);


        if (existing) {

            existing.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }


        updateCart();


        this.innerHTML =
            "Added ✓";


        setTimeout(() => {

            this.innerHTML =
                "Add +";

        }, 800);

    });

});



/* ================= UPDATE CART ================= */

function updateCart() {

    cartItems.innerHTML = "";


    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach((item, index) => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <span class="cart-item-name">
                    ${item.name}
                </span>

                <span class="cart-item-price">
                    ₹${item.price} × ${item.quantity}
                </span>

            </div>


            <button
                class="remove-item"
                onclick="removeItem(${index})">

                <i class="fa-solid fa-xmark"></i>

            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.innerText =
        totalItems;


    subtotal.innerText =
        totalPrice.toFixed(2);


    total.innerText =
        totalPrice.toFixed(2);


    if (cart.length > 0) {

        emptyCart.style.display =
            "none";

        cartItems.style.display =
            "block";

    } else {

        emptyCart.style.display =
            "flex";

        cartItems.style.display =
            "none";

    }

}



/* ================= REMOVE ITEM ================= */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}



/* ================= CATEGORY FILTER ================= */

const sideCategories =
    document.querySelectorAll(".side-category");


sideCategories.forEach(category => {

    category.addEventListener("click", function () {

        const selected =
            this.dataset.category;


        sideCategories.forEach(item => {

            item.classList.remove(
                "active-category"
            );

        });


        this.classList.add(
            "active-category"
        );


        filterCategory(selected);

    });

});



/* ================= FILTER CATEGORY ================= */

function filterCategory(category) {

    searchInput.value = "";


    productCards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });


    menuSections.forEach(section => {

        const sectionCategory =
            section.dataset.section;


        if (
            category === "all" ||
            sectionCategory === category
        ) {

            section.style.display =
                "block";

        } else {

            section.style.display =
                "none";

        }

    });


    updateItemCount();

}



/* ================= CATEGORY CARDS ================= */

const categoryCards =
    document.querySelectorAll(
        ".category-card"
    );


categoryCards.forEach(card => {

    card.addEventListener("click", function () {

        const category =
            this.dataset.categoryCard;


        filterCategory(category);


        sideCategories.forEach(item => {

            item.classList.remove(
                "active-category"
            );


            if (
                item.dataset.category ===
                category
            ) {

                item.classList.add(
                    "active-category"
                );

            }

        });


        document
            .getElementById("menu")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});



/* ================= SHOW ALL ================= */

function showAllItems() {

    filterCategory("all");


    sideCategories.forEach(item => {

        item.classList.remove(
            "active-category"
        );

    });


    sideCategories[0]
        .classList.add(
            "active-category"
        );

}



/* ================= SEARCH ================= */

searchInput.addEventListener(
    "input",
    function () {

        const search =
            this.value
                .toLowerCase()
                .trim();


        menuSections.forEach(section => {

            let visibleItems = 0;


            const cards =
                section.querySelectorAll(
                    ".product-card"
                );


            cards.forEach(card => {

                const name =
                    card.dataset.name
                        .toLowerCase();


                if (
                    name.includes(search)
                ) {

                    card.style.display =
                        "";

                    visibleItems++;

                } else {

                    card.style.display =
                        "none";

                }

            });


            if (
                search === "" ||
                visibleItems > 0
            ) {

                section.style.display =
                    "block";

            } else {

                section.style.display =
                    "none";

            }

        });


        updateItemCount();

    }
);



/* ================= ITEM COUNT ================= */

function updateItemCount() {

    let count = 0;


    productCards.forEach(card => {

        if (
            card.style.display !==
            "none"
        ) {

            count++;

        }

    });


    document.getElementById(
        "itemCount"
    ).innerText =
        count + " Items";

}



/* ================= CART BUTTON ================= */

document
    .getElementById("cartButton")
    .addEventListener("click", function () {

        document
            .getElementById("cartSection")
            .scrollIntoView({
                behavior: "smooth"
            });

    });



/* ================= VIEW CART ================= */

document
    .getElementById("viewCart")
    .addEventListener("click", function () {

        if (cart.length === 0) {

            alert(
                "Your cart is empty!"
            );

        } else {

            alert(
                "You have " +
                cart.length +
                " different item(s) in your cart."
            );

        }

    });



/* ================= CHECKOUT ================= */

document
    .getElementById("checkout")
    .addEventListener("click", function () {

        if (cart.length === 0) {

            alert(
                "Please add an item to your cart first."
            );

        } else {

            alert(
                "Your order is ready for checkout!"
            );

        }

    });



/* ================= SCROLL TO MENU ================= */

function scrollToMenu() {

    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* ================= INITIAL COUNT ================= */

updateItemCount();