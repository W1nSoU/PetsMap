// document.addEventListener('DOMContentLoaded', () => {
//   fetch('header.html')
//       .then(resp => resp.text())
//       .then(html => {
//           document.getElementById('header').innerHTML = html;
//       })
//       .then(() => {
//           if (window.initUserMenu) window.initUserMenu();
//       });

//   fetch('footer.html')
//       .then(resp => resp.text())
//       .then(html => { document.getElementById('footer').innerHTML = html; });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('[1] DOMContentLoaded');
  
//     fetch('header.html')
//         .then(resp => resp.text())
//         .then(html => {
//             console.log('[2] header.html loaded');
//             document.getElementById('header').innerHTML = html;
//             console.log('[3] header inserted into DOM');
  
//             // ТУТ важливо: перевіряємо, чи з'явився потрібний елемент
//             const userBadge = document.getElementById('userBadge');
//             console.log('[4] userBadge exists:', !!userBadge);
  
//             if (window.initUserMenu) {
//                 console.log('[5] Calling initUserMenu');
//                 window.initUserMenu();
//             } else {
//                 console.warn('[5] initUserMenu is not defined yet');
//             }
//         });
  
//     fetch('footer.html')
//         .then(resp => resp.text())
//         .then(html => {
//             console.log('[6] footer.html loaded');
//             document.getElementById('footer').innerHTML = html;
//             console.log('[7] footer inserted into DOM');
//         });
//   });
  

document.addEventListener('DOMContentLoaded', () => {
    console.log('[1] DOMContentLoaded');
  
    fetch('header.html')
        .then(resp => resp.text())
        .then(html => {
            console.log('[2] header.html loaded');
            document.getElementById('header').innerHTML = html;
            console.log('[3] header inserted into DOM');
  
            // ТУТ важливо: перевіряємо, чи з'явився потрібний елемент
            const userBadge = document.getElementById('userBadge');
            console.log('[4] userBadge exists:', !!userBadge);
  
            if (window.initUserMenu) {
                console.log('[5] Calling initUserMenu');
                window.initUserMenu();
            } else {
                console.warn('[5] initUserMenu is not defined yet');
            }
        });
  
    fetch('footer.html')
        .then(resp => resp.text())
        .then(html => {
            console.log('[6] footer.html loaded');
            document.getElementById('footer').innerHTML = html;
            console.log('[7] footer inserted into DOM');
        });
  });
  