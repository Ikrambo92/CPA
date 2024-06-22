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

function validateForm() {
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const emailValue = emailInput.value;
    const messageValue = messageInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue.trim() === '') {
        alert('Please enter your email address.');
        emailInput.focus();
        return false;
    }

    if (!emailPattern.test(emailValue)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return false;
    }

    if (messageValue.trim() === '') {
        alert('Please enter your message.');
        messageInput.focus();
        return false;
    }

    return true;
}
