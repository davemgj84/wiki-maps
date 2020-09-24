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

  // let maps = [];
  let markers;

  const createMapItem = (map) => {

    const mapTemplate =
    `<section class="items">
    <div class="map-link">
    <button type="submit" class="location-btn" id="${map.id}">${map.title}</button>
    </div>
    </section>
    `;
    return mapTemplate;
  };

  const renderMaps = (data) => {
    emptyContainer();
    for (const map of data) {
      // maps.push(map);
      const $map = createMapItem(map);
      $('#side-bar').append($map);
    }
  };

  const loadMaps = () => {
    $.get('/maps', (res) => {
      renderMaps(res.maps);
    });
  };

  const $browse = $('#browse');
  $browse.click(() => {
    $(() => {
      const options = {
        zoom: 12,
        center: { lat: 49.259660, lng: -123.107220 },
      };
      map = new google.maps.Map($('#map').get(0), options);
    });
    loadMaps();
  });

  const $logo = $('#logo');
  $logo.click(() => {
    $(() => {
      const options = {
        zoom: 12,
        center: { lat: 49.259660, lng: -123.107220 },
      };
      map = new google.maps.Map($('#map').get(0), options);
    });
    loadMaps();
  }); 

  getLocations('.items')
  loadMaps();

});
