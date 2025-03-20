// Apply language preference immediately before DOM is fully loaded
const savedLanguage = localStorage.getItem('language') || 'it';
document.documentElement.setAttribute('data-language', savedLanguage);

document.addEventListener('DOMContentLoaded', function() {
    // Get language toggle button
    const languageToggle = document.getElementById('language-toggle');
    const languageIcon = document.getElementById('language-icon');
    
    // Check for saved language preference or use default Italian language
    const currentLanguage = localStorage.getItem('language') || 'it';
    
    // Apply the saved language on page load
    document.documentElement.setAttribute('data-language', currentLanguage);
    
    // Update icon and translate content based on current language
    updateLanguage(currentLanguage);
    
    // Toggle language when button is clicked
    languageToggle.addEventListener('click', function() {
        // Get the current language
        const currentLanguage = document.documentElement.getAttribute('data-language');
        
        // Switch to the opposite language
        const newLanguage = currentLanguage === 'it' ? 'en' : 'it';
        
        // Update the HTML attribute
        document.documentElement.setAttribute('data-language', newLanguage);
        
        // Save the preference to localStorage
        localStorage.setItem('language', newLanguage);
        
        // Update the icon and translate content
        updateLanguage(newLanguage);
    });
    
    // Function to update the icon based on language
    function updateLanguage(language) {
        if (language === 'it') {
            languageIcon.textContent = 'IT';
            languageToggle.setAttribute('title', 'Switch to English');
        } else {
            languageIcon.textContent = 'EN';
            languageToggle.setAttribute('title', 'Switch to Italian');
        }
        
        // Translate all elements with data-en and data-it attributes
        translateElements(language);
    }
    
    // Function to translate all elements with data-en and data-it attributes
    function translateElements(language) {
        const elementsToTranslate = document.querySelectorAll('[data-it][data-en]');
        
        elementsToTranslate.forEach(element => {
            if (language === 'it') {
                element.textContent = element.getAttribute('data-it');
            } else {
                element.textContent = element.getAttribute('data-en');
            }
        });
    }
});