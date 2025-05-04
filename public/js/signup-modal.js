(() => {
    const signupModal = document.getElementById('signup-modal');
    if (signupModal) {
        signupModal.addEventListener('click', function (e) {
            // Якщо клік був саме по фону, а не по формі — закриваємо модалку
            if (e.target === this) {
                this.style.display = 'none';
                // НЕ змінюємо нічого у бейджі чи статусі isLoggedIn
            }
        });
    }
})();