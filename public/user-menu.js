(() => {
    const userBadge = document.getElementById('userBadge');
    const badgeText = document.getElementById('badgeText');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutBtn = document.getElementById('logout-btn');
    const userMenu = document.querySelector('.user-menu');
    const signupModal = document.getElementById('signup-modal');

    let isLoggedIn = true;

    // Відкривати меню по наведенню (hover)
    userMenu.addEventListener('mouseenter', () => {
        if (!isLoggedIn) return;
        dropdownMenu.classList.add('open');
    });

    // Закривати меню, коли миша йде з області меню
    userMenu.addEventListener('mouseleave', () => {
        dropdownMenu.classList.remove('open');
        userBadge.blur();
    });

    // Відкривати/закривати меню по кліку на бейдж (додатково до hover)
    userBadge.addEventListener('click', (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            if (signupModal) signupModal.style.display = 'flex';
            return;
        }
        dropdownMenu.classList.toggle('open');
        e.stopPropagation();
    });

    // Закривати меню при кліку поза ним (по всій сторінці)
    document.addEventListener('click', (e) => {
        if (!userMenu.contains(e.target)) {
            dropdownMenu.classList.remove('open');
        }
    });

    // Вийти: змінити бейдж, заблокувати меню
    logoutBtn.addEventListener('click', () => {
        isLoggedIn = false;
        badgeText.textContent = 'Sign up';
        userBadge.classList.add('signed-out');
        dropdownMenu.classList.remove('open');
        userBadge.blur();
    });
})();