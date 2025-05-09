document.addEventListener('DOMContentLoaded', () => {
  fetch('header.html')
      .then(resp => resp.text())
      .then(html => {
          document.getElementById('header').innerHTML = html;
      })
      .then(() => {
          if (window.initUserMenu) window.initUserMenu();
      });

  fetch('footer.html')
      .then(resp => resp.text())
      .then(html => { document.getElementById('footer').innerHTML = html; });
});