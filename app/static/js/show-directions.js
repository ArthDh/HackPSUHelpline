
function get_direction(destination){



  var directionsService = new google.maps.DirectionsService;
  var directionsRenderer = new google.maps.DirectionsRenderer({
    draggable: false,
    map: map,
  });

  directionsRenderer.addListener('directions_changed', function() {
    computeTotalDistance(directionsRenderer.getDirections());
  });

  return function(position) {
    console.log(position);
    var origin = {'lat': position.coords.latitude, 'lng': position.coords.longitude};
    console.log(origin);
    displayRoute(origin, destination, directionsService,
      directionsRenderer);
  };
}

function displayRoute(origin, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING',
    avoidTolls: true
  }, function(response, status) {
    if (status === 'OK') {
      display.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}
