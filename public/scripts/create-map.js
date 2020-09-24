/* global document */
/* eslint-env jquery */

$(document).ready(() => {
  let mapId = [];
  let userId = [];
  let markers = [];
  

  const emptyContainer = () => {
    $('#side-bar').empty();
  };

  const createMapForm = () => {
    const formTemplate =
      `<form id="new-map">
        <input type="text" id="new-map-title" placeholder="title">
        <input type="text" id="new-map-description" placeholder="description">
        <button id="submit-btn" type="submit">Next</button>
       </form>
      `;
    return formTemplate;
  };

  const createLocationForm = () => {
    const locationTemplate =
      `<form id="map-locations">
      <div id="location1">
      <h5>location one</h5>
        <input type="text" id="title" placeholder="title">
        <input type="text" id="description" placeholder="description">
        <input type="url" id="img-url" placeholder="imgURL">
      </div>
      <div id="location2">
      <h5>location one</h5>
        <input type="text" id="title" placeholder="title">
        <input type="text" id="description" placeholder="description">
        <input type="url" id="img-url" placeholder="imgURL">
      </div>
      <div id="location3">
      <h5>location one</h5>
        <input type="text" id="title" placeholder="title">
        <input type="text" id="description" placeholder="description">
        <input type="url" id="img-url" placeholder="imgURL">
      </div>
      <button type="submit" id="location-submit">Submit</button>
    </form>
      `;
    return locationTemplate;
  }

  

  const $create = $('#create');
  $create.on('click', () => {
    emptyContainer();
    const $sideBar = createMapForm();
    $('#side-bar').append($sideBar);
    $(() => {
      const options = {
        zoom: 12,
        center: { lat: 49.259660, lng: -123.107220 },
      };
      map = new google.maps.Map($('#map').get(0), options);
    });
  });

  const $sideBar = $('#side-bar');
  $sideBar.on('click', '#submit-btn', function(event){
    event.preventDefault();
    const title = event.target.form[0].value;
    const description = event.target.form[1].value;
    $.post('/maps', { 
      user_id: 1,
      title: title,
      description: description 
    })
    .done(function( data ) {
     mapId.push(data.maps.id);
     userId.push(data.maps.user_id)
    });
    
    emptyContainer();
    const $sideBarForm = createLocationForm();
    $sideBar.append($sideBarForm);
  });

  const createMapItem = (user) => {

    const mapTemplate =
      `<section class="items">
      <div class="map-link">
    <button type="submit" class="location-btn" id="${user.id}">${user.title}</button>
    </div>
    </section>
    `;
    return mapTemplate;
  };

  const renderUsersMaps = (data) => {
    emptyContainer();
    for (const user of data) {
      // maps.push(map);
      const $map = createMapItem(user);
      $('#side-bar').append($map);
    }
  };

  const loadUserMaps = (id) => {
    $.get(`/users/${id}`, (res) => {
      console.log(res);
      renderUsersMaps(res.users);
    });
  };

  const $myMaps = $('#my-maps');
  $myMaps.click(() => {
    loadUserMaps(userId[0]);
    $(() => {
      const options = {
        zoom: 12,
        center: { lat: 49.259660, lng: -123.107220 },
      };
      map = new google.maps.Map($('#map').get(0), options);
    });
    loadUserMaps(userId[0]);
  })

  $sideBar.on('click', '#location-submit', function(event) {
    event.preventDefault();
    const title1 = event.target.form[0].value;
    const description1 = event.target.form[1].value;
    const imgurl1 = event.target.form[2].value;
    const title2 = event.target.form[3].value;
    const description2 = event.target.form[4].value;
    const imgurl2 = event.target.form[5].value;
    const title3 = event.target.form[6].value;
    const description3 = event.target.form[7].value;
    const imgurl3 = event.target.form[8].value;
    $.post(`/maps/${mapId[0]}`, { locations: JSON.stringify([
    {
      title: title1,
      description: description1,
      image_url: imgurl1,
      latitude: 49.259660,
      longitude: -123.107220
    },
    {
      title: title2,
      description: description2,
      image_url: imgurl2,
      latitude: 49.259660,
      longitude: -123.107220
    },
    {
      title: title3,
      description: description3,
      image_url: imgurl3,
      latitude: 49.259660,
      longitude: -123.107220
    }
    ])
  })
  loadUserMaps(userId[0]);
  })

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

  const loadLocations = (id) => {
    $.get(`/maps/${id}/locations`, (res) => {
      for (const latlong of res.maps) {
        markers.push([latlong.latitude, latlong.longitude]);
      }
    });
  };

  const $getLocation = $('#side-bar');
  $getLocation.on('click', 'button', function(event) {
    markers = [];
    console.log(event.target)
    loadLocations(event.target.id);
    setTimeout(() => {
      $(() => {
        const options = {
          zoom: 12,
          center: { lat: 49.259660, lng: -123.107220 },
        };
        map = new google.maps.Map($('#map').get(0), options);
        createMarkers(markers);
      });
    }, 100);
  });
});