const REPOSITORIES_CONFIG = [
    {
        name: 'LLM_Agents_Multiple-Choice_QA',
        customTitle: 'Legal MCQA with LLM Agents',
        customTitle_it: 'MCQA Legale con Agenti LLM',
        customImage: 'images/PROJECTMAIN_LLM_Agents_Multiple-Choice_QA.jpg',
        description: 'Multi-agent system built on open-source small language models for legal MCQA, with web search and agent collaboration.',
        description_it: 'Sistema multi-agente basato su Small Language Models open-source per MCQA legali, con ricerca web e collaborazione tra agenti.',
        category: 'LLM · NLP'
    },
    {
        name: 'nlp-assignments',
        customTitle: 'Classification of Sexist Tweets',
        customTitle_it: 'Classificazione di Tweet Sessisti',
        customImage: 'images/PROJECTMAIN_nlp-assignments.jpg',
        description: 'NLP work on sexist-tweet classification with LSTMs, RoBERTa and LLM prompting techniques.',
        description_it: 'Lavoro NLP sulla classificazione di tweet sessisti con LSTM, RoBERTa e tecniche di prompting LLM.',
        category: 'NLP'
    },
    {
        name: 'IPCV_images_assignment2',
        customTitle: 'Grocery product detection',
        customTitle_it: 'Rilevamento di prodotti alimentari',
        customImage: 'images/PROJECTMAIN_IPCV_images_assignment2.jpg',
        description: 'Computer-vision work on grocery detection and classification using CNNs and fine-tuned ResNet-18.',
        description_it: 'Lavoro di computer vision su rilevazione e classificazione di prodotti con CNN e ResNet-18.',
        category: 'Computer vision'
    },
    {
        name: 'AIII_synthetic_dataset',
        customTitle: 'HR Synthetic Data Generation',
        customTitle_it: 'Generazione dati sintetici per HR',
        customImage: 'images/PROJECTMAIN_AIII_synthetic_dataset.jpg',
        description: 'Synthetic hiring-data generation built with SDV.',
        description_it: 'Generazione di dati sintetici per l’ambito HR con SDV.',
        category: 'Data · ML'
    },
    {
        name: 'bosi-Regression_of_Used_Cars_Price',
        customTitle: 'Regression of Used Cars Price',
        customTitle_it: 'Regressione del prezzo di auto usate',
        customImage: 'images/PROJECTMAIN_bosi-Regression_of_Used_Cars_Price.jpg',
        description: 'Machine-learning exploration and prediction of used car prices.',
        description_it: 'Esplorazione e previsione del prezzo di auto usate con tecniche di machine learning.',
        category: 'Machine learning'
    },
];

function projectCard(config, language) {
    const title = language === 'it' ? config.customTitle_it : config.customTitle;
    const description = language === 'it' ? config.description_it : config.description;
    const action = language === 'it' ? 'Vedi su GitHub' : 'View on GitHub';
    const href = `https://github.com/tancredibosi/${config.name}`;

    return `
        <article class="project-card" data-reveal>
            <img src="${config.customImage}" alt="${title}" class="project-image" width="600" height="600" loading="lazy">
            <div class="project-info">
                <h2 data-en="${config.customTitle}" data-it="${config.customTitle_it}">${title}</h2>
                <p data-en="${config.description}" data-it="${config.description_it}">${description}</p>
                <p class="project-meta">${config.category}</p>
                <a href="${href}" class="text-link" target="_blank" rel="noopener noreferrer" data-en="View on GitHub" data-it="Vedi su GitHub">${action}</a>
            </div>
        </article>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#projects-grid');
    if (!grid) return;

    const language = localStorage.getItem('language') || 'it';
    const contactCard = `
        <article class="project-card project-card--contact" data-reveal>
            <div class="project-info">
                <p class="contact-card__title" data-en="Have a project in mind?" data-it="Hai un progetto in mente?">Hai un progetto in mente?</p>
                <p data-en="Tell me what you are building: I am open to collaborations and consulting." data-it="Raccontami cosa stai costruendo: sono aperto a collaborazioni e consulenze.">Raccontami cosa stai costruendo: sono aperto a collaborazioni e consulenze.</p>
                <a href="contact.html" class="text-link" data-en="Let's talk" data-it="Parliamone">Parliamone</a>
            </div>
        </article>`;
    grid.insertAdjacentHTML('beforeend', REPOSITORIES_CONFIG.map(config => projectCard(config, language)).join('') + contactCard);
});
