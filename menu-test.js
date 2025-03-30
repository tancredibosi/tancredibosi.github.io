// Test script to debug mobile menu issues
console.log('Testing mobile menu on 3dprinting.html and projects.html pages');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navButtons = document.querySelector('.nav-buttons');
    
    console.log('Menu toggle element:', menuToggle);
    console.log('Nav buttons element:', navButtons);
    
    if (menuToggle && navButtons) {
        console.log('Both elements found, adding event listener');
        menuToggle.addEventListener('click', function() {
            console.log('Menu toggle clicked');
            console.log('Nav buttons has show class before toggle:', navButtons.classList.contains('show'));
            navButtons.classList.toggle('show');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            console.log('Nav buttons has show class after toggle:', navButtons.classList.contains('show'));
        });
    } else {
        console.error('Mobile menu elements not found');
    }
});