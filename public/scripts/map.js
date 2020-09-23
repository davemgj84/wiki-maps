// const { loadLocations } = require('./app')

// let map;

// function initMap() {
//   const mapId = document.getElementById('map')
//   const options = {
//     zoom: 10,
//     center: {
//       lat: 49.259660,
//       lng: -123.107220
//     }
//   }

//   map = new google.maps.Map(mapId, options)

//   createMarkers(markers);
// }


// function createMarkers (markers) {
//   for (const coords of markers) {
//     console.log(coords)
//     let latLng = new google.maps.LatLng(coords[0], coords[1]);
//     let marker = new google.maps.Marker({position: latLng, map: map});
//   }
// }
