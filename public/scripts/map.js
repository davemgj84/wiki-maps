/* global document */
/* eslint-env jquery */

$(document).ready(() => {

  let mapId = [];
  let userId = [];
  let markers = [];
  let editButton = [];

  const createMapForm = () => {
    const formTemplate =
      `<form id="new-map">
        <h2>Create New Map</h2>
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
      <h2>Location one</h2>
        <input type="text" id="title" placeholder="title">
        <input type="text" id="description" placeholder="description">
        <input type="url" id="img-url" placeholder="imgURL">
        <span class="lat-long"><input type="text" class="lat" placeholder="latitude">
        <input type="text" class="long" placeholder="longitude"></span>
      </div>
      <div id="location2">
      <h2>Location two</h2>
        <input type="text" id="title" placeholder="title">
        <input type="text" id="description" placeholder="description">
        <input type="url" id="img-url" placeholder="imgURL">
        <span class="lat-long"><input type="text" class="lat" placeholder="latitude">
        <input type="text" class="long" placeholder="longitude"></span>
      </div>
      <div id="location3">
      <h2>Location three</h2>
        <input type="text" id="title" placeholder="title">
        <input type="text" id="description" placeholder="description">
        <input type="url" id="img-url" placeholder="imgURL">
        <span class="lat-long"><input type="text" class="lat" placeholder="latitude">
        <input type="text" class="long" placeholder="longitude"></span>
      </div>
      <span class="add"> <i class="fas fa-plus-circle fa-lg"></i> Add New Locations </span>
      <button type="submit" id="location-submit">Submit</button>
    </form>
      `;
    return locationTemplate;
  };

  //
  const createEditForm = (data) => {
    const editForm =
      `<form id="edit-locations">
      <div id="edit-location1">
      <h2>Location one</h2>
        <input type="text" id="title" placeholder="title" value="${data.maps[0].title}">
        <input type="text" id="description" placeholder="description" value="${data.maps[0].description}">
        <input type="url" id="img-url" placeholder="imgURL" value="${data.maps[0].image_url}">
        <button type="submit" id="edit-submit-1">Edit</button>
      </div>
      <div id="edit-location2">
      <h2>Location two</h2>
        <input type="text" id="title" placeholder="title" value="${data.maps[1].title}">
        <input type="text" id="description" placeholder="description" value="${data.maps[1].description}">
        <input type="url" id="img-url" placeholder="imgURL" value="${data.maps[1].image_url}">
        <button type="submit" id="edit-submit-2">Edit</button>
      </div>
      <div id="edit-location3">
      <h2>Location three</h2>
        <input type="text" id="title" placeholder="title" value="${data.maps[2].title}">
        <input type="text" id="description" placeholder="description" value="${data.maps[2].description}">
        <input type="url" id="img-url" placeholder="imgURL" value="${data.maps[2].image_url}">
        <button type="submit" id="edit-submit-3">Edit</button>
      </div>
    </form>
      `;
    return editForm;
  };

  const $create = $('#create');
  $create.on('click', () => {
    emptyContainer();
    const $sideBar = createMapForm();
    $('#side-bar').append($sideBar);
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
    });
  });

  // SUBMIT FORM FOR MAP TITLE/DESCRIPTION
  const $sideBar = $('#side-bar');
  $sideBar.on('click', '#submit-btn', function(event) {
    event.preventDefault();
    const title = event.target.form[0].value;
    const description = event.target.form[1].value;
    $.post('/maps', {
      user_id: 1,
      title: title,
      description: description
    })
      .done(function(data) {
        mapId.push(data.maps.id);
        userId.push(data.maps.user_id);
      });

    emptyContainer();
    const $sideBarForm = createLocationForm();
    $sideBar.append($sideBarForm);
  });

  const createMapItem = (map) => {
    const mapTemplate =
      `<section class="items">
    <div class="map-link">
    <button type="submit" class="location-btn" id="${map.id}">${map.title}</button>
    <span class="edit-delete">
    <span id="${map.id}" class="edit"> <i class="fas fa-edit fa-lg"> </i></span>
    <span id="${map.id}" class="delete"><i class="fas fa-trash fa-lg"></i> </span>
    </span>
    </div>
    </section>
    `;
    return mapTemplate;
  };

  const renderUsersMaps = (data) => {
    emptyContainer();
    for (const user of data) {
      const $map = createMapItem(user);
      $('#side-bar').append($map);
    }
  };

  const loadUserMaps = (id) => {
    $.get(`/users/${id}`, (res) => {
      renderUsersMaps(res.users);
    });
  };

  // function to edit locations
  $.patch = function(url, data, callback, type) {
    if ($.isFunction(data)) {
      type = type || callback,
        callback = data,
        data = {}
    }
    return $.ajax({
      url: url,
      type: 'PATCH',
      success: callback,
      data: data,
      contentType: type
    });
  }

  // GET request to edit locations
  const $edit = $('#side-bar');
  $edit.on('click', '.edit', (event) => {
    $.get(`/maps/${event.currentTarget.id}/locations`, (res) => {
      editButton.push(event.currentTarget.id);
      const locations = res;
      emptyContainer();
      const editForm = createEditForm(locations);
      $('#side-bar').append(editForm);
    })
  });

  // hardcoded user - not changing lat-long yet
  $edit.on('click', 'edit-submit-1', (event) => {
    preventDefault();
    const title1 = event.target.form[0].value;
    console.log(event.target.form[0].value)
    const description1 = event.target.form[1].value;
    const imgurl1 = event.target.form[2].value;
    $.patch(`/maps/${editButton[0]}/edit`, {
      title: title1,
      description: description1,
      image_url: imgurl1,
      latitude: 49.259660,
      longitude: -123.107220,
      id: 1
    });
  });


  // creates ajax delete function
  $.delete = function(url, data, callback, type) {
    if ($.isFunction(data)) {
      type = type || callback,
        callback = data,
        data = {}
    }
    return $.ajax({
      url: url,
      type: 'DELETE',
      success: callback,
      data: data,
      contentType: type
    });
  }

  // Hardcoded user*** delete map
  const $delete = $('#side-bar');
  $delete.on('click', '.delete', (event) => {
    $.delete(`/maps/${event.currentTarget.id}/delete`, () => {
      loadUserMaps(1);
    });
  });

  // Hardcoded user***
  const $myMaps = $('#my-maps');
  $myMaps.click(() => {
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
    });
    loadUserMaps(1);
  });

  // Hardcoded user***
  $sideBar.on('click', '#location-submit', function(event) {
    event.preventDefault();
    const title1 = event.target.form[0].value;
    const description1 = event.target.form[1].value;
    const imgurl1 = event.target.form[2].value;
    const title2 = event.target.form[5].value;
    const description2 = event.target.form[6].value;
    const imgurl2 = event.target.form[7].value;
    const title3 = event.target.form[10].value;
    const description3 = event.target.form[11].value;
    const imgurl3 = event.target.form[12].value;
    $.post(`/maps/${mapId[0]}`, {
      locations: JSON.stringify([
        {
          title: title1,
          description: description1,
          image_url: imgurl1,
          latitude: 49.282897,
          longitude: -123.120386
        },
        {
          title: title2,
          description: description2,
          image_url: imgurl2,
          latitude: 49.251970,
          longitude: -123.067680
        },
        {
          title: title3,
          description: description3,
          image_url: imgurl3,
          latitude: 49.263910,
          longitude: -123.098690
        }
      ])
    });
    loadUserMaps(1);
  });

  getLocations('#side-bar')

});
