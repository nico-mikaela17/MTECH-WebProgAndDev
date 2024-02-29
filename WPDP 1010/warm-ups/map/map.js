var map = L.map("map").setView([40.418196, -111.887337], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 500,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var marker = L.marker([40.418196, -111.887337]).addTo(map);

var circle = L.circle([40.29020487808087, -111.73476250163502], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 75
}).addTo(map);

marker.bindPopup('This is MTECH').openPopup()

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);