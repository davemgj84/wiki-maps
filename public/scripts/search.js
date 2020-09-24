function initMap() {
    const options = {
      zoom: 12,
      center: { lat: 49.259660, lng: -123.107220 }
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
    // console.log('places', places)
    //if we find that no other places were found meaning that the array is empty then we don't
    //want to do any other work with places.length:
    if(places.length === 0)
    return;
    //otherwise we want to continue on
    markers.forEach((currentMarker) => {
      //to get rid of the map reference within that market
      currentMarker.setMap(null); });
      // markers = [];
      // console.log('markers1:', markers)
      // console.log('places2', places)


    //coodrinate boundaries of a map
    const bounds = new google.maps.LatLngBounds();
    places.forEach(function (p) {
      if (!p.geometry) {
        return;
      }

      const markers = new google.maps.Marker({
        map: map,
        title: p.name,
        position: p.geometry.location,
        draggable:true
      })

      google.maps.event.addListener(markers, 'dragend', function () {
        console.log('new', markers.getPosition().lat())
        console.log('new', markers.getPosition().lng())
      })
      console.log('markers3:', markers)
      console.log('markers3:', markers.position.lat())
      console.log('markers3:', markers.position.lng())
      console.log('p:', p.formatted_address)

      if (p.geometry.viewport) {
        // Extends this bounds to contain the union of this and the given bounds.
        bounds.union(p.geometry.viewport);
      } else {
        bounds.extend(p.geometry.location)}



      });
      // adjust the viewport of the map
    map.fitBounds(bounds);
  })
}
