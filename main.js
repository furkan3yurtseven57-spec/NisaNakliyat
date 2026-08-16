/* Main JS for Nisa Nakliyat Landing Page */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. MOBILE MENU TOGGLE
  // ==========================================
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const navMenu = document.getElementById('navMenu');
  
  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Update menu icon (hamburger to close icon)
      const icon = menuToggleBtn.querySelector('.material-symbols-outlined');
      if (navMenu.classList.contains('active')) {
        icon.textContent = 'close';
        menuToggleBtn.setAttribute('aria-label', 'Menüyü Kapat');
      } else {
        icon.textContent = 'menu';
        menuToggleBtn.setAttribute('aria-label', 'Menüyü Aç');
      }
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggleBtn.querySelector('.material-symbols-outlined');
        icon.textContent = 'menu';
        menuToggleBtn.setAttribute('aria-label', 'Menüyü Aç');
      });
    });
  }

  // ==========================================
  // 2. HERO IMAGE GALLERY / CAROUSEL
  // ==========================================
  const heroMainImage = document.getElementById('heroMainImage');
  const thumbBtns = document.querySelectorAll('.thumb-btn');

  if (heroMainImage && thumbBtns.length > 0) {
    thumbBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbBtns.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        btn.classList.add('active');
        
        // Get image source from data attribute
        const newSrc = btn.getAttribute('data-src');
        
        // Apply smooth transition (fade out, change source, fade in)
        heroMainImage.style.opacity = '0.3';
        heroMainImage.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
          heroMainImage.src = newSrc;
          heroMainImage.style.opacity = '1';
          heroMainImage.style.transform = 'scale(1)';
        }, 150); // Matches transitions
      });
    });
  }

  // ==========================================
  // 3. WHATSAPP FORM INTEGRATION
  // ==========================================
  const whatsappForm = document.getElementById('whatsappForm');
  
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('userName').value.trim();
      const from = document.getElementById('fromLocation').value.trim();
      const to = document.getElementById('toLocation').value.trim();
      const houseType = document.getElementById('houseType').value;
      const notes = document.getElementById('userNotes').value.trim();
      
      // WhatsApp Number (905443291252)
      const phoneNumber = '905443291252';
      
      // Construct message
      let message = `*Nisa Nakliyat - Web Teklif Talebi*\n\n`;
      message += `👤 *Müşteri:* ${name}\n`;
      message += `📍 *Nereden:* ${from}\n`;
      message += `🏁 *Nereye:* ${to}\n`;
      message += `🏠 *Ev Tipi:* ${houseType}\n`;
      
      if (notes) {
        message += `📝 *Notlar:* ${notes}\n`;
      }
      
      // URL encode the message
      const encodedText = encodeURIComponent(message);
      
      // Open WhatsApp link in a new window
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedText}`;
      window.open(whatsappURL, '_blank');
    });
  }

  // ==========================================
  // 4. ACTIVE NAV LINK HIGHLIGHT & SMOOTH SCROLL OFFSET
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-link');
  const headerHeight = document.querySelector('.main-header').offsetHeight;

  function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerHeight - 20; // 20px extra buffer
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinksList.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);
  
  // Custom click scroll adjustment for smooth page scroll taking header into account
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return; // Do nothing for empty anchors
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // 5. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element fully enters
    });
    
    animatedElements.forEach(element => {
      animationObserver.observe(element);
    });
  } else {
    // Fallback if IntersectionObserver is not supported: show all immediately
    animatedElements.forEach(element => {
      element.classList.add('visible');
    });
  }

  // Add dynamic shadows to header on scroll
  const mainHeader = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainHeader.style.boxShadow = 'var(--shadow-md)';
      mainHeader.style.padding = '2px 0'; // Slightly shrink header
    } else {
      mainHeader.style.boxShadow = 'var(--shadow-sm)';
      mainHeader.style.padding = '0';
    }
  });

});
