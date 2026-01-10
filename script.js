// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navLinksContainer = document.getElementById('navLinks');
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
            }
        });
    });
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize chat widget
    initChatWidget();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Portfolio filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact form submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.email || !data.message) {
        alert('Proszę wypełnić wszystkie wymagane pola.');
        return;
    }
    
    if (!data.agree) {
        alert('Proszę zaakceptować politykę prywatności.');
        return;
    }
    
    // Show success message
    alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
    
    // Reset form
    event.target.reset();
}

// Scroll to section for policy page
function scrollToSection(event, selector, index) {
    event.preventDefault();
    const sections = document.querySelectorAll(selector);
    if (sections[index]) {
        sections[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll reveal animation system
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Add scroll-reveal class to elements
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .feature-item, .testimonial-card, .mission-card, .team-member, .equipment-card, .video-wrapper, .pricing-column');
    
    animatedElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-home');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== CHAT WIDGET FUNCTIONALITY =====
function initChatWidget() {
    const chatButton = document.getElementById('chatButton');
    const chatPanel = document.getElementById('chatPanel');
    const chatClose = document.getElementById('chatClose');
    const chatOptions = document.getElementById('chatOptions');
    const quickContactForm = document.getElementById('quickContactForm');
    const backButton = document.getElementById('backButton');
    
    if (!chatButton || !chatPanel) return;
    
    // Toggle chat panel
    chatButton.addEventListener('click', function() {
        chatPanel.classList.toggle('active');
        // Reset to options view when opening
        if (chatPanel.classList.contains('active')) {
            showChatOptions();
        }
    });
    
    // Close chat panel
    chatClose.addEventListener('click', function() {
        chatPanel.classList.remove('active');
    });
    
    // Chat option handlers
    document.querySelectorAll('.chat-option').forEach(option => {
        option.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'call':
                    window.location.href = 'tel:+48607200066';
                    break;
                case 'email':
                    window.location.href = 'mailto:kontakt@grecord.pl';
                    break;
                case 'form':
                    showQuickContactForm();
                    break;
                case 'whatsapp':
                    window.open('https://wa.me/48607200066', '_blank');
                    break;
            }
        });
    });
    
    // Back button
    if (backButton) {
        backButton.addEventListener('click', function() {
            showChatOptions();
        });
    }
    
    // Quick contact form submission
    const quickForm = document.getElementById('quickFormElement');
    if (quickForm) {
        quickForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('quickName').value;
            const email = document.getElementById('quickEmail').value;
            const message = document.getElementById('quickMessage').value;
            
            if (!name || !email || !message) {
                alert('Proszę wypełnić wszystkie pola.');
                return;
            }
            
            // Show success message
            alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
            
            // Reset form and close
            quickForm.reset();
            chatPanel.classList.remove('active');
            showChatOptions();
        });
    }
    
    function showChatOptions() {
        if (chatOptions && quickContactForm) {
            chatOptions.style.display = 'flex';
            quickContactForm.classList.remove('active');
        }
    }
    
    function showQuickContactForm() {
        if (chatOptions && quickContactForm) {
            chatOptions.style.display = 'none';
            quickContactForm.classList.add('active');
        }
    }
}

document.addEventListener('click', function(event) {
    const chatWidget = document.querySelector('.chat-widget');
    const chatPanel = document.getElementById('chatPanel');
    
    if (chatWidget && chatPanel && chatPanel.classList.contains('active')) {
        if (!chatWidget.contains(event.target)) {
            chatPanel.classList.remove('active');
        }
    }
});
