const products = [
  {id:1,brand:"SHIMANO",title:"Shimano XT CS-M8100 Kassett 12-delt",price:1799,icon:"⚙",category:"Drivverk",meta:"10–51T",stock:true},
  {id:2,brand:"SRAM",title:"SRAM GX Eagle Kjede 12-delt",price:499,icon:"⛓",category:"Drivverk",meta:"12-delt",stock:true},
  {id:3,brand:"SHIMANO",title:"Shimano RT-MT800 Bremseskive 180 mm",price:549,icon:"◎",category:"Bremser",meta:"180 mm",stock:true},
  {id:4,brand:"CONTINENTAL",title:"Continental Trail King 29 × 2.4",price:699,icon:"◯",category:"Dekk",meta:"29 × 2.4",stock:true},
  {id:5,brand:"SHIMANO",title:"Shimano XT RD-M8100 Bakgir 12-delt",price:1299,icon:"⚙",category:"Drivverk",meta:"12-delt",stock:true},
  {id:6,brand:"SRAM",title:"SRAM GX Eagle Kranksett 175 mm",price:1999,icon:"✦",category:"Drivverk",meta:"175 mm",stock:false},
  {id:7,brand:"RACE FACE",title:"Race Face Chester Pedaler",price:649,icon:"▣",category:"Pedaler",meta:"Flat pedal",stock:true},
  {id:8,brand:"SCHWALBE",title:"Schwalbe Racing Ray 29 × 2.25",price:599,icon:"◯",category:"Dekk",meta:"29 × 2.25",stock:true}
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");
const drawer = document.getElementById("cartDrawer");
const backdrop = document.getElementById("drawerBackdrop");
let stockOnly = false;
let categoryFilter = "";
let cart = [];

const money = value => new Intl.NumberFormat("nb-NO").format(value) + " kr";

function renderProducts(){
  const q = searchInput.value.trim().toLowerCase();
  const brand = brandFilter.value;
  const filtered = products.filter(p => {
    const matchesSearch = !q || `${p.brand} ${p.title} ${p.category}`.toLowerCase().includes(q);
    const matchesBrand = !brand || p.brand === brand;
    const matchesStock = !stockOnly || p.stock;
    const matchesCategory = !categoryFilter || p.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesBrand && matchesStock && matchesCategory;
  });

  grid.innerHTML = filtered.length ? filtered.map(p => `
    <article class="product-card">
      <div class="product-image" data-icon="${p.icon}">
        <span class="product-badge">${p.stock ? "PÅ LAGER" : "BESTILLINGSVARE"}</span>
        <button class="wish" type="button" aria-label="Legg til favoritt">♡</button>
      </div>
      <div class="product-content">
        <span class="product-brand">${p.brand}</span>
        <div class="product-title">${p.title}</div>
        <div class="product-meta"><span>${p.category}</span><span>•</span><span>${p.meta}</span></div>
        <div class="product-price">${money(p.price)}</div>
        <div class="stock">${p.stock ? "● På lager" : "○ Bestillingsvare"}</div>
        <button class="btn primary add-cart" data-id="${p.id}" type="button">🛒 Legg i handlekurv</button>
      </div>
    </article>`).join("") : `<p class="muted">Ingen produkter matcher søket.</p>`;

  document.querySelectorAll(".add-cart").forEach(btn => btn.addEventListener("click", () => addToCart(Number(btn.dataset.id))));
}

function addToCart(id){
  const p = products.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);
  if(existing) existing.qty += 1; else cart.push({...p, qty:1});
  updateCart();
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1200);
}

function updateCart(){
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = count;
  cartTotal.textContent = money(cart.reduce((sum,item) => sum + item.price * item.qty, 0));
  cartItems.innerHTML = cart.length ? cart.map(item => `
    <div class="cart-item">
      <div class="cart-thumb">${item.icon}</div>
      <div><b>${item.title}</b><small>${item.qty} × ${money(item.price)}</small></div>
      <button class="remove-item" data-id="${item.id}" type="button" aria-label="Fjern">×</button>
    </div>`).join("") : `<p class="empty-cart">Handlekurven er tom.</p>`;
  document.querySelectorAll(".remove-item").forEach(btn => btn.addEventListener("click", () => {
    cart = cart.filter(item => item.id !== Number(btn.dataset.id));
    updateCart();
  }));
}

function openCart(){drawer.classList.add("open");backdrop.classList.add("show");drawer.setAttribute("aria-hidden","false")}
function closeCart(){drawer.classList.remove("open");backdrop.classList.remove("show");drawer.setAttribute("aria-hidden","true")}

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

searchInput.addEventListener("input", renderProducts);
brandFilter.addEventListener("change", renderProducts);

document.querySelectorAll(".filter-chip").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".filter-chip").forEach(x => x.classList.remove("active"));
  btn.classList.add("active");
  stockOnly = btn.dataset.stock === "stock";
  renderProducts();
}));

document.querySelectorAll(".category-card").forEach(btn => btn.addEventListener("click", () => {
  categoryFilter = btn.dataset.filter;
  if(["Hjul","Cockpit"].includes(categoryFilter)) categoryFilter = "";
  document.getElementById("produkter").scrollIntoView({behavior:"smooth"});
  renderProducts();
}));

function focusShopSearch(){
  document.getElementById("produkter").scrollIntoView({behavior:"smooth"});
  setTimeout(() => searchInput.focus(), 450);
}
document.getElementById("focusSearch").addEventListener("click", focusShopSearch);
document.getElementById("heroSearch").addEventListener("click", focusShopSearch);

document.getElementById("menuBtn").addEventListener("click", () => document.getElementById("mobileNav").classList.toggle("open"));
document.querySelectorAll("#mobileNav a").forEach(a => a.addEventListener("click", () => document.getElementById("mobileNav").classList.remove("open")));

document.getElementById("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Demo: nyhetsbrev er ikke koblet til ennå.");
});

const fitModal = document.getElementById("fitModal");
document.getElementById("fitButton").addEventListener("click", () => {fitModal.classList.add("open");fitModal.setAttribute("aria-hidden","false")});
document.getElementById("closeFit").addEventListener("click", () => {fitModal.classList.remove("open");fitModal.setAttribute("aria-hidden","true")});
document.getElementById("demoFitSearch").addEventListener("click", () => {
  document.getElementById("fitResult").textContent = "Demo: her kan vi senere koble ekte kompatibilitetsdata mot produktlageret.";
});
fitModal.addEventListener("click", e => {if(e.target === fitModal) fitModal.classList.remove("open")});

document.addEventListener("keydown", e => {if(e.key === "Escape"){closeCart();fitModal.classList.remove("open")}});

renderProducts();
updateCart();
