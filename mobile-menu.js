// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navButtons = document.querySelector('.nav-buttons');
    
    // Toggle mobile menu when hamburger icon is clicked
    if (menuToggle && navButtons) {
        menuToggle.addEventListener('click', function() {
            navButtons.classList.toggle('show');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    } else {
        console.error('Mobile menu elements not found');
    }
    
    // Close menu when a navigation link is clicked
    const navLinks = document.querySelectorAll('.nav-buttons .btn');
    if (navLinks.length > 0 && menuToggle && navButtons) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768 && navButtons.classList.contains('show')) {
                    navButtons.classList.remove('show');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        });
    }
    
    // Close menu when clicking outside
    if (menuToggle && navButtons) {
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navButtons.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navButtons.classList.contains('show')) {
                navButtons.classList.remove('show');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Handle window resize
    if (menuToggle && navButtons) {
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navButtons.classList.contains('show')) {
                navButtons.classList.remove('show');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});