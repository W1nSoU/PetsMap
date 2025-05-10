window.initUserMenu = function() {
    const userBadge = document.getElementById('userBadge');
    const badgeText = document.getElementById('badgeText');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutBtn = document.getElementById('logout-btn');
    const userMenu = document.querySelector('.user-menu');
    const signupHeaderLink = document.getElementById('signupHeaderLink');
    let isLoggedIn = false;

    if (!userBadge || !userMenu || !dropdownMenu) return;

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

    // Відкриття банера
    function openLoginBanner() {
        const banner = document.getElementById('login-banner');
        if (banner) banner.style.display = 'flex';
        document.body.classList.add('signup-modal-open');
    }

    // Закриття банера
    function closeLoginBanner() {
        const banner = document.getElementById('login-banner');
        if (banner) banner.style.display = 'none';
        document.body.classList.remove('signup-modal-open');
    }

    // Клік по бейджу
    userBadge.addEventListener('click', (e) => {
        if (!isLoggedIn) {
            openLoginBanner();
            e.stopPropagation();
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
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            isLoggedIn = false;
            badgeText.textContent = 'Sign up';
            userBadge.classList.add('signed-out');
            dropdownMenu.classList.remove('open');
            userBadge.blur();
            if (signupHeaderLink) signupHeaderLink.style.display = 'inline-block';
        });
    }

    // Прив'язати закриття банера до хрестика
    document.addEventListener('click', (e) => {
        if (e.target.classList && e.target.classList.contains('close-banner')) {
            closeLoginBanner();
        }
    });
};