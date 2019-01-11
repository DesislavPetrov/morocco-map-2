
// initialize the map on the "map" div with a given center and zoom
var map = L.map('map').setView([32.365287, -6.926367], 8);

// create a new tile layer
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: '<a target="_blank" href=http://www.geocadder.bg/en>geocadder</a> | Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.light'
	}).addTo(map);

//////////////////////////    
// path and animation on it    
var mapOne = [
    [33.572594, -7.590092],
    [33.971550, -6.849886],
[35.168673, -5.268444],
    [33.872620, -5.540767],
    [34.017848, -5.008006],
    [31.436578, -4.234478],
    [31.080058, -4.013461],
[31.514472, -5.533190],
    [31.453210, -5.967615],
    [30.933385, -6.936862],
    [31.629410, -7.981125]
];

map.fitBounds(mapOne);

var markerOne = L.Marker.movingMarker(
    mapOne,
    10000, {autostart: true, loop: true}).addTo(map);

    var runnerIcon = L.icon({
        iconUrl: 'http://geocadder.bg/en/map-morocco/images/runner.png',
        iconSize: [15, 15], // size of the icon
        });

markerOne.setIcon(runnerIcon);

L.polyline(mapOne,
    {color: '#3399ff'}).addTo(map);



//////////////////////////////  
// loading cities from geojson
var icons = {
    'start-map' : L.icon({iconUrl:  "http://geocadder.bg/en/map-morocco/images/start-map.png",iconSize: [15,15]}),
    'city' : L.icon({iconUrl:  "http://geocadder.bg/en/map-morocco/images/city.png",iconSize: [15,15]}),
    'end-map' : L.icon({iconUrl:  "http://geocadder.bg/en/map-morocco/images/end-map.png",iconSize: [15,15]})
}

  var markersLayer = new L.GeoJSON(cities, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: icons[feature.properties.iconCategory]});
    },
    onEachFeature: function(feature, marker) {
      marker.bindPopup(feature.properties.cityName + ', '+ feature.properties.countryName);
    }
  });

map.addLayer(markersLayer);

///////////////////// modal
var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
