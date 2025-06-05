console.log("signup.js loaded!");

// Асинхронний обробник submit для signup-форми
async function signupSubmitHandler(e) {
    e.preventDefault();
    console.log("Submit intercepted!");
    const form = e.target;
    const data = {
        username: form.username.value,
        email: form.email.value,
        phone: form.phone.value,
        password: form.pswd.value,
        volunteer: form.volunteer && form.volunteer.checked
    };
    try {
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
            alert('Реєстрація успішна!');
        } else {
            alert(result.error || 'Помилка реєстрації');
        }
    } catch (err) {
        alert('Помилка мережі');
        console.error(err);
    }
}

// Функція для підключення submit-обробника до signup-форми
function initSignupFormListener() {
    const form = document.getElementById('signupForm');
    if (form) {
        form.removeEventListener('submit', signupSubmitHandler);
        form.addEventListener('submit', signupSubmitHandler);
        console.log("signupForm handler attached!");
    } else {
        console.log("signupForm not found (init function)!");
    }
}

// Асинхронний обробник submit для login-форми
async function loginSubmitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        email: form.email.value,
        password: form.pswd.value
    };
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
            alert('Вхід успішний!');
            setUserLoggedIn(result.username);
        } else {
            alert(result.error || 'Дані не збігаються!');
        }
    } catch (err) {
        alert('Логін не відбувся');
        console.error(err);
    }
}

// Функція для підключення submit-обробника до login-форми
function initLoginFormListener() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.removeEventListener('submit', loginSubmitHandler);
        form.addEventListener('submit', loginSubmitHandler);
        console.log("loginForm handler attached!");
    } else {
        console.log("loginForm not found (init function)!");
    }
}

// Додаємо ініціалізацію login-форми разом із signup
function initSignupAndLoginListeners() {
    initSignupFormListener();
    initLoginFormListener();
}

// Підключаємо обробники після завантаження DOM
document.addEventListener('DOMContentLoaded', function () {
    initSignupAndLoginListeners();
});

// Якщо банер і форма додаються або стають видимими пізніше (по кліку), 
// викликайте initSignupAndLoginListeners() відразу після того, як форма з'явилася у DOM.

function setUserLoggedIn(username) {
    document.body.classList.add('logged-in');
    const badgeText = document.getElementById('badgeText');
    if (badgeText) badgeText.textContent = username;
    // Ховаємо банер логіну
    const banner = document.getElementById('login-banner');
    if (banner) banner.style.display = 'none';
}