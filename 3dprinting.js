/**
 * 3D Printing Projects Display
 * This script manages the display of 3D printing projects on the 3D printing page.
 * It allows for custom project configuration with titles, descriptions, images, and links.
 */

// Configuration for 3D printing projects to display
// Add or remove projects from this list to control what's displayed
const PRINTING_PROJECTS = [
    {
        title: 'Katana Stand',
        title_it: 'Katana Stand',
        description: 'A fully articulated dragon model with movable joints and detailed scales. Printed with 0.12mm layer height for maximum detail.',
        description_it: 'Un modello di drago completamente articolato con giunti mobili e scaglie dettagliate. Stampato con altezza dello strato di 0,12 mm per il massimo dettaglio.',
        image: 'images/PRINTINGMAIN_Katana_Stand.jpg', // Reusing existing image as placeholder
        date: '2023-10-12',
        link: 'https://www.printables.com/model/1037327-katana-stand',
        tags: ['PLA', 'Articulated', 'Fantasy', '0.12mm Layer Height']
    },
    {
        title: 'Composable Sunflower',
        title_it: 'Girasole Composibile',
        description: '',
        description_it: '',
        image: 'images/PRINTINGMAIN_sunflower.jpg', // Reusing existing image as placeholder
        date: '2024-10-20',
        link: 'https://www.printables.com/model/1041345-sunflower-composable', // Example link - replace with actual if available
        tags: [],
    },
    // Add more projects as needed
];

// Function to create project cards from the configuration
function displayPrintingProjects() {
    const projectGrid = document.getElementById('printing-grid');
    
    // Clear any existing content
    projectGrid.innerHTML = '';
    
    // Create a card for each project
    PRINTING_PROJECTS.forEach(project => {
        // Create project card element
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Format the date
        const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Create tags HTML
        const tagsHTML = project.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('');
        
        // Create the HTML for the project card
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <h3 data-en="${project.title}" data-it="${project.title_it}">${project.title}</h3>
            <div class="card-footer">
                <p class="updated" data-en="Created: ${formattedDate}" data-it="Creato: ${formattedDate}">Created: ${formattedDate}</p>
                ${project.link ? `<a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer" data-en="View Model" data-it="Visualizza Modello">View Model</a>` : ''}
            </div>
        `;

        
        // Add the card to the grid
        projectGrid.appendChild(projectCard);
    });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayPrintingProjects);