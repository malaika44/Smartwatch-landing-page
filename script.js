// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggle active class for smooth transition
    hamburger.classList.toggle('active');
});

// Close mobile menu when navigation links are clicked
const navLinkItems = document.querySelectorAll('.nav-links a');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        // Only close if menu is open (has active class)
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Carousel Functionality
const carousel = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentSlide = 0;
const slideWidth = 100; // percentage

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
}

prevBtn.addEventListener('click', () => {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    updateCarousel();
});

// Auto-slide
setInterval(() => {
    currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    updateCarousel();
}, 5000);

// Popup Component
const createPopup = (message) => {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add('show');
    }, 100);

    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }, 3000);
};

// Form Submission
const orderForm = document.querySelector('.order-form');
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createPopup('Order submitted successfully! We will contact you soon.');
    orderForm.reset();
});

// Form Animations
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    input.addEventListener('focus', () => {
        label.style.transform = 'translateY(-2.5rem)';
        label.style.color = 'var(--primary-color)';
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            label.style.transform = 'translateY(0)';
            label.style.color = '#a0a0a0';
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll(
    '.feature-card, .spec-item, .testimonial-card, .form-group'
);

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Add animate class styles
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!validateEmail(email)) {
        createPopup('Please enter a valid email address.');
        return;
    }

    createPopup('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
});

// Terms Modal Logic
const termsModal = document.getElementById('terms-modal');
const termsLink = document.getElementById('terms-link');
const closeBtn = termsModal.querySelector('.close-btn');

// Show modal when terms link is clicked
if (termsLink) {
    termsLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        termsModal.classList.add('show');
    });
}

// Hide modal when close button is clicked
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        termsModal.classList.remove('show');
    });
}

// Privacy Policy Modal Logic
const privacyModal = document.getElementById('privacy-modal');
const privacyLink = document.getElementById('privacy-link');
const privacyCloseBtn = privacyModal.querySelector('.privacy-close');

// Show modal when privacy link is clicked
if (privacyLink) {
    privacyLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        privacyModal.style.display = 'block'; // Use display block/none
    });
}

// Hide modal when close button is clicked
if (privacyCloseBtn) {
    privacyCloseBtn.addEventListener('click', () => {
        privacyModal.style.display = 'none';
    });
}

// Hide modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === termsModal) {
        termsModal.style.display = 'none'; // Corrected: Use display none
    }
    if (e.target === privacyModal) {
        privacyModal.style.display = 'none';
    }
});