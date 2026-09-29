/**
 * SLR GRAPHICS — WHITE + PURPLE CREATIVE STUDIO
 * Interactive Behaviors, Case Study Modal, Sticky Nav, and WhatsApp Dispatch
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
const projectCaseStudies = {
  lumina: {
    number: '01',
    category: 'BRAND IDENTITY',
    title: 'LUMINA CREATIVE',
    tagline: 'Complete visual identity and brand system.',
    client: 'Lumina Global Holdings',
    scope: 'Brand Strategy, Logo System, Typography, Guidelines',
    overview: 'Lumina Creative required a distinctive visual architecture that balances architectural minimalism with technological sophistication. The goal was to build a memorable identity communicating confidence across international markets.',
    concept: 'Modernist geometric monogram crafted from interlocked dynamic facets, accompanied by a disciplined Swiss typographic hierarchy and refined purple-violet tones.',
    approach: 'Conducted competitive landscape research, established foundational grid parameters, and tested mark legibility from small mobile icons to large physical building signage.',
    deliverables: [
      'Primary & Secondary Logo Marks',
      'Monogram & Iconography Suite',
      'Typography Hierarchy & Specimen',
      'Comprehensive 48-Page Brand Guide',
      'Stationery & Corporate Collateral'
    ],
    palette: ['#1B1035', '#7C3AED', '#A855F7', '#FFFFFF']
  },
  kinetic: {
    number: '02',
    category: 'SOCIAL MEDIA',
    title: 'KINETIC SOCIAL',
    tagline: 'Modern social media campaign and content design.',
    client: 'Kinetic Performance Lab',
    scope: 'Social Feed Architecture, Carousel Kits, Reel Covers',
    overview: 'Kinetic Social sought to revitalize their multi-platform digital channels into a high-octane visual destination that turns casual scrollers into engaged brand advocates.',
    concept: 'High-contrast editorial layouts featuring bold condensed typography, energetic motion speed-lines, and striking dark-mode aesthetics that command the social feed.',
    approach: 'Engineered a modular component system of 30+ reusable Figma templates for rapid content creation, ensuring brand consistency across Instagram, LinkedIn, and YouTube touchpoints.',
    deliverables: [
      '30+ Modular Feed Templates',
      'Educational Carousel Layout Kits',
      'Reel & Short Video Cover Suites',
      'Story Interaction & Poll Stickers',
      'Asset Management Guide'
    ],
    palette: ['#1B1035', '#7C3AED', '#A855F7', '#FFFFFF']
  },
  nebula: {
    number: '03',
    category: 'PRINT & PACKAGING',
    title: 'NEBULA PACKAGING',
    tagline: 'Premium packaging and product presentation.',
    client: 'Nebula Artisan Roasters',
    scope: 'Packaging Dielines, Custom Pouches, Foil Stamping',
    overview: 'Nebula Artisan Roasters produces rare micro-lot single-origin beans. They needed luxury packaging that reflected their obsessive craft and justified a top-tier retail price.',
    concept: 'Tactile soft-touch matte substrates combined with metallic foil stamping, precision typographic origin tags, and a celestial micro-pattern finish.',
    approach: 'Collaborated directly with master printers to test spot UV, foil embossing, and paperweights. Delivered production-ready vector dielines with exact printer specifications.',
    deliverables: [
      '250g & 1kg Custom Pouch Dielines',
      'Origin Label Color-Coded System',
      'Retail Shelf Display Outer Box',
      'Tasting Card & Stationery Inserts',
      '3D Photorealistic Product Renders'
    ],
    palette: ['#1B1035', '#7C3AED', '#A855F7', '#FFFFFF']
  },
  solstice: {
    number: '04',
    category: 'POSTER DESIGN',
    title: 'SOLSTICE FEST',
    tagline: 'Creative event poster and promotional campaign.',
    client: 'Solstice Sound & Arts Foundation',
    scope: 'A1 Screenprint Posters, Digital Billboards',
    overview: 'An international avant-garde audio festival celebrating experimental electronic soundscapes and architectural lighting installations.',
    concept: 'Synthesizing generative acoustic waveforms with rigorous typographic grid systems, expressing sound as pure visual geometry.',
    approach: 'Constructed an asymmetric layout utilizing extreme typographic scale contrast, bold negative space, and vibrant violet tones that radiate off dark street hoardings.',
    deliverables: [
      'A1 Screen-printed Limited Posters',
      'Digital City Billboard Animations',
      'Artist Lineup Announcement Graphic Suite',
      'VIP Credential Lanyards & Badges',
      'Commemorative Exhibition Book Cover'
    ],
    palette: ['#1B1035', '#7C3AED', '#A855F7', '#FFFFFF']
  },
  vortex: {
    number: '05',
    category: 'ADVERTISING',
    title: 'VORTEX CAMPAIGN',
    tagline: 'High-impact advertising and promotional creatives.',
    client: 'Vortex Functional Beverages',
    scope: 'Paid Ad Creatives, Motion Banners, Display Ads',
    overview: 'Vortex launched a revolutionary nootropic focus drink requiring aggressive visual distinction in a crowded wellness and energy marketplace.',
    concept: 'Dynamic motion graphics, high-impact lighting, bold product heroic angles, and concise value propositions tailored for high-conversion performance marketing.',
    approach: 'Produced a cohesive suite of static and animated ad units tested across Meta, TikTok, and Google Display networks with optimized A/B headline variants.',
    deliverables: [
      '15+ Multi-Aspect Ratio Ad Creatives',
      'Animated Motion Display Units (HTML5/MP4)',
      'Retail Point-of-Sale Poster Displays',
      'Product Launch Influencer Press Kits',
      'Performance Analytics & Iteration Log'
    ],
    palette: ['#1B1035', '#7C3AED', '#A855F7', '#FFFFFF']
  },
  aura: {
    number: '06',
    category: 'BRAND & UI',
    title: 'AURA DIGITAL',
    tagline: 'Brand identity combined with modern digital interface design.',
    client: 'Aura Digital Labs',
    scope: 'Identity Design, Figma UI Kit, Landing Page Flow',
    overview: 'Aura is a digital health & skincare platform combining tailored botanical formulas with automated skin-analysis intelligence.',
    concept: 'An editorial visual system blending serene natural luxury with clean, high-precision digital product design and friction-free user flows.',
    approach: 'We developed the visual identity and translated its typography, color values, and spacing tokens into a full-scale Figma design system for responsive web and mobile web.',
    deliverables: [
      'Complete Brand Identity & Guidelines',
      'Responsive Landing Page UI & UX Flow',
      'Interactive Consultation Questionnaire UX',
      'Design Token Library (Figma & CSS)',
      'Digital Packaging & Unboxing Guide'
    ],
    palette: ['#1B1035', '#7C3AED', '#A855F7', '#FFFFFF']
  }
};

function openProjectModal(key) {
  const p = projectCaseStudies[key];
  if (!p) return;

  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');

  const deliverablesHtml = p.deliverables.map(item => `
    <li class="flex items-center gap-2 text-xs sm:text-sm text-brand-dark font-mono">
      <span class="w-1.5 h-1.5 rounded-full bg-brand-violet flex-shrink-0"></span>
      <span>${item}</span>
    </li>
  `).join('');

  const paletteHtml = p.palette.map(color => `
    <div class="flex items-center gap-2 p-2 rounded-xl bg-brand-bgLight border border-brand-softBorder">
      <span class="w-5 h-5 rounded-full border border-brand-softBorder flex-shrink-0" style="background-color: ${color}"></span>
      <span class="text-[11px] font-mono text-brand-dark font-bold">${color}</span>
    </div>
  `).join('');

  content.innerHTML = `
    <div class="space-y-6 sm:space-y-8 animate-fade-in text-brand-dark">
      
      <!-- Header Meta -->
      <div>
        <div class="flex items-center gap-2 text-xs font-mono text-brand-violet mb-2 font-bold">
          <span class="px-2.5 py-0.5 rounded-full bg-brand-violet/10 border border-brand-violet/20">${p.number} // ${p.category}</span>
          <span class="text-brand-muted">CASE STUDY</span>
        </div>
        <h2 class="text-2xl sm:text-4xl font-display font-black text-brand-dark uppercase tracking-tight">${p.title}</h2>
        <p class="text-sm sm:text-base text-brand-muted mt-1 font-medium">${p.tagline}</p>
      </div>

      <!-- Quick Info Bar -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-brand-bgLight border border-brand-softBorder">
        <div>
          <span class="text-[10px] font-mono text-brand-muted uppercase block font-semibold">Client</span>
          <span class="text-xs sm:text-sm font-bold text-brand-dark">${p.client}</span>
        </div>
        <div>
          <span class="text-[10px] font-mono text-brand-muted uppercase block font-semibold">Disciplines</span>
          <span class="text-xs sm:text-sm font-bold text-brand-dark">${p.category}</span>
        </div>
        <div>
          <span class="text-[10px] font-mono text-brand-muted uppercase block font-semibold">Scope</span>
          <span class="text-xs sm:text-sm font-bold text-brand-dark">${p.scope}</span>
        </div>
      </div>

      <!-- Content Sections -->
      <div class="space-y-5 text-sm sm:text-base">
        <div>
          <h3 class="text-xs font-mono uppercase tracking-widest text-brand-violet font-bold mb-1.5">01. Project Overview</h3>
          <p class="text-brand-muted leading-relaxed">${p.overview}</p>
        </div>

        <div>
          <h3 class="text-xs font-mono uppercase tracking-widest text-brand-violet font-bold mb-1.5">02. Creative Concept</h3>
          <p class="text-brand-muted leading-relaxed">${p.concept}</p>
        </div>

        <div>
          <h3 class="text-xs font-mono uppercase tracking-widest text-brand-violet font-bold mb-1.5">03. Design Approach</h3>
          <p class="text-brand-muted leading-relaxed">${p.approach}</p>
        </div>
      </div>

      <!-- Deliverables Section -->
      <div class="p-5 rounded-2xl bg-brand-bgLight border border-brand-softBorder">
        <h3 class="text-xs font-mono uppercase tracking-widest text-brand-dark font-bold mb-3">Key Deliverables</h3>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${deliverablesHtml}
        </ul>
      </div>

      <!-- Color Palette -->
      <div>
        <h3 class="text-xs font-mono uppercase tracking-widest text-brand-muted font-bold mb-2.5">Color System</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          ${paletteHtml}
        </div>
      </div>

      <!-- Modal Bottom Actions -->
      <div class="pt-5 border-t border-brand-softBorder flex flex-col sm:flex-row items-center justify-between gap-3">
        <button onclick="closeProjectModal()" class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-brand-dark hover:bg-brand-dark hover:text-white text-brand-dark transition-all text-xs font-bold uppercase tracking-wider">
          ← Back to Portfolio
        </button>
        <a href="#contact" onclick="closeProjectModal()" class="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-brand-violet hover:bg-brand-bright transition-all text-center inline-flex items-center justify-center gap-2 shadow-sm">
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

window.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (e.target === modal) {
    closeProjectModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});
