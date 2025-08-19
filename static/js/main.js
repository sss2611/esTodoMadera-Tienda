// // Seleccionamos todas las imágenes con clase 'modal-trigger'
// const modalImages = document.querySelectorAll('.modal-trigger');
// const modalImage = document.getElementById('modalImage');

// modalImages.forEach(img => {
//   img.addEventListener('click', () => {
//     modalImage.src = img.src; // Cambia la imagen del modal
//     const myModal = new bootstrap.Modal(document.getElementById('productModal'));
//     myModal.show();
//     modalImage.classList.remove('zoomed'); // Quitamos zoom si estaba activo
//   });
// });

// // Zoom al hacer click en la imagen del modal
// modalImage.addEventListener('click', () => {
//   modalImage.classList.toggle('zoomed');
// });


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
