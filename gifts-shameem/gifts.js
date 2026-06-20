function toggleDD(id) {
  var el = document.getElementById(id);
  var isOpen = el.classList.contains("open");
  var all = document.querySelectorAll(".dd-wrap");
  for (var i = 0; i < all.length; i++) {
    all[i].classList.remove("open");
  }
  if (!isOpen) el.classList.add("open");
}

document.addEventListener("click", function (e) {
  if (!e.target.closest(".dd-wrap")) {
    var all = document.querySelectorAll(".dd-wrap");
    for (var i = 0; i < all.length; i++) {
      all[i].classList.remove("open");
    }
  }
});

var cartCount = 0;
var cartBtn = document.getElementById("cartBtn");
if (cartBtn) {
  cartBtn.addEventListener("click", function () {
    cartCount++;
    var badge = document.getElementById("cartBadge");
    badge.textContent = cartCount;
    badge.classList.add("visible");
  });
}

const products = [
  {
    name: "LOVE CONTRACT",
    price: 499,
    original: 625,
    cat: "romantic",
    img: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&q=80",
  },
  {
    name: "LOVE CHEQUE",
    price: 899,
    original: 1125,
    cat: "romantic-gifts",
    img: "https://plus.unsplash.com/premium_photo-1674068281218-4e2c8e09deb3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "LOVE YOU TO THE MOON AND BACK FRAME",
    price: 950,
    original: 1190,
    cat: "relationship-based",
    img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&q=80",
  },
  {
    name: "LOVE HAMPER BOX",
    price: 4999,
    original: 6250,
    cat: "hampers",
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80",
  },
  {
    name: "CLOSE TO HEART",
    price: 1050,
    original: 1315,
    cat: "long-distance",
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80",
  },
  {
    name: "LOVE FRAME",
    price: 950,
    original: 1190,
    cat: "romantic",
    img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500&q=80",
  },
  {
    name: "TOTALLY MY STORY",
    price: 2500,
    original: 3125,
    cat: "book-lovers",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80",
  },
  {
    name: "IT'S OUT THERE",
    price: 2500,
    original: 3125,
    cat: "travel",
    img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&q=80",
  },
];

let activeCat = "all";

function fmt(n) {
  return "₹ " + n.toLocaleString("en-IN");
}

function renderProducts() {
  let list = [...products];

  const min = parseInt(document.getElementById("minRange").value);
  const max = parseInt(document.getElementById("maxRange").value);
  list = list.filter((p) => p.price >= min && p.price <= max);

  if (activeCat !== "all") list = list.filter((p) => p.cat === activeCat);

  const sort = document.getElementById("sortSelect").value;
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);
  if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "za") list.sort((a, b) => b.name.localeCompare(a.name));

  document.getElementById("productCount").textContent =
    list.length + " products";

  document.getElementById("productsGrid").innerHTML = list
    .map((p) => {
      const save = Math.round((1 - p.price / p.original) * 100);
      return `
      <div class="product-card">
        <div class="card-img-wrap">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <span class="sale-badge">Sale</span>
        </div>
        <div class="card-name">${p.name}</div>
        <div class="card-pricing">
          <span class="price-original">${fmt(p.original)}</span>
          <span class="price-sale">${fmt(p.price)}</span>
          <span class="save-text">Save ${save}%</span>
        </div>
      </div>
    `;
    })
    .join("");
}

function updateRange() {
  let min = parseInt(document.getElementById("minRange").value);
  let max = parseInt(document.getElementById("maxRange").value);
  if (min > max) {
    const t = min;
    min = max;
    max = t;
  }

  document.getElementById("priceMinLabel").textContent = fmt(min);
  document.getElementById("priceMaxLabel").textContent = fmt(max);

  const pct1 = (min / 4999) * 100;
  const pct2 = (max / 4999) * 100;
  const fill = document.getElementById("rangeFill");
  fill.style.left = pct1 + "%";
  fill.style.width = pct2 - pct1 + "%";

  renderProducts();
}

function filterByCategory(checkbox) {
  document.querySelectorAll('#catList input[type="checkbox"]').forEach((cb) => {
    if (cb !== checkbox) cb.checked = false;
  });
  activeCat = checkbox.checked ? checkbox.dataset.cat : "all";
  renderProducts();
}

function toggleBlock(id) {
  document.getElementById(id).classList.toggle("collapsed");
}

updateRange();
renderProducts();
