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