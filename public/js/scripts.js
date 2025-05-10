let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 50.4501, lng: 30.5234 }, // Центр карти (Київ)
    zoom: 6, // Масштаб
    mapTypeControl: false, // Вимикає кнопки "Карта"/"Супутник"
    fullscreenControl: false, // Вимикає кнопку повноекранного режиму
    streetViewControl: false, // Вимикає кнопку Street View
    zoomControl: false, // Вимикає кнопки масштабування
  });

  // Масив притулків (сюди додай свої реальні дані)
  const shelters = [
    { name: "Shelter A", lat: 50.4501, lng: 30.5234 },
    { name: "Shelter B", lat: 49.8397, lng: 24.0297 },
    { name: "Shelter C", lat: 48.9226, lng: 24.7111 },
    // { name: "Shelter D", lat: ..., lng: ... },
    // Додай ще притулки тут
  ];

  // Додаємо маркери для всіх притулків
  shelters.forEach((shelter) => {
    const marker = new google.maps.Marker({
      position: { lat: shelter.lat, lng: shelter.lng },
      map: map,
      title: shelter.name,
    });

    // Інфо-вікно з кнопкою Donate
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="min-width:140px">
          <h4 style="margin:0 0 8px 0;">${shelter.name}</h4>
          <button onclick="donateToShelter('${shelter.name.replace(/'/g, "\\'")}')" style="padding:6px 16px;background:#5b4d3b;color:#fff;border:none;border-radius:6px;cursor:pointer;">Donate</button>
        </div>
      `,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
}

// Глобальна функція для кнопки Donate
window.donateToShelter = function(shelterName) {
  alert(`Дякуємо за підтримку ${shelterName}!`);
};

// Якщо є кнопка "Знайти тварину"
const findShelterBtn = document.getElementById("findShelter");
if (findShelterBtn) {
  findShelterBtn.addEventListener("click", () => {
    alert("Функція пошуку тварин буде доступна скоро!");
  });
}

// Якщо є кнопка "Donate" окремо на сторінці
const donateBtn = document.getElementById("donate");
if (donateBtn) {
  donateBtn.addEventListener("click", () => {
    alert("Переходимо на сторінку донату...");
  });
}