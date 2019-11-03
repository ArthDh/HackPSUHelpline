function placeMarker(map, person) {

    console.log(person);
    // var icon_person = '<i class="fas fa-user-md"></i>';

    // if(person.type == 'requesters')
    // {
    //     icon_person = '<i class="fas fa-star-of-life"></i>';
    // }

    var marker = new google.maps.Marker({
            position: {'lng': Number(person.lat), 'lat': Number(person.lng)},
            map: map
          });

      var infowindow = getInfoWindow(person);

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

}

function getInfoWindow(person) {
    var content = '<div class="infowindow">'+
              '<p>'+
              person.first_name +" "+ person.last_name +"<br>"+
              person.phone +" "+ person.email +"<br>"+
              '</p>'
              '</div>';
    if(person.type == 'requesters')
    {
          var content = '<div class="infowindow">'+
              '<p>'+
              person.username +
              '</p>' +
              '<p>' +
               person.message +
              '</p>' +
              '<button onclick="respond()">Respond!</button>'+
              '</div>';
    }
  var infowindow = new google.maps.InfoWindow({content: content});
  return infowindow;
}

function respond() {

// TODO
// Change the persons status to serviced - change status

}


function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}
