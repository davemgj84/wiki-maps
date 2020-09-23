let map;
function initMap() {
  const options = {
    zoom: 12,
    center: { lat: 49.259660, lng: -123.107220 }
  }
  map = new google.maps.Map($('#map').get(0), options);
};

$(document).ready(() => {

  function createMarkers(markers) {
    for (coords of markers) {
      let contentString = `<h1>a town</h1><img src="${coords[2]}">`
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
    `
    return mapTemplate;
  }

  const renderMaps = (data) => {
    $('.items').empty();
    for (const map of data) {
      maps.push(map)
      const $map = createMapItem(map);
      $('.items').append($map);
    }
  }

  const loadMaps = () => {
    $.get('/maps', (res) => {
      renderMaps(res.maps);
    });
  };

  loadMaps();

  const loadLocations = (id) => {
    $.get(`/maps/${event.target.id}/locations`, (res) => {
      for (const latlong of res.maps) {
        markers.push([latlong.latitude, latlong.longitude]);
      }
    })
  }

  const $getLocation = $('.items');
  $getLocation.on('click', 'button', function (event) {
    markers = [];
    loadLocations(event.target.id)
    setTimeout(() => {
      $(() => {
        const options = {
          zoom: 12,
          center: { lat: 49.259660, lng: -123.107220 }
        }
        map = new google.maps.Map($('#map').get(0), options);
        createMarkers(markers);
      })
    }, 100);
  });

  let marcadores = [];
  const input = document.getElementById('search');
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(input);

  searchBox.addListener('places_changed', () => {
    let places = searchBox.getPlaces();
    if(places.length === 0)
  return;


marcadores.forEach((currentMarker) => {
  //to get rid of the map reference within that market
  currentMarker.setMap(null); });
  marcadores = [];

  const bounds = new google.maps.LatLngBounds();
  places.forEach(function (p) {
    if (!p.geometry) {
      return;
    }
    marcadores.push(new google.maps.Marker({
      map: map,
      title: p.name,
      position: p.geometry.location,
      draggable:true
    }))

    if (p.geometry.viewport) {
      // Extends this bounds to contain the union of this and the given bounds.
      bounds.union(p.geometry.viewport);
    } else {
      bounds.extend(p.geometry.location)}
      // console.log('name:',p.name)
      // console.log('lat:',p.geometry.location.lat())
      // console.log('lng:',p.geometry.location.lng())
      // console.log('markers4:', markers)

      const output = `<ul class='infoCoord'>
      <li id="lat">${p.name}</li>
      <li id="lat">${p.geometry.location.lat()}</li>
      <li id="lng">${p.geometry.location.lng()}</li>
      </ul>`;
        // $('.submit').click(function () {
      document.getElementById('infoCoord').innerHTML = output;
        // });
    });
    // adjust the viewport of the map
  map.fitBounds(bounds);
 })
});


