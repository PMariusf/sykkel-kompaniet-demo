
const products = [
  {brand:"SHIMANO", title:"Shimano XT CS-M8100 Kassett 12-delt (10–51T)", price:"1 799 kr", icon:"⚙"},
  {brand:"SRAM", title:"SRAM GX Eagle Kjede 12-delt", price:"499 kr", icon:"⛓"},
  {brand:"SHIMANO", title:"Shimano RT-MT800 Bremseskive 180 mm", price:"549 kr", icon:"◉"},
  {brand:"CONTINENTAL", title:"Continental Trail King 29 × 2.4 Dekk", price:"699 kr", icon:"◯"},
  {brand:"SHIMANO", title:"Shimano XT RD-M8100 Bakgir 12-delt", price:"1 299 kr", icon:"⚙"},
  {brand:"SRAM", title:"SRAM GX Eagle Kranksett 175 mm", price:"1 999 kr", icon:"✦"},
  {brand:"RACE FACE", title:"Race Face Chester Pedaler", price:"649 kr", icon:"▣"},
  {brand:"SCHWALBE", title:"Schwalbe Racing Ray 29 × 2.25", price:"599 kr", icon:"◯"}
];

const grid = document.getElementById("productGrid");
const search = document.getElementById("searchInput");
let cart = 0;

function render(list){
  grid.innerHTML = list.map((p,i)=>`
    <article class="product-card">
      <div class="product-image" data-icon="${p.icon}"></div>
      <div class="product-content">
        <span class="product-brand">${p.brand}</span>
        <div class="product-title">${p.title}</div>
        <div class="product-price">${p.price}</div>
        <div class="stock">● På lager</div>
        <button class="btn primary add-cart" data-index="${i}">🛒 Legg i handlekurv</button>
      </div>
    </article>
  `).join("");
  document.querySelectorAll(".add-cart").forEach(btn=>{
    btn.addEventListener("click",()=>{
      cart++;
      document.getElementById("cartCount").textContent = cart;
      const toast = document.getElementById("toast");
      toast.classList.add("show");
      setTimeout(()=>toast.classList.remove("show"),1300);
    })
  })
}
render(products);

search.addEventListener("input", e=>{
  const q = e.target.value.toLowerCase();
  render(products.filter(p => (p.brand+" "+p.title).toLowerCase().includes(q)));
});

document.getElementById("menuBtn").addEventListener("click", ()=>{
  document.getElementById("mobileNav").classList.toggle("open");
});

document.getElementById("newsletterForm").addEventListener("submit", e=>{
  e.preventDefault();
  alert("Demo: nyhetsbrev er ikke koblet til ennå.");
});
