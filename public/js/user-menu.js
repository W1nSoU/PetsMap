window.initUserMenu = function() {
    const userBadge = document.getElementById('userBadge');
    const badgeText = document.getElementById('badgeText');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutBtn = document.getElementById('logout-btn');
    const userMenu = document.querySelector('.user-menu');
    let isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    let username = sessionStorage.getItem('username') || '';

    function setLoggedIn(val, name) {
        isLoggedIn = val;
        sessionStorage.setItem('isLoggedIn', val ? 'true' : 'false');
        if (val) {
            document.body.classList.add('logged-in');
            userBadge.classList.remove('signed-out');
            badgeText.textContent = name || username || 'Аккаунт';
            sessionStorage.setItem('username', name || username || '');
            dropdownMenu.classList.remove('open'); // закриваємо дропдаун при логіні
        } else {
            document.body.classList.remove('logged-in');
            userBadge.classList.add('signed-out');
            badgeText.textContent = 'Увійти';
            dropdownMenu.classList.remove('open');
            sessionStorage.removeItem('username');
        }
        console.log('[Auth] Logged in:', val);
    }
    setLoggedIn(isLoggedIn, username);

    if (!userBadge || !userMenu || !dropdownMenu) return;

    // Клік по бейджу: якщо залогінений — дропдаун, якщо ні — банер
    userBadge.addEventListener('click', (e) => {
        if (isLoggedIn) {
            dropdownMenu.classList.toggle('open');
        } else {
            const banner = document.getElementById('login-banner');
            if (banner) banner.style.display = 'flex';
            document.body.classList.add('signup-modal-open');
        }
        e.stopPropagation();
    });

    // Дропдаун закривається при кліку поза меню
    document.addEventListener('click', (e) => {
        if (!userMenu.contains(e.target)) {
            dropdownMenu.classList.remove('open');
        }
    });

    // Відкривати дропдаун по hover тільки якщо залогінений
    userMenu.addEventListener('mouseenter', () => {
        console.log('[Hover] Mouse entered userMenu. isLoggedIn:', isLoggedIn);
        if (isLoggedIn) dropdownMenu.classList.add('open');
    });

    // Нова логіка для mouseleave: враховує і userMenu, і dropdownMenu
    let hoverTimeout;
    function checkMouseLeave(e) {
        // Зачекаємо трохи, щоб дати шанс мишці перейти між userMenu і dropdownMenu
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
            if (!userMenu.matches(':hover') && !dropdownMenu.matches(':hover')) {
                dropdownMenu.classList.remove('open');
                userBadge.blur();
            }
        }, 100); // затримка 100 мс
    }
    userMenu.addEventListener('mouseleave', checkMouseLeave);
    dropdownMenu.addEventListener('mouseleave', checkMouseLeave);
    userBadge.addEventListener('mouseleave', checkMouseLeave);
    userBadge.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
    });
    dropdownMenu.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
    });
    userMenu.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
    });

    // Вийти з аккаунту
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            setLoggedIn(false);
            dropdownMenu.classList.remove('open');
        });
    }

    // Закриття банера по хрестику
    document.addEventListener('click', (e) => {
        if (e.target.classList && e.target.classList.contains('close-banner')) {
            const banner = document.getElementById('login-banner');
            if (banner) banner.style.display = 'none';
            document.body.classList.remove('signup-modal-open');
        }
    });

    // Глобальна функція для логіну з signup.js
    window.setUserLoggedIn = function(name) {
        setLoggedIn(true, name);
        const banner = document.getElementById('login-banner');
        if (banner) banner.style.display = 'none';
        document.body.classList.remove('signup-modal-open');
        dropdownMenu.classList.remove('open');
    };
};
// test