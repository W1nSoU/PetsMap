const userBadge = document.getElementById('userBadge');
const badgeText = document.getElementById('badgeText');
const dropdownMenu = document.getElementById('dropdownMenu');
const logoutBtn = document.getElementById('logout-btn');
const userMenu = document.querySelector('.user-menu');

let isLoggedIn = true;

// Відкривати меню по наведенню, тільки якщо залогінений
userMenu.addEventListener('mouseenter', () => {
    if (!isLoggedIn) return;
    dropdownMenu.classList.add('open');
});

// Закривати меню, коли миша йде з області меню
userMenu.addEventListener('mouseleave', () => {
    dropdownMenu.classList.remove('open');
    // Також знімаємо фокус з бейджа, щоб гамбургер точно зник
    userBadge.blur();
});

// Вийти: змінити бейдж, заблокувати меню
logoutBtn.addEventListener('click', () => {
    isLoggedIn = false;
    badgeText.textContent = 'Sign In';
    userBadge.classList.add('signed-out');
    dropdownMenu.classList.remove('open');
    // Знімаємо фокус з бейджа, щоб прибрати гамбургер
    userBadge.blur();
});

// Забороняємо відкривати меню або змінювати статус при кліку на "Sign In"
userBadge.addEventListener('click', (e) => {
    if (!isLoggedIn) {
        e.preventDefault();
        return;
    }
});