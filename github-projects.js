/**
 * GitHub Projects Fetcher
 * This script fetches repository information from GitHub API and displays it on the projects page.
 * It allows for custom repository selection, titles, and images.
 */

const GITHUB_USERNAME = 'tancredibosi'; // Replace with your GitHub username if different

// Configuration for repositories to display
// Add or remove repositories from this list to control what's displayed
const REPOSITORIES_CONFIG = [
    {
        name: 'LLM_Agents_Multiple-Choice_QA', // Repository name as it appears on GitHub
        customTitle: 'Legal MCQA with LLM Agents', // Custom title to display
        customTitle_it: 'MCQA Legale con Agenti LLM', // Italian title
        customImage: 'images/PROJECTMAIN_LLM_Agents_Multiple-Choice_QA.jpg', // Custom image path
        description: 'Multi-agent system based on open-source LLM for the classification of the correct answer through Web searches.', // Set to null to use GitHub description, or provide a custom one
        description_it: 'Sistema multi-agente basato su LLM open-source per la classificazione della risposta corretta attraverso ricerche Web.'
    },
    {
        name: 'nlp-assignments',
        customTitle: 'Classification of Sexist Tweets',
        customTitle_it: 'Classificazione di Tweet Sessisti',
        customImage: 'images/PROJECTMAIN_nlp-assignments.jpg',
        description: 'NLP assignments on sexist tweet classification using LSTMs, RoBERTa, and LLM prompting techniques.',
        description_it: 'Progetti NLP sulla classificazione di tweet sessisti con LSTM, RoBERTa e tecniche di prompting LLM.'
    },
    {
        name: 'IPCV_images_assignment2',
        customTitle: 'Groceries product classification and detection',
        customTitle_it: 'Classificazione e rilevamento di prodotti alimentari',
        customImage: 'images/PROJECTMAIN_IPCV_images_assignment2.jpg',
        description: 'Computer vision assignments on product detection and classification using CNNs and fine-tuned ResNet-18.',
        description_it: 'Progetti di computer vision sulla rilevazione e classificazione di prodotti con CNN e ResNet-18.'
    },
    // Add more repositories as needed
];

// Maximum number of projects to display if not enough are configured
const MAX_FALLBACK_PROJECTS = 6;

// Function to fetch GitHub repositories
async function fetchGitHubProjects() {
    try {
        // If we have configured repositories, fetch them specifically
        if (REPOSITORIES_CONFIG.length > 0) {
            const configuredRepos = [];
            
            // For each configured repository, fetch its data
            for (const repoConfig of REPOSITORIES_CONFIG) {
                try {
                    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoConfig.name}`);
                    
                    if (!response.ok) {
                        console.warn(`Could not fetch repository ${repoConfig.name}: ${response.status}`);
                        continue;
                    }
                    
                    const repoData = await response.json();
                    
                    // Add custom properties to the repository data
                    repoData.customTitle = repoConfig.customTitle;
                    repoData.customTitle_it = repoConfig.customTitle_it;
                    repoData.customImage = repoConfig.customImage;
                    if (repoConfig.description !== null) {
                        repoData.customDescription = repoConfig.description;
                    }
                    if (repoConfig.description_it !== null) {
                        repoData.description_it = repoConfig.description_it;
                    }
                    
                    configuredRepos.push(repoData);
                } catch (error) {
                    console.error(`Error fetching repository ${repoConfig.name}:`, error);
                }
            }
            
            return configuredRepos;
        } else {
            // Fallback: fetch latest repositories if no configuration is provided
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${MAX_FALLBACK_PROJECTS}`);
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            return await response.json();
        }
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        return [];
    }
}

// Function to create project cards from GitHub data
async function displayGitHubProjects() {
    const projectGrid = document.querySelector('.project-grid');
    
    // Get current language preference
    const currentLanguage = localStorage.getItem('language') || 'it';
    
    // Show loading state with correct language
    const loadingText = currentLanguage === 'it' ? 'Caricamento progetti da GitHub...' : 'Loading projects from GitHub...';
    projectGrid.innerHTML = `<div class="loading" data-en="Loading projects from GitHub..." data-it="Caricamento progetti da GitHub...">${loadingText}</div>`;
    
    try {
        const repos = await fetchGitHubProjects();
        
        if (repos.length === 0) {
            const noReposText = currentLanguage === 'it' ? 'Nessun repository GitHub trovato.' : 'No GitHub repositories found.';
            projectGrid.innerHTML = `<div class="error" data-en="No GitHub repositories found." data-it="Nessun repository GitHub trovato.">${noReposText}</div>`;
            return;
        }
        
        // Clear the loading message
        projectGrid.innerHTML = '';
        
        // Create a card for each repository
        repos.forEach(repo => {
            // Create project card element
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            // Get repository image (using custom image if available)
            let imageUrl;
            if (repo.customImage) {
                imageUrl = repo.customImage;
            } else {
                // Fallback to language-based image or default
                const languageImageMap = {
                    'Python': 'images/python-placeholder.jpg',
                    'JavaScript': 'images/javascript-placeholder.jpg',
                    'Java': 'images/java-placeholder.jpg',
                    'C++': 'images/cpp-placeholder.jpg'
                };
                
                imageUrl = languageImageMap[repo.language] || 'images/project1.jpg';
            }
            
            // Get repository title (using custom title if available)
            const title = repo.customTitle || repo.name;
            const title_it = repo.customTitle_it || repo.name;
            
            // Get repository description (using custom description if available)
            const description = repo.customDescription || repo.description || 'No description available.';
            const description_it = repo.description_it || repo.customDescription || repo.description || 'Nessuna descrizione disponibile.';
            
            // Format the date
            const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            // Get current language preference
            const currentLanguage = localStorage.getItem('language') || 'it';
            
            // Set the content based on language preference
            const displayTitle = currentLanguage === 'it' ? title_it : title;
            const displayDescription = currentLanguage === 'it' ? description_it : description;
            const languageText = currentLanguage === 'it' ? `Linguaggio: ${repo.language}` : `Language: ${repo.language}`;
            const updatedText = currentLanguage === 'it' ? `Aggiornato: ${updatedDate}` : `Updated: ${updatedDate}`;
            const viewOnGithubText = currentLanguage === 'it' ? 'Visualizza su GitHub' : 'View on GitHub';
            
            // Create the HTML for the project card
            projectCard.innerHTML = `
                <img src="${imageUrl}" alt="${displayTitle}" class="project-image">
                <div class="project-info">
                    <h3 data-en="${title}" data-it="${title_it}">${displayTitle}</h3>
                    <p data-en="${description}" data-it="${description_it}">${displayDescription}</p>
                    <p class="repo-details">
                        ${repo.language ? `<span class="language" data-en="Language: ${repo.language}" data-it="Linguaggio: ${repo.language}">${languageText}</span>` : ''}
                        <span class="updated" data-en="Updated: ${updatedDate}" data-it="Aggiornato: ${updatedDate}">${updatedText}</span>
                    </p>
                    <a href="${repo.html_url}" class="project-link" target="_blank" rel="noopener noreferrer" data-en="View on GitHub" data-it="Visualizza su GitHub">${viewOnGithubText}</a>
                </div>
            `;
            
            // Add the card to the grid
            projectGrid.appendChild(projectCard);
        });
        
    } catch (error) {
        console.error('Error displaying GitHub projects:', error);
        const errorText = currentLanguage === 'it' ? `Errore nel caricamento dei progetti: ${error.message}` : `Error loading projects: ${error.message}`;
        projectGrid.innerHTML = `<div class="error" data-en="Error loading projects: ${error.message}" data-it="Errore nel caricamento dei progetti: ${error.message}">${errorText}</div>`;
    }
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayGitHubProjects);