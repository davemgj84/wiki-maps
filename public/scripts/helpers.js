
const emptyContainer = () => {
  $('#side-bar').empty();
};

const createMarkers = (markers) => {
  for (const coords of markers) {
    let contentString = `<h1>Vancouver Art Gallery</h1><h2>Art!</h2><img src="https://img.dealdrop.com/logos/shop.vanartgallery.bc.ca-logo-coupons.png">`;
    let latLng = new google.maps.LatLng(coords[0], coords[1]);
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    let infoWindow = new google.maps.InfoWindow({
      content: contentString,
      minWidth: 300,
      maxWidth: 300
    });
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  }
}

const loadLocations = (id) => {
  $.get(`/maps/${id}/locations`, (res) => {
    for (const latlong of res.maps) {
      markers.push([latlong.latitude, latlong.longitude]);
    }
  });
};

const getLocations = (target) => {
  const $getLocation = $(target);
  $getLocation.on('click', 'button', function(event) {
    markers = [];
    loadLocations(event.target.id);
    setTimeout(() => {
      $(() => {
        const options = {
          zoom: 12,
          center: { lat: 49.259660, lng: -123.107220 },
          styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ebe3cd"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#523735"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f1e6"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#c9b2a6"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#dcd2be"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#ae9e90"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#93817c"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#a5b076"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#447530"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f1e6"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#fdfcf8"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f8c967"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#e9bc62"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e98d58"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#db8555"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#806b63"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8f7d77"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#ebe3cd"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#b9d3c2"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#92998d"
                }
              ]
            }
          ]
        };
        map = new google.maps.Map($('#map').get(0), options);
        createMarkers(markers);
      });
    }, 100);
  });
};

// const getEditLocations = (target) => {
//   const $getLocation = $(target);
//   $getLocation.on('click', '.edit', function(event) {
//     markers = [];
//     loadLocations(event.target.id);
//     setTimeout(() => {
//       $(() => {
//         const options = {
//           zoom: 12,
//           center: { lat: 49.259660, lng: -123.107220 }
//         };
//         map = new google.maps.Map($('#map').get(0), options);
//         createMarkers(markers);
//       });
//     }, 100);
//   });
// };
