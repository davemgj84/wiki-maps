
const emptyContainer = () => {
  $('#side-bar').empty();
};

const createMarkers = (markers) => {
  console.log('Markers:', markers)
  for (const coords of markers) {
  console.log('coords:', coords[2])
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

const loadLocations = (id) => {
  $.get(`/maps/${id}/locations`, (res) => {
    console.log('res:', res)
    for (const latlong of res.maps) {
      markers.push([latlong.latitude, latlong.longitude]);
    }
  });
};

const getLocations = (target) => {
  const $getLocation = $(target);
  $getLocation.on('click', 'button', function(event) {
    markers = [];
    console.log("markers inside getlocations:", markers)
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
};
