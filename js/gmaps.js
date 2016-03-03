function initMap(chart_data) {
  var map = new google.maps.Map(document.getElementById('parcours'), {
    zoom:5,
    center: {lat: chart_data['latitude'][3000][0], lng: chart_data['longitude'][3000][0]},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  var flightPlanCoordinates = Array();

console.log(chart_data['latitude'][1]);
    for (var i = 0; i < chart_data['longitude'].length; i++) {
      flightPlanCoordinates.push({'lng':chart_data['longitude'][i][0],'lat':chart_data['latitude'][i][0]});

    }
    console.log(flightPlanCoordinates[1]);
  

  

  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
  
}

function resizeMap(){
   google.maps.event.trigger(map, 'resize');
}
