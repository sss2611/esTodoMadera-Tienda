// ===============================
// main.js
// ===============================

// 🛒 Carrito
let cart = [];

// Actualizar ícono del carrito (desktop y mobile)
function updateCartCount() {
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    document.getElementById("cartCount").textContent = totalItems;
    document.getElementById("cartCountNav").textContent = totalItems;
}

// Renderizar carrito en el modal
function renderCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p>Tu carrito está vacío.</p>`;
        return;
    }

    const list = document.createElement("ul");
    list.classList.add("list-group");

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.innerHTML = `
            <span>${item.name} x${item.qty}</span>
            <div>
                <span class="fw-bold me-3">$${(item.price * item.qty).toLocaleString()}</span>
                <button class="btn btn-sm btn-danger remove-item" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        list.appendChild(li);
    });

    cartItemsContainer.appendChild(list);

    // Botón eliminar
    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = e.currentTarget.dataset.index;
            cart.splice(idx, 1);
            updateCartCount();
            renderCart();
        });
    });
}

// Agregar al carrito
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const name = e.target.dataset.name;
        const price = parseInt(e.target.dataset.price);

        const item = cart.find(p => p.name === name);
        if (item) {
            item.qty++;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        updateCartCount();
        renderCart();

        Swal.fire({
            icon: "success",
            title: "¡Agregado al carrito!",
            text: `${name} fue agregado.`,
            timer: 1200,
            showConfirmButton: false
        });
    });
});

// ✅ Checkout (WhatsApp)
document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
        Swal.fire("Tu carrito está vacío", "", "warning");
        return;
    }

    let message = "🛒 *Pedido esTodoMadera...*%0A%0A";
    cart.forEach(item => {
        message += `• ${item.name} x${item.qty} = $${(item.price * item.qty).toLocaleString()}%0A`;
    });
    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    message += `%0A💰 *Total:* $${total.toLocaleString()}`;

    const phone = "5491112345678"; // <-- coloca aquí tu número real con código de país
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, "_blank");
});

// 📷 Modal imágenes
const modalImage = document.getElementById("modalImage");
document.querySelectorAll(".modal-trigger").forEach(img => {
    img.addEventListener("click", () => {
        modalImage.src = img.src;
        const productModal = new bootstrap.Modal(document.getElementById("productModal"));
        productModal.show();
    });
});

// ⬆️ Scroll to top
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.remove("d-none");
    } else {
        scrollTopBtn.classList.add("d-none");
    }
});
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// 🎉 Bienvenida con SweetAlert2
document.addEventListener("DOMContentLoaded", () => {
    Swal.fire({
        title: "¡Hola, bienvenido a esTodoMadera!",
        text: "🛋️ Descubrí nuestros muebles y promociones.",
        imageUrl: "static/img/ES-CIRC.png",
        imageWidth: 120,
        confirmButtonText: "Entrar",
        confirmButtonColor: "#fb8500"
    });
});
