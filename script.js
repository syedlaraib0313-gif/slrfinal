/**
 * SLR GRAPHICS — WHITE + PURPLE CREATIVE STUDIO
 * Interactive Behaviors, Case Study Modal, Sticky Nav, and WhatsApp Dispatch
 */

// --- SERVICE CARD INTERACTIVE SYSTEM ---
// Tracks which service is currently open
let _slrActiveService = null;

function slrToggleService(id) {
  // If clicking the already-open card, close it
  if (_slrActiveService === id) {
    slrCloseService(id);
    return;
  }
  // Close any previously open card
  if (_slrActiveService) {
    _slrHideCard(_slrActiveService);
  }
  // Open the clicked card
  _slrActiveService = id;
  const card = document.querySelector('[data-service="' + id + '"]');
  if (!card) return;
  const front = card.querySelector('.slr-card-front');
  const open  = card.querySelector('.slr-card-open');
  if (front) front.classList.add('hidden');
  if (open)  { open.classList.remove('hidden'); open.classList.add('flex'); }
  // Re-render Lucide icons inside the newly shown panel
  if (window.lucide) window.lucide.createIcons();
}

function slrCloseService(id) {
  _slrHideCard(id);
  if (_slrActiveService === id) _slrActiveService = null;
}

function _slrHideCard(id) {
  const card = document.querySelector('[data-service="' + id + '"]');
  if (!card) return;
  const front = card.querySelector('.slr-card-front');
  const open  = card.querySelector('.slr-card-open');
  if (open)  { open.classList.add('hidden'); open.classList.remove('flex'); }
  if (front) front.classList.remove('hidden');
}


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

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }

  // --- 2. Sticky Header & Scroll Spy for 5 Sections ---
  const header = document.getElementById('main-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-md', 'bg-white');
      header.classList.remove('bg-white/95');
    } else {
      header.classList.remove('shadow-md');
      header.classList.add('bg-white/95');
    }

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
      link.classList.remove('active', 'text-brand-violet');
      link.classList.add('text-brand-dark');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active', 'text-brand-violet');
        link.classList.remove('text-brand-dark');
      }
    });
  });

  // --- 3. Inquiry Form & WhatsApp Dispatch ---
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

    return `*NEW INQUIRY — SLR GRAPHICS STUDIO*%0A%0A` +
           `*Name:* ${encodeURIComponent(name)}%0A` +
           `*Email:* ${encodeURIComponent(email)}%0A` +
           `*Phone:* ${encodeURIComponent(phone)}%0A` +
           `*Company / Brand:* ${encodeURIComponent(company)}%0A` +
           `*Project Type:* ${encodeURIComponent(projectType)}%0A%0A` +
           `*Description:*%0A${encodeURIComponent(message)}`;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const projectType = document.getElementById('project-type').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !phone || !projectType || !message) {
        alert('Please complete all required fields.');
        return;
      }

      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      const msg = buildInquiryMessage();
      const waUrl = `https://wa.me/${studioPhone}?text=${msg}`;
      window.open(waUrl, '_blank');
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const projectType = document.getElementById('project-type').value;

      if (!name || !projectType) {
        const defaultMsg = encodeURIComponent("Hello SLR GRAPHICS! I'd like to discuss a project with your studio.");
        window.open(`https://wa.me/${studioPhone}?text=${defaultMsg}`, '_blank');
        return;
      }

      const msg = buildInquiryMessage();
      window.open(`https://wa.me/${studioPhone}?text=${msg}`, '_blank');
    });
  }
});

// --- 4. Portfolio Case Study Data & Modal Manager ---
const projectOrder = ['lumina', 'kinetic', 'nebula', 'solstice', 'vortex', 'aura'];
let activeModalKey = null;

const projectCaseStudies = {
  lumina: {
    number: '01',
    category: 'BRAND IDENTITY',
    title: 'LUMINA CREATIVE',
    tagline: 'Complete visual identity, monogram system, and brand guidelines.',
    image: 'assets/lumina.jpg',
    client: 'Lumina Global Holdings',
    year: '2026',
    scope: 'Brand Architecture, Logo System, Typography Hierarchy, Stationery, Guidelines',
    overview: 'Lumina Creative required a distinctive visual architecture that balances architectural minimalism with modern sophistication. The objective was to build a memorable identity communicating unshakeable confidence across both digital and physical touchpoints.',
    objective: 'Create a versatile, future-proof identity system that feels elevated, trustworthy and creative, capable of scaling across digital applications, architectural signage, and premium corporate collateral.',
    approach: 'Minimal typography, disciplined Swiss grid layouts, and a sophisticated visual language. We explored geometric letterforms to construct a bold monogram mark, complemented by a refined typographic hierarchy and deep purple-violet palette.',
    finalVisuals: 'A complete brand architecture including primary and secondary logo lockups, bespoke stationery, responsive brand guidelines, business cards, letterheads, and realistic physical presentation mockups.',
    deliverables: [
      'Primary & Secondary Logo Marks',
      'Monogram & Iconography Suite',
      'Typography Hierarchy & Specimen',
      'Comprehensive 48-Page Brand Guide',
      'Stationery & Corporate Collateral',
      'Realistic Branding Mockup Suite'
    ],
    palette: ['#1B1035', '#7C3AED', '#A855F7', '#FFFFFF']
  },
  kinetic: {
    number: '02',
    category: 'SOCIAL MEDIA',
    title: 'KINETIC SOCIAL',
    tagline: 'Modern social media campaign and content design system.',
    image: 'assets/kinetic.jpg',
    client: 'Kinetic Performance Lab',
    year: '2026',
    scope: 'Social Feed Architecture, Carousel Kits, Reel Covers, Story Systems',
    overview: 'Kinetic Social sought to revitalize their multi-platform digital channels into a high-octane visual destination that turns casual scrollers into engaged brand advocates.',
    objective: 'Break through the noise of crowded social feeds with high-contrast, energetic visual assets that dramatically boost engagement rates, brand recall, and follower growth.',
    approach: 'High-contrast editorial layouts featuring bold condensed typography, dynamic motion speed-lines, and striking dark-mode aesthetics that command immediate visual focus.',
    finalVisuals: 'A modular component system of 30+ reusable feed templates, educational carousel layout kits, high-impact reel covers, story interaction stickers, and promotional campaign graphics.',
    deliverables: [
      '30+ Modular Feed Templates',
      'Educational Carousel Layout Kits',
      'Reel & Short Video Cover Suites',
      'Story Interaction & Poll Stickers',
      'Paid Campaign Ad Variations',
      'Social Media Style Guide'
    ],
    palette: ['#1B1035', '#7C3AED', '#A855F7', '#FFFFFF']
  },
  nebula: {
    number: '03',
    category: 'PACKAGING DESIGN',
    title: 'NEBULA COFFEE',
    tagline: 'Premium packaging design, labels, and product presentation.',
    image: 'assets/nebula.jpg',
    client: 'Nebula Artisan Roasters',
    year: '2026',
    scope: 'Packaging Dielines, Custom Pouches, Foil Stamping, Retail Box, Labels',
    overview: 'Nebula Artisan Roasters produces rare micro-lot single-origin beans. They needed luxury packaging that reflected their obsessive craft and justified a top-tier retail price point.',
    objective: 'Design tactile, shelf-stopping packaging that conveys celestial rarity and organic purity while meeting exact manufacturing specifications and production constraints.',
    approach: 'Tactile soft-touch matte substrates combined with metallic foil stamping, precision typographic origin tags, and a celestial micro-pattern finish that radiates quality on retail shelves.',
    finalVisuals: 'Custom dielines for 250g and 1kg coffee pouches, color-coded origin labels, retail shelf display boxes, take-away cups, and photorealistic 3D product packaging mockups.',
    deliverables: [
      '250g & 1kg Custom Pouch Dielines',
      'Origin Label Color-Coded System',
      'Retail Shelf Display Outer Box',
      'Takeaway Cups & Menu Stationery',
      'Foil Stamping & Spot UV Specs',
      '3D Product Packaging Mockups'
    ],
    palette: ['#1B1035', '#7C3AED', '#A855F7', '#FFFFFF']
  },
  solstice: {
    number: '04',
    category: 'POSTER DESIGN',
    title: 'SOLSTICE FEST',
    tagline: 'Creative event poster and promotional exhibition campaign.',
    image: 'assets/solstice.jpg',
    client: 'Solstice Sound & Arts Foundation',
    year: '2026',
    scope: 'A1 Screenprint Posters, Digital Billboards, Event Collateral',
    overview: 'An international avant-garde audio festival celebrating experimental electronic soundscapes and architectural lighting installations in Berlin.',
    objective: 'Create a bold, visually arresting event poster that translates sound and light into pure visual art, serving as both street promotion and a collectible print.',
    approach: 'Constructed an asymmetric layout synthesizing generative acoustic waveforms with rigorous typographic grid systems, expressing sound as pure visual geometry.',
    finalVisuals: 'Limited edition A1 screen-printed posters, digital city billboard animations, artist lineup announcement graphics, VIP credential lanyards, and festival merchandise.',
    deliverables: [
      'A1 Screen-printed Limited Posters',
      'Digital City Billboard Animations',
      'Artist Lineup Announcement Graphic Suite',
      'VIP Credential Lanyards & Badges',
      'Social Media Promotional Posters',
      'Commemorative Exhibition Print'
    ],
    palette: ['#1B1035', '#7C3AED', '#A855F7', '#FFFFFF']
  },
  vortex: {
    number: '05',
    category: 'ADVERTISING',
    title: 'VORTEX CAMPAIGN',
    tagline: 'High-impact advertising and promotional creatives.',
    image: 'assets/vortex.jpg',
    client: 'Vortex Functional Beverages',
    year: '2026',
    scope: 'Paid Ad Creatives, Motion Banners, Display Ads, POS Displays',
    overview: 'Vortex launched a revolutionary nootropic focus beverage requiring aggressive visual distinction in a crowded wellness and functional drink marketplace.',
    objective: 'Drive direct-to-consumer conversions and retail awareness with high-CTR digital advertisements, striking product hero imagery, and cohesive multi-channel promotional assets.',
    approach: 'Dynamic motion graphics, high-impact lighting, bold product heroic angles, and concise value propositions tailored for high-conversion performance marketing.',
    finalVisuals: 'A comprehensive suite of multi-aspect-ratio ad creatives, animated display banners, retail point-of-sale displays, and influencer press launch collateral.',
    deliverables: [
      '15+ Multi-Aspect Ratio Ad Creatives',
      'Animated Motion Display Units (HTML5/MP4)',
      'Retail Point-of-Sale Poster Displays',
      'Meta, Google & TikTok Paid Creatives',
      'Product Launch Influencer Press Kits',
      'High-CTR Headline Variant Library'
    ],
    palette: ['#1B1035', '#7C3AED', '#A855F7', '#FFFFFF']
  },
  aura: {
    number: '06',
    category: 'BRAND & UI',
    title: 'AURA DIGITAL',
    tagline: 'Brand identity combined with modern digital interface design.',
    image: 'assets/aura.jpg',
    client: 'Aura Digital Labs',
    year: '2026',
    scope: 'Brand Identity, Desktop & Mobile UI, Consultation Flow, Packaging',
    overview: 'Aura is a digital health & organic skincare platform combining personalized botanical formulas with automated skin-analysis intelligence.',
    objective: 'Unify physical brand packaging, digital consultation questionnaires, and a high-converting e-commerce web platform into one seamless, luxurious customer experience.',
    approach: 'An editorial visual system blending serene natural luxury with clean, high-precision digital product design, responsive desktop layouts, and mobile-optimized user flows.',
    finalVisuals: 'Complete brand identity, responsive e-commerce web design, mobile app interface screens, product packaging mockups, stationery, and comprehensive design tokens.',
    deliverables: [
      'Complete Brand Identity & Guidelines',
      'Desktop & Mobile Web UI/UX',
      'Interactive Consultation Questionnaire Flow',
      'Product Packaging & Label System',
      'Design Token Library (Figma & CSS)',
      'Social Assets & Unboxing Collateral'
    ],
    palette: ['#1B1035', '#7C3AED', '#A855F7', '#FFFFFF']
  }
};

function openProjectModal(key) {
  const p = projectCaseStudies[key];
  if (!p) return;

  activeModalKey = key;
  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');

  const currIndex = projectOrder.indexOf(key);
  const prevKey = projectOrder[(currIndex - 1 + projectOrder.length) % projectOrder.length];
  const nextKey = projectOrder[(currIndex + 1) % projectOrder.length];
  const nextProject = projectCaseStudies[nextKey];

  const deliverablesHtml = p.deliverables.map(item => `
    <li class="flex items-center gap-2 text-xs sm:text-sm text-brand-dark font-mono">
      <span class="w-1.5 h-1.5 rounded-full bg-brand-violet flex-shrink-0"></span>
      <span>${item}</span>
    </li>
  `).join('');

  const paletteHtml = p.palette.map(color => `
    <div class="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl bg-brand-bgLight border border-brand-softBorder">
      <span class="w-5 h-5 rounded-full border border-brand-softBorder flex-shrink-0 shadow-sm" style="background-color: ${color}"></span>
      <span class="text-[11px] font-mono text-brand-dark font-bold">${color}</span>
    </div>
  `).join('');

  content.innerHTML = `
    <div class="space-y-6 sm:space-y-8 animate-fade-in text-brand-dark">
      
      <!-- Top Project Counter Strip & Quick Nav -->
      <div class="flex items-center justify-between text-xs font-mono pb-2 border-b border-brand-softBorder/60">
        <span class="text-brand-violet font-bold">${p.number} / 06 // ${p.category}</span>
        <div class="flex items-center gap-3">
          <button onclick="openProjectModal('${prevKey}')" class="text-brand-muted hover:text-brand-violet transition-colors inline-flex items-center gap-1 font-semibold">
            <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline">PREVIOUS</span>
          </button>
          <span class="text-brand-softBorder">|</span>
          <button onclick="openProjectModal('${nextKey}')" class="text-brand-violet hover:text-brand-bright transition-colors inline-flex items-center gap-1 font-semibold">
            <span>NEXT PROJECT</span>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>

      <!-- Large Project Cover Image (Behance Case Study Style) -->
      <div class="relative w-full rounded-2xl overflow-hidden border border-brand-softBorder shadow-lg bg-brand-dark">
        <img src="${p.image}" alt="${p.title} Case Study Visual" class="w-full h-auto object-cover max-h-[500px]" />
        <div class="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-brand-dark/85 backdrop-blur-md text-[10px] font-mono text-white/90 border border-white/10 uppercase tracking-widest font-semibold">
          High-Resolution Showcase
        </div>
      </div>

      <!-- Header Meta & Title -->
      <div>
        <div class="flex items-center gap-2 text-xs font-mono text-brand-violet mb-2 font-bold">
          <span class="px-2.5 py-0.5 rounded-full bg-brand-violet/10 border border-brand-violet/20">${p.number} // ${p.category}</span>
          <span class="text-brand-muted">CASE STUDY</span>
        </div>
        <h2 class="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-brand-dark uppercase tracking-tight">${p.title}</h2>
        <p class="text-sm sm:text-lg text-brand-muted mt-2 font-medium leading-relaxed">${p.tagline}</p>
      </div>

      <!-- Quick Info Bar -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-brand-bgLight border border-brand-softBorder">
        <div>
          <span class="text-[10px] font-mono text-brand-muted uppercase block font-semibold">Client</span>
          <span class="text-xs sm:text-sm font-bold text-brand-dark">${p.client}</span>
        </div>
        <div>
          <span class="text-[10px] font-mono text-brand-muted uppercase block font-semibold">Year</span>
          <span class="text-xs sm:text-sm font-bold text-brand-dark">${p.year}</span>
        </div>
        <div>
          <span class="text-[10px] font-mono text-brand-muted uppercase block font-semibold">Category</span>
          <span class="text-xs sm:text-sm font-bold text-brand-dark">${p.category}</span>
        </div>
        <div>
          <span class="text-[10px] font-mono text-brand-muted uppercase block font-semibold">Discipline</span>
          <span class="text-xs sm:text-sm font-bold text-brand-dark">Studio Showcase</span>
        </div>
      </div>

      <!-- Detailed Case Study Narrative Sections -->
      <div class="space-y-6 text-sm sm:text-base">
        
        <!-- 01. Project Overview -->
        <div class="p-5 sm:p-6 rounded-2xl bg-white border border-brand-softBorder shadow-sm">
          <h3 class="text-xs font-mono uppercase tracking-widest text-brand-violet font-bold mb-2 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brand-violet"></span>
            01. Project Overview
          </h3>
          <p class="text-brand-dark/80 leading-relaxed font-normal">${p.overview}</p>
        </div>

        <!-- 02. Design Objective -->
        <div class="p-5 sm:p-6 rounded-2xl bg-white border border-brand-softBorder shadow-sm">
          <h3 class="text-xs font-mono uppercase tracking-widest text-brand-violet font-bold mb-2 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brand-violet"></span>
            02. Design Objective
          </h3>
          <p class="text-brand-dark/80 leading-relaxed font-normal">${p.objective}</p>
        </div>

        <!-- 03. Creative Approach -->
        <div class="p-5 sm:p-6 rounded-2xl bg-white border border-brand-softBorder shadow-sm">
          <h3 class="text-xs font-mono uppercase tracking-widest text-brand-violet font-bold mb-2 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brand-violet"></span>
            03. Creative Approach
          </h3>
          <p class="text-brand-dark/80 leading-relaxed font-normal">${p.approach}</p>
        </div>

        <!-- 04. Final Design Visuals -->
        <div class="p-5 sm:p-6 rounded-2xl bg-brand-dark text-white shadow-md">
          <h3 class="text-xs font-mono uppercase tracking-widest text-brand-bright font-bold mb-2 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brand-bright"></span>
            04. Final Design Visuals & Execution
          </h3>
          <p class="text-slate-200 leading-relaxed font-normal text-xs sm:text-sm">${p.finalVisuals}</p>
        </div>

      </div>

      <!-- Deliverables Section -->
      <div class="p-5 sm:p-6 rounded-2xl bg-brand-bgLight border border-brand-softBorder">
        <h3 class="text-xs font-mono uppercase tracking-widest text-brand-dark font-bold mb-3 flex items-center gap-2">
          <i data-lucide="check-circle" class="w-4 h-4 text-brand-violet"></i>
          Key Deliverables
        </h3>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${deliverablesHtml}
        </ul>
      </div>

      <!-- Color Palette -->
      <div>
        <h3 class="text-xs font-mono uppercase tracking-widest text-brand-muted font-bold mb-2.5">Studio Color System</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          ${paletteHtml}
        </div>
      </div>

      <!-- Next Project Showcase Banner -->
      <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-violet/10 via-brand-bright/10 to-transparent border border-brand-violet/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="text-[10px] font-mono text-brand-violet uppercase tracking-widest font-bold block mb-1">UP NEXT</span>
          <h4 class="text-base sm:text-lg font-display font-bold text-brand-dark">${nextProject.number} — ${nextProject.title}</h4>
          <p class="text-xs text-brand-muted">${nextProject.category}</p>
        </div>
        <button onclick="openProjectModal('${nextKey}')" class="px-5 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-bright text-white text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-sm">
          <span>VIEW NEXT PROJECT</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>

      <!-- Modal Bottom Actions Bar -->
      <div class="pt-5 border-t border-brand-softBorder flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <button onclick="closeProjectModal()" class="w-full sm:w-auto px-5 py-3 rounded-xl border border-brand-dark hover:bg-brand-dark hover:text-white text-brand-dark transition-all text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            <span>Back to Portfolio</span>
          </button>
        </div>
        <a href="#contact" onclick="closeProjectModal()" class="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-brand-violet hover:bg-brand-bright transition-all text-center inline-flex items-center justify-center gap-2 shadow-sm">
          <span>Inquire About Similar Project</span>
          <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
        </a>
      </div>

    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  modal.scrollTop = 0;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function nextProjectModal() {
  if (!activeModalKey) return;
  const currIndex = projectOrder.indexOf(activeModalKey);
  const nextKey = projectOrder[(currIndex + 1) % projectOrder.length];
  openProjectModal(nextKey);
}

function prevProjectModal() {
  if (!activeModalKey) return;
  const currIndex = projectOrder.indexOf(activeModalKey);
  const prevKey = projectOrder[(currIndex - 1 + projectOrder.length) % projectOrder.length];
  openProjectModal(prevKey);
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  activeModalKey = null;
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (e.target === modal) {
    closeProjectModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  } else if (e.key === 'ArrowRight' && activeModalKey) {
    nextProjectModal();
  } else if (e.key === 'ArrowLeft' && activeModalKey) {
    prevProjectModal();
  }
});
