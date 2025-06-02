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
        // Щоб не додавати кілька разів обробник, спочатку видаляємо старий (якщо був)
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
        console.log('Login result:', result); // Додаємо лог для діагностики
        if (result.success) {
            alert('Вхід успішний!');
            if (window.setUserLoggedIn) window.setUserLoggedIn(result.username);
            // Додатково ховаємо банер на всяк випадок
            const banner = document.getElementById('login-banner');
            if (banner) banner.style.display = 'none';
            document.body.classList.remove('signup-modal-open');
        } else if (result.error === 'Invalid credentials') {
            alert('Дані не збігаються!');
        } else {
            alert('Логін не відбувся');
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

// Приклад автоматичного підключення після завантаження DOM
// (якщо банер і форма вже є у DOM)
document.addEventListener('DOMContentLoaded', function () {
    initSignupAndLoginListeners();
});

// Якщо банер і форма додаються або стають видимими пізніше (по кліку), 
// викликайте initSignupAndLoginListeners() відразу після того, як форма з'явилася у DOM.
// Наприклад, у вашому обробнику кліка на badge:
/// document.getElementById('login-banner').style.display = 'block';
/// initSignupAndLoginListeners();