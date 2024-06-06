// Mobile Responsive
const burgerIcon = document.getElementById('burger-icon');
const navbar = document.getElementById('navbar');

const updateNavbarVisibility = () => {
    if (window.innerWidth > 1024) {
        navbar.classList.remove('hidden');
        burgerIcon.setAttribute('aria-expanded', true);
    } else {
        navbar.classList.add('hidden');
        burgerIcon.setAttribute('aria-expanded', false);
    }
};

updateNavbarVisibility();

burgerIcon.addEventListener('click', () => {
    navbar.classList.toggle('hidden');
    burgerIcon.setAttribute('aria-expanded', !navbar.classList.contains('hidden'));
});

window.addEventListener('resize', updateNavbarVisibility);

