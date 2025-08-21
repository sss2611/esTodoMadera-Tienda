document.addEventListener("DOMContentLoaded", function () {
  // 🟢 Bienvenida con SweetAlert
  Swal.fire({
    title: "¡Hola...! Bienvenido a esTodoMadera!",
    html: `
        <p style="margin:8px 0;">🕒 Horarios de atención</p>
        <p>Lunes a Viernes: 9:00 a 18:00</p>
      `,
    imageUrl: "static/img/ES-CIRC.png",
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Logo esTodoMadera",
    showConfirmButton: false,
    allowOutsideClick: true,
    allowEscapeKey: true,
  }).then(() => {
    // Permitir cerrar con Enter
    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        Swal.close();
      }
    });
  });

  // 🟢 Carrito de compras
  let cart = [];

  // Botones "Agregar al carrito"
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));

      // Verificar si ya existe
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      renderCart();
    });
  });

  // Renderizar carrito
  function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');

    cartItems.innerHTML = '';

    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Tu carrito está vacío.</p>';
      cartCount.textContent = 0; // 🔴 reset contador
      return;
    }

    // Mostrar los productos en el modal
    cart.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('cart-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2');
      div.innerHTML = `
      <span>${item.quantity} x ${item.name} - $${item.price * item.quantity}</span>
      <div>
        <input type="number" min="1" value="${item.quantity}" 
               class="form-control d-inline-block w-auto me-2"
               onchange="updateQuantity(${index}, this.value)">
        <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">X</button>
      </div>
    `;
      cartItems.appendChild(div);
    });

    // 🔵 Actualizar número del pedido en el ícono
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;
  }


  // Hacer accesibles las funciones al global (para los botones en HTML)
  window.updateQuantity = function (index, qty) {
    cart[index].quantity = parseInt(qty);
    renderCart();
  }

  window.removeItem = function (index) {
    cart.splice(index, 1);
    renderCart();
  }

  // 🟢 Finalizar compra en WhatsApp
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) return;

    let message = "¡Hola! Quiero realizar este pedido:\n\n";
    cart.forEach(item => {
      message += `${item.quantity} x ${item.name} - $${item.price * item.quantity}\n`;
    });

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    message += `\nTOTAL: $${total}`;

    // ⚠️ Reemplaza con tu número real en formato internacional (ej: 5493811234567)
    const phone = "5493854864263";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });

  // 🟢 Modal de imágenes
  const modalImages = document.querySelectorAll('.modal-trigger');
  const modalImage = document.getElementById('modalImage');
  if (modalImage) {
    modalImages.forEach(img => {
      img.addEventListener('click', () => {
        modalImage.src = img.src;
        const myModal = new bootstrap.Modal(document.getElementById('productModal'));
        myModal.show();
        modalImage.classList.remove('zoomed');
      });
    });

    // Zoom al hacer click en la imagen del modal
    modalImage.addEventListener('click', () => {
      modalImage.classList.toggle('zoomed');
    });
  }
});

// === Botón Scroll Arriba ===
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) { 
    scrollTopBtn.style.display = "flex";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
