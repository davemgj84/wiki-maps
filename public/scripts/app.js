/* global document */
/* eslint-env jquery */

let map;
function initMap() {
  const options = {
    zoom: 12,
    center: { lat: 49.259660, lng: -123.107220 }
  };
  map = new google.maps.Map($('#map').get(0), options);
}

$(document).ready(() => {

  function createMarkers(markers) {
    for (const coords of markers) {
      let contentString = `<h1>a town</h1><img src="${coords[2]}">`;
      let latLng = new google.maps.LatLng(coords[0], coords[1]);
      let marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      let infoWindow = new google.maps.InfoWindow({
        content: contentString,
        minWidth: 300,
        maxWidth: 400
      });
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
    }
  }

  let maps = [];
  let markers;

  const createMapItem = (map) => {

    const mapTemplate =
    `<div class="map-link">
    <button type="submit" class="location-btn" id="${map.id}">${map.title}</button>
    </div>
    `;
    return mapTemplate;
  };

  const renderMaps = (data) => {
    $('.items').empty();
    for (const map of data) {
      maps.push(map);
      const $map = createMapItem(map);
      $('.items').append($map);
    }
  };

  const loadMaps = () => {
    $.get('/maps', (res) => {
      renderMaps(res.maps);
    });
  };

  loadMaps();

  const loadLocations = (id) => {
    $.get(`/maps/${id}/locations`, (res) => {
      for (const latlong of res.maps) {
        markers.push([latlong.latitude, latlong.longitude]);
      }
    });
  };

  const $getLocation = $('.items');
  $getLocation.on('click', 'button', function(event) {
    markers = [];
    loadLocations(event.target.id);
    setTimeout(() => {
      $(() => {
        const options = {
          zoom: 12,
          center: { lat: 49.259660, lng: -123.107220 }
        };
        map = new google.maps.Map($('#map').get(0), options);
        createMarkers(markers);
      });
    }, 100);
  });

});


