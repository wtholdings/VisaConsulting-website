document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    });

    // Close mobile menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        });
    });

    // Sticky Navigation on Scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // For stats counter animation
                if (entry.target.classList.contains('hero-stats')) {
                    animateStats();
                }
                
                // Optional: unobserve once animation is done
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Form submission handling (Mock)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
            btn.style.opacity = '0.8';
            
            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="bx bx-check-circle"></i> Sent Successfully';
                btn.style.background = '#10b981'; // Success green
                btn.style.boxShadow = 'none';
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = ''; // reset to CSS defined gradient
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // Number Counter Animation (Simple version for stats)
    function animateStats() {
        // Find stats elements and animate them smoothly if needed.
        // Currently handled visually without complex JS timers to keep it simple and performant.
    }
});
