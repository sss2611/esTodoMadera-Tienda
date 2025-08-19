document.addEventListener("DOMContentLoaded", function () {
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
    showConfirmButton: false, // 🔹 oculta el botón
    allowOutsideClick: true,  // 🔹 cerrar con clic afuera
    allowEscapeKey: true,     // 🔹 cerrar con tecla ESC
  }).then(() => {
    // Opcional: Si querés que también se cierre con Enter
    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        Swal.close();
      }
    });
  });
});

// Seleccionamos todas las imágenes con clase 'modal-trigger'
const modalImages = document.querySelectorAll('.modal-trigger');
const modalImage = document.getElementById('modalImage');

modalImages.forEach(img => {
  img.addEventListener('click', () => {
    modalImage.src = img.src; // Cambia la imagen del modal
    const myModal = new bootstrap.Modal(document.getElementById('productModal'));
    myModal.show();
    modalImage.classList.remove('zoomed'); // Quitamos zoom si estaba activo
  });
});

// Zoom al hacer click en la imagen del modal
modalImage.addEventListener('click', () => {
  modalImage.classList.toggle('zoomed');
});
