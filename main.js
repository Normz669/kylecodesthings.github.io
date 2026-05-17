// ── Typewriter effect ──
const lines = [
    'building backend systems',
    'optimising algorithms',
    'learning Go next',
    'solving real problems',
    'writing clean APIs',
];

let lineIndex = 0;
let charIndex = 0;
let deleting = false;
let paused = false;

const el = document.getElementById('typewriter');

function type() {
    if (!el) return;

    const current = lines[lineIndex];

    if (paused) {
        paused = false;
        setTimeout(type, 1200);
        return;
    }

    if (!deleting) {
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            paused = true;
            deleting = true;
            setTimeout(type, 80);
            return;
        }
    } else {
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            deleting = false;
            lineIndex = (lineIndex + 1) % lines.length;
        }
    }

    setTimeout(type, deleting ? 40 : 80);
}

type();

// ── Scroll reveal ──
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.building-card, .coming-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});
