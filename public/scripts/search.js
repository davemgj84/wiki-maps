
function initMap() {

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

  const input = document.getElementById('search');
  const searchBox = new google.maps.places.SearchBox(input);
  const geocoder = new google.maps.Geocoder();

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  })

  map.addListener('bounds_changed', () => {
    //Set bounds in the searchb box to our map bounds
    searchBox.setBounds(map.getBounds());
  });

  google.maps.event.trigger(input, 'focus')
  google.maps.event.trigger(input, 'keydown', {
      keyCode: 13
  });

  let markers = [];

  //The below callback will fire when our user selects a prediction from the list
  searchBox.addListener('places_changed', () => {
    let places = searchBox.getPlaces();
    if (places.length === 0)
      return;

    //coodrinate boundaries of a map
    const bounds = new google.maps.LatLngBounds();
    places.forEach(function(p) {
      if (!p.geometry) {
        return;
      }

      const marker = new google.maps.Marker({
        map: map,
        title: p.name,
        position: p.geometry.location,
        draggable: true
      })
      markers.push(marker);
      marker.pinId = markers.length;

      google.maps.event.addListener(marker, 'dragend', function() {
        $(`#location${marker.pinId} .lat`).val(marker.getPosition().lat());
        $(`#location${marker.pinId} .long`).val(marker.getPosition().lng());
      })

      // find the right input
      $(`#location${marker.pinId} .lat`).val(marker.position.lat());
      $(`#location${marker.pinId} .long`).val(marker.position.lng());
      // put the lat in the input

      if (p.geometry.viewport) {
        // Extends this bounds to contain the union of this and the given bounds.
        bounds.union(p.geometry.viewport);
      } else {
        bounds.extend(p.geometry.location)
      }
    });

    // adjust the viewport of the map
    map.fitBounds(bounds);
    return markers;

  })
}
