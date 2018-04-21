function initMap(){

  lifemap = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 42.4075, lng: -71.1190} //Tufts university
  });

  geocoder = new google.maps.Geocoder();
}

function plotMap(latlngs) {
  
  
}

//<script src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBXyzKlmSZKd_R3le8xjYbtvO236NS5L2w"></script>
var delay = 50;

function plotNext(iter, locations) {
  geocoder.geocode({'address':locations[iter].place}, function (results,status){ 
    if (status == google.maps.GeocoderStatus.OK) {
      var pos = results[0].geometry.location;

      console.log(locations[iter].time)
      heatmap = new google.maps.visualization.HeatmapLayer({
        data: [{location: new google.maps.LatLng(pos.lat(), pos.lng()), weight:locations[iter].time}],
        map: lifemap
      });
  /*
        var marker = new google.maps.Marker({
          map: lifemap,
          position: pos
        });*/
    }
    else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
        iter--;
        delay++; 
    }
    recurse(+iter + 1, locations);
  });
}
 
function recurse(iter, locations) {
  //console.log(iter)
  if (iter < locations.length) {
    setTimeout('plotNext("'+iter+'",locations)', delay);
  } 
}

function getCoords(locations){
  recurse(0, locations);

}









