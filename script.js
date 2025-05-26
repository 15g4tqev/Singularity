document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active navigation link on scroll
    const sections = document.querySelectorAll('.hero-section');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call to set active link

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Modal functionality
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(`${modalId}-modal`);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
            // Remove focus from any focused element
            document.activeElement.blur();
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    // Remove focus from any focused element
                    document.activeElement.blur();
                }
            });
        }
    });

    // Registration modal handling
    const registerButtons = document.querySelectorAll('.nav-register-button, .btn.purple-outline');
    const registerModal = document.getElementById('register-modal');
    const registerForm = document.getElementById('register-form');

    registerButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            registerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission
        // For now, we'll just close the modal
        registerModal.classList.remove('active');
        document.body.style.overflow = '';
        // Remove focus from any focused element
        document.activeElement.blur();
    });

    // Update click outside modal to also remove focus
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                // Remove focus from any focused element
                document.activeElement.blur();
            }
        });
    });

    // Burger menu functionality
    const burgerMenu = document.querySelector('.burger-menu');
    const sidebar = document.querySelector('.sidebar');
    const mobileNavLinks = document.querySelectorAll('.nav-links a');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking a nav link on mobile
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                burgerMenu.classList.remove('active');
                sidebar.classList.remove('active');
            }
        });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !burgerMenu.contains(e.target) && 
            sidebar.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });
}); 