const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle('isVisible', entry.isIntersecting);
    });
}, {
    threshold: 0.1
});

const elements = document.querySelectorAll('.fadeInRechts, .fadeInLinks');

elements.forEach((e) => {
    observer.observe(e);
});