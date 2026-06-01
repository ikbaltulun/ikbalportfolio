// Simple scroll animation script
document.addEventListener("DOMContentLoaded", () => {
    // --- Scroll Animations ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdownBtn = document.querySelector('.dropbtn');
    const dropdown = document.querySelector('.dropdown');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Mobile Dropdown Toggle
    dropdownBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Prevent scrolling to #work immediately
            dropdown.classList.toggle('active');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            // Don't close if they clicked "Work ▾" (the dropbtn)
            if (!link.classList.contains('dropbtn')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                dropdown.classList.remove('active'); // Reset dropdown state
            }
        });
    });

    // --- Lightbox Modal Logic ---
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close-modal');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

    // Open modal when clicking an overlay link
    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent opening in new tab
            const imgSrc = trigger.getAttribute('href'); // Get image URL
            modalImg.src = imgSrc;
            modal.classList.add('show');
        });
    });

    // Close modal when clicking the X button
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        // Optional: wait for animation to finish before clearing src to prevent visual pop
        setTimeout(() => {
            if (!modal.classList.contains('show')) modalImg.src = '';
        }, 300);
    });

    // Close modal when clicking anywhere outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                if (!modal.classList.contains('show')) modalImg.src = '';
            }, 300);
        }
    });
});
