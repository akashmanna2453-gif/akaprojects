/**
 * Akash Project Showcase — Core Application Engine
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Systems
  initProjects();
  initMobileNav();
  initScrollReveal();
  initDynamicText();
  initActiveNav();
});

/* ==========================================================================
   1. PROJECT DATA & RENDERING SYSTEM
   ========================================================================== */

const PROJECTS_DATA = [
  {
    number: "01",
    title: "Universal Fitness Hub",
    category: "FITNESS",
    type: "Website",
    description: "A modern fitness website designed to give a gym a professional digital presence with a strong visual identity and clear user experience.",
    url: "https://universalfitnesshub.vercel.app/",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    featured: true
  },
  {
    number: "02",
    title: "Dr. Monisa Manna",
    category: "HEALTHCARE",
    type: "Portfolio",
    description: "A professional doctor portfolio website focused on presenting medical information, professional background and contact details through a clean and trustworthy interface.",
    url: "https://drmonisamanna.vercel.app/",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
    tags: ["Healthcare", "UI/UX", "Clean Architecture"],
    featured: false
  },
  {
    number: "03",
    title: "Maison",
    category: "LUXURY",
    type: "Website",
    description: "A premium luxury dining website designed around an elegant visual identity, sophisticated typography and an immersive restaurant experience.",
    url: "https://velvet-spoon-liard.vercel.app/",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    tags: ["Luxury UI", "Typography", "Interactive"],
    featured: false
  },
  {
    number: "04",
    title: "Akash's Restaurant",
    category: "RESTAURANT",
    type: "Website",
    description: "A modern restaurant website focused on presenting the restaurant, menu and overall dining experience through a clean digital interface.",
    url: "https://akash-s-restaurant.vercel.app/",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
    tags: ["Menu Showcase", "Responsive", "CSS Grid"],
    featured: false
  },
  {
    number: "05",
    title: "Neon Arch",
    category: "GAMING",
    type: "Website",
    description: "A futuristic gaming website built around a bold visual identity, immersive presentation and modern gaming aesthetics.",
    url: "https://neon-arch.vercel.app/",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Dark Theme", "Gaming UI", "CSS Animations"],
    featured: false
  }
];

let activeFilter = "ALL";

function initProjects() {
  renderFilterButtons();
  renderProjectsGrid();
}

/**
 * Extract categories and render dynamic filter pills
 */
function renderFilterButtons() {
  const filterContainer = document.getElementById('filterContainer');
  if (!filterContainer) return;

  const rawCategories = PROJECTS_DATA.map(p => p.category);
  const categories = ["ALL", ...new Set(rawCategories)];

  filterContainer.innerHTML = categories.map(cat => `
    <button 
      class="filter-btn ${cat === activeFilter ? 'active' : ''}" 
      data-category="${cat}"
      role="tab"
      aria-selected="${cat === activeFilter}"
    >
      ${cat}
    </button>
  `).join('');

  // Event Delegation for Filter Buttons
  filterContainer.addEventListener('click', (e) => {
    const target = e.target.closest('.filter-btn');
    if (!target) return;

    const category = target.getAttribute('data-category');
    if (category && category !== activeFilter) {
      activeFilter = category;
      
      // Update UI active states
      document.querySelectorAll('.filter-btn').forEach(btn => {
        const isActive = btn.getAttribute('data-category') === activeFilter;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive);
      });

      renderProjectsGrid();
    }
  });
}

/**
 * Render Project Cards according to active filter
 */
function renderProjectsGrid() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const filtered = activeFilter === "ALL" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeFilter);

  grid.innerHTML = filtered.map(project => createProjectCardHTML(project)).join('');
  
  // Attach defensive image fallback handlers
  grid.querySelectorAll('.card-img').forEach(img => {
    img.addEventListener('error', function() {
      const parent = this.parentElement;
      const title = this.getAttribute('alt') || 'Project';
      if (parent) {
        parent.innerHTML = `<div class="card-img-fallback">${escapeHTML(title)}</div>`;
      }
    });
  });
}

/**
 * Generate semantic HTML for individual project card
 */
function createProjectCardHTML(project) {
  const isFeatured = project.featured && activeFilter === "ALL";
  const featuredClass = isFeatured ? 'featured' : '';

  return `
    <article class="project-card ${featuredClass} fade-in visible">
      <div class="card-visual">
        <img 
          src="${escapeHTML(project.image)}" 
          alt="${escapeHTML(project.title)}" 
          class="card-img" 
          loading="lazy" 
        />
      </div>
      <div class="card-body">
        <div class="card-header">
          <span class="card-meta">${escapeHTML(project.category)} · ${escapeHTML(project.type)}</span>
          <span class="card-number">${escapeHTML(project.number)}</span>
        </div>
        <h3 class="card-title">${escapeHTML(project.title)}</h3>
        <p class="card-description">${escapeHTML(project.description)}</p>
        <div class="card-tags">
          ${project.tags.map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}
        </div>
        <div class="card-action">
          <a 
            href="${escapeHTML(project.url)}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="link-btn"
            aria-label="View live website for ${escapeHTML(project.title)}"
          >
            View Live Project ↗
          </a>
        </div>
      </div>
    </article>
  `;
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ==========================================================================
   2. ACCESSIBLE MOBILE NAVIGATION DRAWER
   ========================================================================== */

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !menu) return;

  function openMenu() {
    toggle.classList.add('open');
    menu.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('open');
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close when clicking outside of the drawer contents
  menu.addEventListener('click', (e) => {
    if (e.target === menu) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. SCROLL REVEAL & INTERSECTION OBSERVER
   ========================================================================== */

function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. CURRENTLY BUILDING TEXT CYCLER
   ========================================================================== */

function initDynamicText() {
  const textElem = document.getElementById('dynamicText');
  if (!textElem) return;

  const items = [
    "Web Projects",
    "Python Projects",
    "Product Ideas",
    "New Experiments"
  ];
  
  let currentIndex = 0;

  setInterval(() => {
    textElem.classList.add('fade-out');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % items.length;
      textElem.textContent = items[currentIndex];
      textElem.classList.remove('fade-out');
    }, 300);
  }, 3000);
}

/* ==========================================================================
   5. NAVIGATION ACTIVE STATE ON SCROLL
   ========================================================================== */

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}