document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = {
        username: this.txt.value,
        email: this.email.value,
        phone: this.phone.value,
        password: this.pswd.value
    };
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
});