function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 48.3794, lng: 31.1656 }, // Center of Ukraine
    zoom: 6,
  });

  // Example shelter locations
  const shelters = [
    { name: "Shelter A", lat: 50.4501, lng: 30.5234 },
    { name: "Shelter B", lat: 49.8397, lng: 24.0297 },
    { name: "Shelter C", lat: 48.9226, lng: 24.7111 },
  ];

  shelters.forEach((shelter) => {
    const marker = new google.maps.Marker({
      position: { lat: shelter.lat, lng: shelter.lng },
      map: map,
      title: shelter.name,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<h4>${shelter.name}</h4><button onclick="donateToShelter('${shelter.name}')">Donate</button>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
}

function donateToShelter(shelterName) {
  alert(`Thank you for supporting ${shelterName}!`);
}

document.getElementById("findShelter").addEventListener("click", () => {
  alert("Feature coming soon!");
});

document.getElementById("donate").addEventListener("click", () => {
  alert("Redirecting to donation page...");
});

// Елементи
const userBadge = document.getElementById('userBadge');
const badgeText = document.getElementById('badgeText');
const dropdownMenu = document.getElementById('dropdownMenu');
const logoutBtn = document.getElementById('logout-btn');

let isLoggedIn = true;

// Показ/приховування меню
userBadge.addEventListener('click', () => {
  if (!isLoggedIn) return; // Якщо не залогінений — меню не відкривається
  dropdownMenu.classList.toggle('open');
});

// Закриття меню при кліку поза ним (опціонально)
document.addEventListener('click', (e) => {
  if (!userBadge.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove('open');
  }
});

// Вийти з акаунта
logoutBtn.addEventListener('click', () => {
  isLoggedIn = false;
  badgeText.textContent = 'Sign In';
  dropdownMenu.classList.remove('open');
  userBadge.classList.add('signed-out');
});

// (Опціонально) простий вхід назад
userBadge.addEventListener('click', () => {
  if (!isLoggedIn) {
    isLoggedIn = true;
    badgeText.textContent = 'W1nSoU';
    userBadge.classList.remove('signed-out');
  }
});