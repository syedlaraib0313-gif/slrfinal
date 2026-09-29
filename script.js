/**
 * SLR GRAPHICS — MODERN CREATIVE STUDIO
 * Interactive Behaviors, Portfolio Filtering, Modal, and WhatsApp Dispatch
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- 1. Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }

  // --- 2. Sticky Header & Active Nav on Scroll ---
  const header = document.getElementById('main-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 30) {
      header.classList.add('shadow-xl', 'bg-brand-darkest/95');
      header.classList.remove('bg-brand-darkest/75');
    } else {
      header.classList.remove('shadow-xl', 'bg-brand-darkest/95');
      header.classList.add('bg-brand-darkest/75');
    }

    // Scroll spy
    let current = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active', 'text-white');
      link.classList.add('text-slate-300');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active', 'text-white');
        link.classList.remove('text-slate-300');
      }
    });
  });

  // --- 3. Portfolio Category Filtering ---
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.classList.add('animate-fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 4. Contact Form & WhatsApp Dispatch ---
  const form = document.getElementById('inquiry-form');
  const whatsappBtn = document.getElementById('send-whatsapp-btn');
  const formSuccess = document.getElementById('form-success');

  const studioPhone = '917004953962';

  function buildInquiryMessage() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const company = document.getElementById('company').value.trim() || 'Not specified';
    const projectType = document.getElementById('project-type').value;
    const message = document.getElementById('message').value.trim();

    return `*NEW PROJECT INQUIRY — SLR GRAPHICS*%0A%0A` +
           `*Name:* ${encodeURIComponent(name)}%0A` +
           `*Email:* ${encodeURIComponent(email)}%0A` +
           `*Phone:* ${encodeURIComponent(phone)}%0A` +
           `*Company / Brand:* ${encodeURIComponent(company)}%0A` +
           `*Project Type:* ${encodeURIComponent(projectType)}%0A%0A` +
           `*Project Description:*%0A${encodeURIComponent(message)}`;
  }

  // Handle Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const projectType = document.getElementById('project-type').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !phone || !projectType || !message) {
        alert('Please fill out all required fields marked with *');
        return;
      }

      // Show success feedback
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Offer direct WhatsApp transfer
      const msg = buildInquiryMessage();
      const waUrl = `https://wa.me/${studioPhone}?text=${msg}`;
      
      // Auto-open WhatsApp in a new tab for seamless user communication
      window.open(waUrl, '_blank');
    });
  }

  // Handle Explicit "Send via WhatsApp" Button Click
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const projectType = document.getElementById('project-type').value;

      if (!name || !projectType) {
        // Quick fallback if user hasn't filled in all inputs yet
        const defaultMsg = encodeURIComponent("Hello SLR GRAPHICS! I'd like to discuss a new design project for my brand.");
        window.open(`https://wa.me/${studioPhone}?text=${defaultMsg}`, '_blank');
        return;
      }

      const msg = buildInquiryMessage();
      window.open(`https://wa.me/${studioPhone}?text=${msg}`, '_blank');
    });
  }
});

// --- 5. Project Case Study Modal Data & Functions ---
const projectData = {
  lumina: {
    title: 'Lumina Creative Suite',
    category: 'Brand Identity',
    tagline: 'Precision identity for a next-gen fintech platform.',
    client: 'Lumina Technologies',
    timeline: '4 Weeks',
    deliverables: ['Logo & Marks', 'Color Palette & Typography', 'Full 45-Page Brand Guidelines', 'Stationery System', 'Digital Avatar System'],
    objective: 'Create a distinctive, future-focused visual identity that establishes trust, modern aesthetics, and mathematical rigor for an enterprise fintech platform.',
    solution: 'Engineered a geometric monogram using interlocking ribbon geometries in deep purple and luminous violet tones, paired with a clean Swiss typographic hierarchy.',
    colors: ['#1B1035', '#7C3AED', '#A855F7', '#FFFFFF']
  },
  kinetic: {
    title: 'Kinetic Fitness System',
    category: 'Social Media Design',
    tagline: 'Scroll-stopping multi-channel athletic engagement system.',
    client: 'Kinetic Performance Lab',
    timeline: '3 Weeks',
    deliverables: ['30+ Modular Feed Templates', 'High-Retention Carousel Layouts', 'Reels Cover Suite', 'Story Interaction Stickers', 'Brand Asset Kit'],
    objective: 'Transform an inconsistent social presence into a visually energetic, high-authority fitness media powerhouse.',
    solution: 'Designed a high-contrast dark aesthetic with vibrant purple and neon accents, heavy typographic lockups, and dynamic diagonal speed accents.',
    colors: ['#080411', '#7C3AED', '#A855F7', '#22C55E']
  },
  nebula: {
    title: 'Nebula Artisan Roasters',
    category: 'Print & Packaging Design',
    tagline: 'Minimalist luxury coffee packaging for single-origin lots.',
    client: 'Nebula Roastery Co.',
    timeline: '5 Weeks',
    deliverables: ['Custom Stand-up Pouch Die-lines', 'Holographic & Metallic Foil Stamps', 'Origin Country Color Banding', 'Retail Shelf Display Box', 'Menu Cards'],
    objective: 'Design a bespoke packaging series that commands a premium shelf price point and creates a tactile unboxing experience for discerning specialty coffee connoisseurs.',
    solution: 'Employed ultra-matte tactile soft-touch substrates accented by glossy metallic UV foil typography and celestial astronomical motifs.',
    colors: ['#0E0720', '#1B1035', '#C084FC', '#FFFFFF']
  },
  solstice: {
    title: 'Solstice Audio-Visual Fest',
    category: 'Posters & Event Branding',
    tagline: 'Generative poster series for international sound summit.',
    client: 'Solstice Arts Foundation',
    timeline: '2 Weeks',
    deliverables: ['A1 Screen-printed Posters', 'Digital City Billboard Formats', 'VIP Lanyard & Pass Kits', 'Merchandise Graphic Suite', 'Event Program Guide'],
    objective: 'Convey the sensory experience of immersive electronic audio and digital light installations in print and out-of-home advertising.',
    solution: 'Developed dynamic typographic wave distortions based on frequency analysis, set against a cavernous deep purple gradient field.',
    colors: ['#080411', '#7C3AED', '#EC4899', '#A855F7']
  },
  vortex: {
    title: 'Vortex Energy Drink Launch',
    category: 'Advertising Creatives',
    tagline: 'Omnichannel performance ad campaign for new beverage.',
    client: 'Vortex Functional Beverages',
    timeline: '3 Weeks',
    deliverables: ['Meta & TikTok Paid Ad Creatives', 'Animated Motion Display Banners', 'Google Display Network Assets', 'Retail POS Banners', 'Influencer Promo Kit'],
    objective: 'Generate explosive visual excitement and maximize conversion rates across paid digital channels for a new nootropics beverage.',
    solution: 'Crafted 3D product compositions, glowing kinetic typography, and high-energy color contrasts resulting in a 41% click-through rate improvement over industry benchmarks.',
    colors: ['#0A0518', '#7C3AED', '#F43F5E', '#A855F7']
  },
  aura: {
    title: 'Aura Organic Skincare',
    category: 'Brand Identity & UI/UX',
    tagline: 'Serene, clean brand identity and e-commerce shopping experience.',
    client: 'Aura Botanics',
    timeline: '6 Weeks',
    deliverables: ['Brand Guidelines', 'Glass Bottle Screen Prints', 'Minimal Outer Packaging', 'Responsive Figma UI Kit', 'E-Commerce Storefront Layout'],
    objective: 'Build a holistic luxury brand image for a clean skincare line, connecting the physical packaging aesthetics with the online shopping flow.',
    solution: 'Designed an elegant, spacious visual system highlighting natural lavender, deep purple night shades, and generous breathing room with modern serif-sans pairings.',
    colors: ['#1B1035', '#A855F7', '#E9D5FF', '#FFFFFF']
  }
};

function openProjectModal(key) {
  const project = projectData[key];
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');

  const colorSwatches = project.colors.map(c => 
    `<div class="flex items-center gap-1.5"><span class="w-4 h-4 rounded-full border border-white/20" style="background-color: ${c}"></span><span class="text-[10px] font-mono text-slate-300">${c}</span></div>`
  ).join('');

  const deliverablesHtml = project.deliverables.map(d => 
    `<li class="flex items-center gap-2 text-xs text-slate-300"><span class="w-1.5 h-1.5 rounded-full bg-brand-neon"></span>${d}</li>`
  ).join('');

  content.innerHTML = `
    <div class="space-y-6">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-deep border border-brand-border text-[11px] font-mono uppercase text-brand-neon mb-3">
          ${project.category}
        </div>
        <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-white">${project.title}</h2>
        <p class="text-sm text-slate-300 mt-1">${project.tagline}</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-brand-darkest/70 border border-brand-border/60">
        <div>
          <span class="text-[10px] uppercase font-mono text-slate-400 block">Client</span>
          <span class="text-xs font-semibold text-white">${project.client}</span>
        </div>
        <div>
          <span class="text-[10px] uppercase font-mono text-slate-400 block">Timeline</span>
          <span class="text-xs font-semibold text-white">${project.timeline}</span>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <span class="text-[10px] uppercase font-mono text-slate-400 block">Palette</span>
          <div class="flex gap-2 mt-1">
            ${project.colors.map(c => `<span class="w-3.5 h-3.5 rounded-full border border-white/20" style="background:${c}"></span>`).join('')}
          </div>
        </div>
      </div>

      <div>
        <h4 class="text-xs font-mono uppercase tracking-wider text-brand-neon font-bold mb-2">Design Objective</h4>
        <p class="text-slate-300 text-sm leading-relaxed">${project.objective}</p>
      </div>

      <div>
        <h4 class="text-xs font-mono uppercase tracking-wider text-brand-bright font-bold mb-2">Creative Direction & Solution</h4>
        <p class="text-slate-300 text-sm leading-relaxed">${project.solution}</p>
      </div>

      <div>
        <h4 class="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">Key Deliverables</h4>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${deliverablesHtml}
        </ul>
      </div>

      <div class="pt-4 border-t border-brand-border flex items-center justify-between">
        <a href="#contact" onclick="closeProjectModal()" class="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-brand-violet to-brand-bright hover:shadow-lg transition-all text-center inline-flex items-center justify-center gap-2">
          <span>Inquire About Similar Project</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </a>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Close modal when clicking on backdrop
window.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (e.target === modal) {
    closeProjectModal();
  }
});
