function placeMarker(map, person) {

    // console.log(person);
    // var icon_person = '<i class="fas fa-user-md"></i>';

    // if(person.type == 'requesters')
    // {
    //     icon_person = '<i class="fas fa-star-of-life"></i>';
    // }

    var marker = new google.maps.Marker({
            position: {'lat': Number(person.lat), 'lng': Number(person.lng)},
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
    if(person.person_type == 'requesters')
    {
          var content = document.createElement('div');
          content.classList.add('infowindow');
          var p1 = document.createElement('p');
          p1.innerText = person.username;
          var p2 = document.createElement('p');
          p2.innerText = person.message;
          var bttn = document.createElement('button');
          bttn.innerHTML = "Respond";
          bttn.onclick = function () {
              respond(person.username);
              var fn = get_direction(new google.maps.LatLng(Number(person.lat), Number(person.lng)));

              navigator.geolocation.getCurrentPosition(fn);
          };
          content.appendChild(p1); content.appendChild(p2); content.appendChild(bttn);
    }
  var infowindow = new google.maps.InfoWindow({content: content});
  return infowindow;
}

function respond(requester) {
    var xmlHttp = new XMLHttpRequest();
    var url = '/api/respond?requester='+requester;
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
}


function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}
