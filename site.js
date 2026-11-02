document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('[data-reveal]');

    if (reducedMotion || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.animate([
                    { opacity: 0, transform: 'translateY(14px)' },
                    { opacity: 1, transform: 'translateY(0)' },
                ], { duration: 420, delay: Number.parseInt(entry.target.dataset.delay || '0', 10), easing: 'cubic-bezier(.2,.65,.3,1)', fill: 'both' });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach((element, index) => {
        element.dataset.delay = `${Math.min(index % 4, 3) * 70}`;
        observer.observe(element);
    });
});
