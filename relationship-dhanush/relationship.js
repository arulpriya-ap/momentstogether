let activeRel = 'all';

// Hamburger opens side nav
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidenavbar').classList.toggle('translate-x-full');
});

// Close icon closes side nav
document.getElementById('closeicon').addEventListener('click', () => {
  document.getElementById('sidenavbar').classList.add('translate-x-full');
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeRel = btn.dataset.rel;
    applyFilters();
  });
});

function applyFilters() {
  const sort = document.getElementById('sort-filter').value;
  const cards = Array.from(document.querySelectorAll('#grid > div[data-rel]'));

  let visible = cards.filter(card => {
    return activeRel === 'all' || card.dataset.rel.includes(activeRel);
  });

  if (sort === 'price-asc') visible.sort((a, b) => +a.dataset.price - +b.dataset.price);
  if (sort === 'price-desc') visible.sort((a, b) => +b.dataset.price - +a.dataset.price);

  cards.forEach(c => c.style.display = 'none');
  visible.forEach(c => { c.style.display = 'block'; document.getElementById('grid').appendChild(c); });

  document.getElementById('result-count').textContent = visible.length;
  document.getElementById('no-results').style.display = visible.length === 0 ? 'block' : 'none';
}

function resetFilters() {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-rel="all"]').classList.add('active');
  activeRel = 'all';
  document.getElementById('sort-filter').value = 'featured';
  applyFilters();
}
