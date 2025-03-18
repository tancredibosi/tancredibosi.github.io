document.addEventListener('DOMContentLoaded', function() {
    // Get theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference or use default dark theme
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the saved theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateIcon(currentTheme);
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        // Get the current theme
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        // Switch to the opposite theme
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update the HTML attribute
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save the preference to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update the icon
        updateIcon(newTheme);
    });
    
    // Function to update the icon based on theme
    function updateIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeToggle.setAttribute('title', 'Switch to light mode');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeToggle.setAttribute('title', 'Switch to dark mode');
        }
    }
});