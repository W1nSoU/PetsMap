let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 50.4501, lng: 30.5234 }, // Центр карти (Київ)
    zoom: 6,
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
  });

  // Масив притулків з детальною інформацією
  const shelters = [
    {
      name: "Shelter A",
      lat: 50.4501,
      lng: 30.5234,
      address: "вул. Київська, 1, Київ",
      phone: "+380441112233",
      description: "Найбільший притулок Києва. Понад 200 тварин шукають дім.",
    },
    {
      name: "Shelter B",
      lat: 49.8397,
      lng: 24.0297,
      address: "просп. Свободи, 10, Львів",
      phone: "+380322223344",
      description: "Притулок для котів та собак. Працюємо з 2010 року.",
    },
    {
      image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npbaVYegdmCndl0IIcBV_mICv-kzY1nBUva4059UQ_IHA5zS-qNsdBDqWO7mCR5bfuSK8eJkFe8Qi6LHG1qB_d6lSCR3D2u2jkBGJFWNfQdnevqLwwewgm0QBC82yapaqsScN1b=w426-h240-k-no",
      name: "Shelter C",
      lat: 48.9226,
      lng: 24.7111,
      address: "вул. Грушевського, 5, Івано-Франківськ",
      phone: "+380342556677",
      description: "Маленький, але затишний притулок для тварин.",
    },
    {
      image: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npbaVYegdmCndl0IIcBV_mICv-kzY1nBUva4059UQ_IHA5zS-qNsdBDqWO7mCR5bfuSK8eJkFe8Qi6LHG1qB_d6lSCR3D2u2jkBGJFWNfQdnevqLwwewgm0QBC82yapaqsScN1b=w426-h240-k-no",
      name: "Тваринний Притулок 'Милосердя'",
      lat: 49.8848696,
      lng: 23.9500426,
      address: "вул. Притулкова, 10, Львівська область",
      phone: "+380936587820", 
      description: "Притулок для тварин у Львівській області. Допомагаємо знайти дім для тварин.",
    },
    // Додай ще притулки тут
  ];

  // Додаємо маркери для всіх притулків
  shelters.forEach((shelter) => {
    const marker = new google.maps.Marker({
      position: { lat: shelter.lat, lng: shelter.lng },
      map: map,
      title: shelter.name,
    });

    // Інфо-вікно з унікальною інформацією
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="min-width:180px">
          <h4 style="margin:0 0 8px 0;">${shelter.name}</h4>
          <div style="font-size:0.97em;">
            <div><b>Адреса:</b> ${shelter.address}</div>
            <div><b>Телефон:</b> <a href="tel:${shelter.phone}">${shelter.phone}</a></div>
            <div style="margin-top:6px;">${shelter.description}</div>
          </div>
        </div>
      `,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
}

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