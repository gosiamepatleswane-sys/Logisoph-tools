// Mobile navigation toggle
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// Dynamic footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Homepage search & category filtering
const searchInput = document.getElementById('toolSearch');
const categoryBtns = document.querySelectorAll('.cat-btn');
const toolCards = document.querySelectorAll('.tool-card');
const noResults = document.getElementById('noResults');

let currentCategory = 'all';

function filterTools() {
  if (!toolCards.length) return;
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  let visibleCount = 0;

  toolCards.forEach(card => {
    const category = card.getAttribute('data-category');
    const title = card.querySelector('h3').textContent.toLowerCase();
    const desc = card.querySelector('p').textContent.toLowerCase();
    const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();

    const matchesCategory = currentCategory === 'all' || category === currentCategory;
    const matchesSearch = !query || title.includes(query) || desc.includes(query) || keywords.includes(query);

    if (matchesCategory && matchesSearch) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  if (noResults) {
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

if (searchInput) {
  searchInput.addEventListener('input', filterTools);
}

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.getAttribute('data-category');
    filterTools();
  });
});
