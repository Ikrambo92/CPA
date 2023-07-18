document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.navlist');

    hamburgerMenu.addEventListener('click', function () {
        navList.classList.toggle('active');
    });
});
