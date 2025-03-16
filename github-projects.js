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
        customImage: 'images/PROJECTMAIN_LLM_Agents_Multiple-Choice_QA.jpg', // Custom image path
        description: 'Multi-agent system based on open-source LLM for the classification of the correct answer through Web searches.' // Set to null to use GitHub description, or provide a custom one
    },
    {
        name: 'nlp-assignments',
        customTitle: 'Classification of Sexist Tweets',
        customImage: 'images/PROJECTMAIN_nlp-assignments.jpg',
        description: null
    },
    {
        name: 'IPCV_images_assignment2',
        customTitle: 'Groceries product classification and detection',
        customImage: 'images/PROJECTMAIN_IPCV_images_assignment2.jpg',
        description: null
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
                    repoData.customImage = repoConfig.customImage;
                    if (repoConfig.description !== null) {
                        repoData.customDescription = repoConfig.description;
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
    
    // Show loading state
    projectGrid.innerHTML = '<div class="loading">Loading projects from GitHub...</div>';
    
    try {
        const repos = await fetchGitHubProjects();
        
        if (repos.length === 0) {
            projectGrid.innerHTML = '<div class="error">No GitHub repositories found.</div>';
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
            
            // Get repository description (using custom description if available)
            const description = repo.customDescription || repo.description || 'No description available.';
            
            // Format the date
            const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            // Create the HTML for the project card
            projectCard.innerHTML = `
                <img src="${imageUrl}" alt="${title}" class="project-image">
                <div class="project-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <p class="repo-details">
                        ${repo.language ? `<span class="language">Language: ${repo.language}</span>` : ''}
                        <span class="updated">Updated: ${updatedDate}</span>
                    </p>
                    <a href="${repo.html_url}" class="project-link" target="_blank">View on GitHub</a>
                </div>
            `;
            
            // Add the card to the grid
            projectGrid.appendChild(projectCard);
        });
        
    } catch (error) {
        console.error('Error displaying GitHub projects:', error);
        projectGrid.innerHTML = `<div class="error">Error loading projects: ${error.message}</div>`;
    }
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayGitHubProjects);