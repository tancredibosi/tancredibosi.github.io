const PRINTING_PROJECTS = [
    {
        title: 'Katana Stand',
        title_it: 'Katana Stand',
        description: 'A wall-mounted stand designed to present a katana cleanly and securely.',
        description_it: 'Supporto da parete progettato per esporre una katana in modo pulito e sicuro.',
        image: 'images/PRINTINGMAIN_Katana_Stand.jpg',
        date: '2023',
        link: 'https://www.printables.com/model/1037327-katana-stand',
        material: 'PLA'
    },
    {
        title: 'Composable Sunflower',
        title_it: 'Girasole componibile',
        description: 'A modular flower made to be printed, assembled and displayed.',
        description_it: 'Un fiore modulare pensato per essere stampato, assemblato ed esposto.',
        image: 'images/PRINTINGMAIN_sunflower.jpg',
        date: '2024',
        link: 'https://www.printables.com/model/1041345-sunflower-composable',
        material: 'PLA'
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('printing-grid');
    if (!grid) return;

    const language = localStorage.getItem('language') || 'it';
    grid.innerHTML = PRINTING_PROJECTS.map(project => {
        const title = language === 'it' ? project.title_it : project.title;
        const description = language === 'it' ? project.description_it : project.description;
        const action = language === 'it' ? 'Vedi modello' : 'View model';
        return `
            <article class="printing-card" data-reveal>
                <span class="printing-card__media"><img src="${project.image}" alt="${title}" width="900" height="675" loading="lazy"></span>
                <div class="printing-card__content">
                    <h2 data-en="${project.title}" data-it="${project.title_it}">${title}</h2>
                    <p data-en="${project.description}" data-it="${project.description_it}">${description}</p>
                    <p class="project-meta">${project.material} · ${project.date}</p>
                    <a href="${project.link}" class="text-link" target="_blank" rel="noopener noreferrer" data-en="View model" data-it="Vedi modello">${action}</a>
                </div>
            </article>`;
    }).join('');
});
