const state = { quantity: 1, inCart: false };
const $ = (selector) => document.querySelector(selector);
const qty = $('#quantity');
const cartCount = $('#cartCount');
const cartPanel = $('#cartPanel');
const overlay = $('#overlay');
const cartItems = $('#cartItems');

function renderCart() {
  cartCount.textContent = state.inCart ? state.quantity : '0';
  cartItems.innerHTML = state.inCart
    ? `<div class="cart-row"><img src="assets/maletin-tapa.png" alt="Maletín PIVUX"><div><h3>Maletín portamateriales PIVUX</h3><p>Cantidad: ${state.quantity}</p><p>Precio por confirmar</p></div></div>`
    : '<p class="empty">Tu bolsa está vacía.</p>';
}
function openCart() { cartPanel.classList.add('open'); overlay.classList.add('open'); }
function closeCart() { cartPanel.classList.remove('open'); overlay.classList.remove('open'); }
document.querySelectorAll('[data-quantity]').forEach(button => button.addEventListener('click', () => { state.quantity = Math.max(1, state.quantity + Number(button.dataset.quantity)); qty.textContent = state.quantity; }));
$('#addToCart').addEventListener('click', () => { state.inCart = true; renderCart(); openCart(); });
$('#buyNow').addEventListener('click', () => { state.inCart = true; renderCart(); $('#checkoutDialog').showModal(); });
$('#openCart').addEventListener('click', openCart); $('#closeCart').addEventListener('click', closeCart); overlay.addEventListener('click', closeCart);
$('#checkout').addEventListener('click', () => { closeCart(); if (!state.inCart) { $('#addToCart').click(); return; } $('#checkoutDialog').showModal(); });
$('#closeDialog').addEventListener('click', () => $('#checkoutDialog').close());
$('#checkoutForm').addEventListener('submit', (event) => { event.preventDefault(); $('#formNote').textContent = 'Solicitud registrada en esta demostración. Configura el precio y la pasarela de pago para procesar compras reales.'; });
$('#menuButton').addEventListener('click', () => { document.querySelector('nav').classList.toggle('mobile-open'); });
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => document.querySelector('nav').classList.remove('mobile-open')));
$('#year').textContent = new Date().getFullYear();
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const productViews = {
  perspective: { src: 'assets/producto-caja-completo-1.png', alt: 'Vista en perspectiva completa del maletín PIVUX', caption: 'VISTA / PERSPECTIVA' },
  front: { src: 'assets/producto-caja-completo-2.png', alt: 'Vista frontal completa del maletín PIVUX', caption: 'VISTA / FRONTAL' },
  side: { src: 'assets/producto-caja-completo-3.png', alt: 'Vista lateral completa del maletín PIVUX', caption: 'VISTA / LATERAL' },
  lid: { src: 'assets/producto-caja-completo-4.png', alt: 'Vista completa de la tapa del maletín PIVUX', caption: 'VISTA / TAPA' },
  drawers: { src: 'assets/producto-caja-completo-5.png', alt: 'Vista completa de compartimientos laterales del maletín PIVUX', caption: 'VISTA / COMPARTIMIENTOS' },
};
const viewerImage = $('#viewerImage');
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  const view = productViews[button.dataset.view];
  viewerImage.style.opacity = '0';
  setTimeout(() => {
    viewerImage.src = view.src;
    viewerImage.alt = view.alt;
    viewerImage.style.objectPosition = 'center';
    viewerImage.classList.remove('detail-view');
    viewerImage.style.opacity = '1';
  }, 150);
  $('#viewerCaption').textContent = view.caption;
  document.querySelectorAll('[data-view]').forEach(tab => { tab.classList.toggle('active', tab === button); tab.setAttribute('aria-selected', String(tab === button)); });
}));

$('#openMascot').addEventListener('click', () => $('#mascotDialog').showModal());
$('#closeMascot').addEventListener('click', () => $('#mascotDialog').close());
renderCart();


// Regreso suave al inicio desde el botón flotante PIVUX.
document.querySelector('.pivux-home-button')?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
