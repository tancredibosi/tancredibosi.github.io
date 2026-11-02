document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (!contactForm || !formStatus) return;

    const language = () => document.documentElement.getAttribute('data-language') || 'it';
    const showStatus = (type, message) => {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
    };

    if (new URLSearchParams(window.location.search).has('submitted')) {
        showStatus('success', language() === 'it' ? 'Grazie per il messaggio. Risponderò presto.' : 'Thanks for your message. I will get back to you soon.');
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    contactForm.addEventListener('submit', (event) => {
        const required = ['name', 'surname', 'email', 'message'].map(id => document.getElementById(id).value.trim());
        if (required.some(value => !value)) {
            event.preventDefault();
            showStatus('error', language() === 'it' ? 'Compila tutti i campi obbligatori.' : 'Please complete all required fields.');
            return;
        }

        const email = document.getElementById('email').value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            event.preventDefault();
            showStatus('error', language() === 'it' ? 'Inserisci un indirizzo email valido.' : 'Enter a valid email address.');
            return;
        }

        const submit = contactForm.querySelector('[type="submit"]');
        submit.disabled = true;
        submit.textContent = language() === 'it' ? 'Invio…' : 'Sending…';
    });

    document.getElementById('language-toggle')?.addEventListener('click', () => { formStatus.textContent = ''; formStatus.className = 'form-status'; });
});
