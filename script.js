// ===================================
// CARD EXPANSION FUNCTIONALITY
// ===================================

const expandBtn = document.getElementById('expandBtn');
const closeBtn = document.getElementById('closeBtn');
const cardWrapper = document.getElementById('cardWrapper');
const websiteContainer = document.getElementById('websiteContainer');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Expand card to show website
expandBtn.addEventListener('click', function() {
    cardWrapper.classList.add('hidden');
    websiteContainer.classList.add('visible');
    document.body.style.overflow = 'hidden';
    
    // Trigger animation for sections
    setTimeout(function() {
        document.body.style.overflow = 'auto';
    }, 600);
});

// Close website and return to card
closeBtn.addEventListener('click', function() {
    websiteContainer.classList.remove('visible');
    cardWrapper.classList.remove('hidden');
    document.body.style.overflow = 'auto';
    
    // Close hamburger menu if open
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
});

// ===================================
// HAMBURGER MENU FUNCTIONALITY
// ===================================

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================

// Handle navigation link clicks
navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(function(l) {
            l.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Get the section ID from data attribute
        const sectionId = this.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===================================
// SMOOTH SCROLL HELPER
// ===================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Update active nav link
        navLinks.forEach(function(link) {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector('[data-section="' + sectionId + '"]');
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Close hamburger menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// ===================================
// INTERSECTION OBSERVER FOR ACTIVE NAV
// ===================================

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            // Remove active class from all links
            navLinks.forEach(function(link) {
                link.classList.remove('active');
            });
            
            // Add active class to corresponding link
            const activeLink = document.querySelector('[data-section="' + entry.target.id + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('.section');
sections.forEach(function(section) {
    observer.observe(section);
});

// ===================================
// CLOSE WEBSITE ON ESC KEY
// ===================================

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close hamburger menu
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        // Close website
        else if (websiteContainer.classList.contains('visible')) {
            closeBtn.click();
        }
    }
});

// ===================================
// INITIALIZE
// ===================================

// Set home as active on page load
window.addEventListener('load', function() {
    const homeLink = document.querySelector('[data-section="home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});
