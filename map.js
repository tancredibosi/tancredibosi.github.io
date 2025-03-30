document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map
    const map = L.map('location-map').setView([44.4949, 11.3426], 13); // Bologna coordinates
    
    // Add theme-aware tile layer
    let tileLayer;
    
    function updateMapTheme() {
        // Remove existing tile layer if it exists
        if (tileLayer) {
            map.removeLayer(tileLayer);
        }
        
        // Check if dark mode is active
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            // Dark theme map
            tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '',
                maxZoom: 19
            }).addTo(map);
        } else {
            // Light theme map
            tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '',
                maxZoom: 19
            }).addTo(map);
        }
    }
    
    // Add a marker for Bologna
    const marker = L.marker([44.4949, 11.3426]).addTo(map);
    
    // Add a popup to the marker
    const currentLang = document.documentElement.lang || 'en';
    const popupText = currentLang === 'it' ? 'Bologna, Italia' : 'Bologna, Italy';
    marker.bindPopup(popupText).openPopup();
    
    // Initial theme setup
    updateMapTheme();
    
    // Listen for theme changes
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // The theme-switcher.js will handle the actual theme change
            // We just need to update the map after a small delay to ensure the theme has changed
            setTimeout(updateMapTheme, 100);
        });
    }
    
    // Listen for language changes
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            // Update the popup text based on the new language
            setTimeout(function() {
                const currentLang = document.documentElement.lang || 'en';
                const popupText = currentLang === 'it' ? 'Bologna, Italia' : 'Bologna, Italy';
                marker.setPopupContent(popupText);
            }, 100);
        });
    }
    
    // Make sure the map renders correctly after it's visible
    map.invalidateSize();
});