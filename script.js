/* ============================================================
   NEW SANSKAR ACADEMY — MAIN SCRIPT
   Organized sections:
   1. Config (edit these values to update content)
   2. Background Floating Particles
   3. Mobile Navigation Toggle
   4. Smooth Scroll for Anchor Links
   5. Hero Stats Counter Animation
   6. Scroll Reveal Animation
   7. Navbar Background on Scroll + Back-to-Top Button
   8. Admission Form → WhatsApp Redirect
   9. Toast Notification Helper
   10. Mouse Trail Sparkle Effect
   ============================================================ */


/* ============================================================
   1. CONFIG
   Change these values here instead of hunting through the code.
   ============================================================ */
const CONFIG = {
  whatsappNumber: '91XXXXXXXXXX',   // used by admission form + floating WhatsApp button
  counters: {
    students: 1200,
    teachers: 65,
    yearsLegacy: 20
  }
};


/* ============================================================
   2. BACKGROUND FLOATING PARTICLES
   Generates decorative icons, dots, stars, blobs, and drifting
   particles behind all sections (purely visual, no logic).
   ============================================================ */
(function initFloatingParticles() {
  const container = document.getElementById('global-particles');

  const icons = [
    'lucide:book-open', 'lucide:graduation-cap', 'lucide:pencil', 'lucide:star',
    'lucide:apple', 'lucide:trophy', 'lucide:brain', 'lucide:lightbulb',
    'lucide:heart', 'lucide:sparkles', 'lucide:atom', 'lucide:calculator',
    'lucide:globe', 'lucide:music', 'lucide:palette'
  ];
  const colors = ['gold', 'emerald', 'blue', 'purple', 'rose'];
  const anims = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f-slow', 'f-reverse'];
  const colorMap = {
    gold: '#fbbf24', emerald: '#34d399', blue: '#60a5fa',
    purple: '#a78bfa', rose: '#fb7185'
  };

  // --- Floating icons ---
  for (let i = 0; i < 25; i++) {
    const el = document.createElement('div');
    el.className = 'absolute pointer-events-none';
    el.style.top = Math.random() * 100 + '%';
    el.style.left = Math.random() * 100 + '%';
    el.style.animation = anims[Math.floor(Math.random() * anims.length)] + ' ' + (5 + Math.random() * 10) + 's ease-in-out infinite';
    el.style.animationDelay = Math.random() * 5 + 's';
    el.style.opacity = .03 + Math.random() * .07;

    const size = 16 + Math.random() * 24;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const icon = icons[Math.floor(Math.random() * icons.length)];
    el.innerHTML = `<span class="iconify" data-icon="${icon}" style="font-size:${size}px;color:${colorMap[color]}"></span>`;
    container.appendChild(el);
  }

  // --- Small dots ---
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'absolute rounded-full pointer-events-none';
    const size = 2 + Math.random() * 4;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.top = Math.random() * 100 + '%';
    el.style.left = Math.random() * 100 + '%';
    const color = colors[Math.floor(Math.random() * colors.length)];
    el.style.background = colorMap[color];
    el.style.opacity = .05 + Math.random() * .15;
    el.style.animation = (Math.random() > .5 ? 'floatSlow' : 'floatReverse') + ' ' + (8 + Math.random() * 12) + 's ease-in-out infinite';
    el.style.animationDelay = Math.random() * 8 + 's';
    container.appendChild(el);
  }

  // --- Twinkling stars ---
  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.className = 'absolute rounded-full pointer-events-none';
    const size = 1 + Math.random() * 3;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.top = Math.random() * 100 + '%';
    el.style.left = Math.random() * 100 + '%';
    el.style.background = '#fff';
    el.style.animation = 'twinkle ' + (1.5 + Math.random() * 3) + 's ease-in-out infinite';
    el.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(el);
  }

  // --- Morphing background blobs ---
  for (let i = 0; i < 3; i++) {
    const el = document.createElement('div');
    el.className = 'absolute pointer-events-none';
    el.style.top = (20 + Math.random() * 60) + '%';
    el.style.left = (10 + Math.random() * 80) + '%';
    const size = 80 + Math.random() * 120;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.animation = 'morph ' + (8 + Math.random() * 8) + 's ease-in-out infinite, floatSlow ' + (12 + Math.random() * 8) + 's ease-in-out infinite';
    el.style.animationDelay = Math.random() * 5 + 's';
    el.style.opacity = .03;
    const color = colors[Math.floor(Math.random() * colors.length)];
    el.style.background = colorMap[color];
    el.style.filter = 'blur(40px)';
    container.appendChild(el);
  }

  // --- Drifting particles (left-right across screen) ---
  for (let i = 0; i < 4; i++) {
    const el = document.createElement('div');
    el.className = 'absolute pointer-events-none';
    el.style.top = (10 + Math.random() * 80) + '%';
    const size = 4 + Math.random() * 6;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.borderRadius = '50%';
    el.style.background = i % 2 === 0 ? '#fbbf24' : '#34d399';
    el.style.opacity = '.15';
    el.style.animation = (i % 2 === 0 ? 'drift-right' : 'drift-left') + ' ' + (20 + Math.random() * 15) + 's linear infinite';
    el.style.animationDelay = Math.random() * 10 + 's';
    container.appendChild(el);
  }
})();


/* ============================================================
   3. MOBILE NAVIGATION TOGGLE
   Called by the hamburger button, backdrop, and close buttons.
   ============================================================ */
function toggleNav() {
  const drawer = document.getElementById('mobileNav');
  const backdrop = document.getElementById('mobileNavBackdrop');
  if (drawer) drawer.classList.toggle('open');
  if (backdrop) backdrop.classList.toggle('show');
}

// Close drawer on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const drawer = document.getElementById('mobileNav');
    const backdrop = document.getElementById('mobileNavBackdrop');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('show');
    }
  }
});


/* ============================================================
   4. SMOOTH SCROLL FOR ANCHOR LINKS
   Applies to every <a href="#..."> on the page (nav + footer).
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href && href.length > 1) {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const drawer = document.getElementById('mobileNav');
    const backdrop = document.getElementById('mobileNavBackdrop');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('show');
    }
  });
});



/* ============================================================
   5. HERO STATS COUNTER ANIMATION
   Counts up "Students / Teachers / Years Legacy" once the
   counters scroll into view. Values come from CONFIG above.
   ============================================================ */
function animateCounter(elementId, target, suffix = '+') {
  const el = document.getElementById(elementId);
  let current = 0;
  const step = Math.ceil(target / 60);
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current + suffix;
  }, 30);
}

let countersStarted = false;
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounter('counter1', CONFIG.counters.students);
      animateCounter('counter2', CONFIG.counters.teachers);
      animateCounter('counter3', CONFIG.counters.yearsLegacy);
    }
  });
}, { threshold: .5 });

counterObserver.observe(document.getElementById('counter1'));


/* ============================================================
   6. SCROLL REVEAL ANIMATION
   Fades + slides content upward as it scrolls into view.
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: .1 });

document.querySelectorAll('section > div > .grid > div, section > div > form').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});


/* ============================================================
   7. NAVBAR BACKGROUND ON SCROLL + BACK-TO-TOP BUTTON
   ============================================================ */
window.addEventListener('scroll', () => {
  // Navbar background darkens after scrolling past 50px
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(2,8,20,0.9)';
    navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
  } else {
    navbar.style.background = 'rgba(255,255,255,0.05)';
    navbar.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
  }

  // Back-to-top button fades in after scrolling past 500px
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 500) {
    backToTop.style.opacity = '1';
    backToTop.style.transform = 'translateY(0)';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.transform = 'translateY(16px)';
  }
});


/* ============================================================
   8. ADMISSION FORM → WHATSAPP REDIRECT
   Collects form fields and opens WhatsApp with a pre-filled
   enquiry message. WhatsApp number comes from CONFIG above.
   ============================================================ */
document.getElementById('admissionForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const fields = this.querySelectorAll('input, select, textarea');
  const [studentName, parentName, phone, className, message] = fields;

  const text =
    `Hello! Admission Enquiry:\n\n` +
    `Student: ${studentName.value}\n` +
    `Parent: ${parentName.value}\n` +
    `Phone: ${phone.value}\n` +
    `Class: ${className.value}\n` +
    `Message: ${message.value || 'N/A'}`;

  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  showToast('Redirecting to WhatsApp...');
});


/* ============================================================
   9. TOAST NOTIFICATION HELPER
   Call showToast('your message') from anywhere to display it.
   ============================================================ */
function showToast(message) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}


/* ============================================================
   10. MOUSE TRAIL SPARKLE EFFECT
   Spawns small fading dots that follow the cursor (purely
   decorative, fires on ~8% of mousemove events for performance).
   ============================================================ */
document.addEventListener('mousemove', function (e) {
  if (Math.random() > .92) {
    const particle = document.createElement('div');
    const sparkleColor = ['#fbbf24', '#34d399', '#60a5fa'][Math.floor(Math.random() * 3)];

    particle.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: ${sparkleColor};
      opacity: 0.6;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      transition: all 1s ease;
    `;
    document.body.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.opacity = '0';
      particle.style.transform = `translate(${(Math.random() - .5) * 60}px, ${-40 - Math.random() * 40}px) scale(0)`;
    });

    setTimeout(() => particle.remove(), 1000);
  }
});


/* ============================================================
   11. DYNAMIC CMS SYNCHRONIZATION WITH DB
   Loads customized site text, stats, facilities, faculty,
   contact info and photos set by the admin in Website Manager.
   ============================================================ */
function loadDynamicSiteContent() {
  if (typeof DB === 'undefined') return;
  const c = DB.getSiteContent();
  if (!c) return;

  if (c.whatsappNumber) CONFIG.whatsappNumber = c.whatsappNumber;
  if (c.statStudents) CONFIG.counters.students = Number(c.statStudents);
  if (c.statTeachers) CONFIG.counters.teachers = Number(c.statTeachers);
  if (c.statLegacy) CONFIG.counters.yearsLegacy = Number(c.statLegacy);

  // Hero Section
  const badgeEl = document.getElementById('hero-badge');
  if (badgeEl && c.badge) badgeEl.textContent = c.badge;

  const titleEl = document.getElementById('hero-title');
  if (titleEl && c.title) titleEl.textContent = c.title;

  const subEl = document.getElementById('hero-subtitle');
  if (subEl && c.subtitle) subEl.textContent = c.subtitle;

  const descEl = document.getElementById('hero-desc');
  if (descEl && c.heroDesc) descEl.textContent = c.heroDesc;

  const heroImgEl = document.getElementById('hero-img');
  if (heroImgEl && c.heroImg) heroImgEl.src = c.heroImg;

  // Logos
  if (c.logoUrl) {
    document.querySelectorAll('.logo-img').forEach(img => {
      img.src = c.logoUrl;
    });
  }

  // About Section
  const aboutHead = document.getElementById('about-heading');
  if (aboutHead && c.aboutHeading) aboutHead.innerHTML = c.aboutHeading.replace(/Leaders|Future/g, match => `<span class="grad-text">${match}</span>`);

  const aboutDesc = document.getElementById('about-desc');
  if (aboutDesc && c.about) aboutDesc.textContent = c.about;

  const aboutImg = document.getElementById('about-img');
  if (aboutImg && c.aboutImg) aboutImg.src = c.aboutImg;

  const aboutYears = document.getElementById('about-years');
  if (aboutYears && c.aboutYears) aboutYears.textContent = c.aboutYears;

  // Faculty Grid
  const facultyGrid = document.getElementById('faculty-grid');
  if (facultyGrid && c.faculty && c.faculty.length > 0) {
    facultyGrid.innerHTML = c.faculty.map((f, idx) => `
      <div class="glass rounded-2xl p-6 text-center card-hover group relative overflow-hidden">
        <div class="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 ${idx % 2 === 0 ? 'border-gold-400/20 group-hover:border-gold-400/50' : 'border-emerald-400/20 group-hover:border-emerald-400/50'} transition-colors">
          <img src="${f.photo}" alt="${f.name}" class="w-full h-full object-cover" onerror="this.src='https://picsum.photos/seed/${encodeURIComponent(f.name)}/200/200.jpg'">
        </div>
        <h4 class="font-semibold text-white">${f.name}</h4>
        <p class="text-xs text-gold-400 mt-1">${f.role}</p>
        <p class="text-xs text-slate-500 mt-2">${f.exp}</p>
      </div>
    `).join('');
  }

  // Facilities Grid
  const facilitiesGrid = document.getElementById('facilities-grid');
  if (facilitiesGrid && c.facilities && c.facilities.length > 0) {
    facilitiesGrid.innerHTML = c.facilities.map((fc, idx) => `
      <div class="glass rounded-2xl overflow-hidden card-hover group">
        <div class="relative h-48 overflow-hidden">
          <img src="${fc.photo}" alt="${fc.title}" class="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" onerror="this.src='https://picsum.photos/seed/school-${idx}/400/300.jpg'">
          <div class="absolute inset-0 bg-gradient-to-t from-navy-900/90 to-transparent"></div>
          <div class="absolute bottom-3 left-4"><span class="iconify text-2xl ${idx % 2 === 0 ? 'text-gold-400' : 'text-emerald-400'}" data-icon="${fc.icon || 'lucide:sparkles'}"></span></div>
        </div>
        <div class="p-5">
          <h4 class="font-semibold mb-1 text-white">${fc.title}</h4>
          <p class="text-xs text-slate-400">${fc.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Contact Info
  const p1 = document.getElementById('contact-phone-1');
  if (p1 && c.phone1) p1.textContent = c.phone1;
  const p2 = document.getElementById('contact-phone-2');
  if (p2 && c.phone2) p2.textContent = c.phone2;

  const e1 = document.getElementById('contact-email-1');
  if (e1 && c.email1) e1.textContent = c.email1;
  const e2 = document.getElementById('contact-email-2');
  if (e2 && c.email2) e2.textContent = c.email2;

  const hours = document.getElementById('contact-hours');
  if (hours && c.officeHours) hours.textContent = c.officeHours;

  const addr1 = document.getElementById('contact-address-1');
  if (addr1 && c.address) addr1.textContent = c.address;

  const mapsLink = document.getElementById('contact-map-link');
  if (mapsLink && c.mapsLink) mapsLink.href = c.mapsLink;

  // Floating WhatsApp Link
  const waBtn = document.getElementById('floating-whatsapp-link');
  if (waBtn && c.whatsappNumber) waBtn.href = `https://wa.me/${c.whatsappNumber}`;

  // Footer Info
  const footerName = document.getElementById('footer-school-name');
  if (footerName && c.title) footerName.textContent = c.title;

  const footerSub = document.getElementById('footer-school-sub');
  if (footerSub && c.subtitle) footerSub.textContent = c.subtitle;

  const footerMotto = document.getElementById('footer-motto');
  if (footerMotto && c.motto) footerMotto.textContent = `"${c.motto}" — Nurturing minds, building character, shaping futures since 2005.`;

  const footerPhone = document.getElementById('footer-phone');
  if (footerPhone && c.phone1) footerPhone.textContent = c.phone1;

  const footerEmail = document.getElementById('footer-email');
  if (footerEmail && c.email1) footerEmail.textContent = c.email1;

  const footerAddr = document.getElementById('footer-address');
  if (footerAddr && c.address) footerAddr.textContent = c.address;
}

// Run on initial load
loadDynamicSiteContent();
