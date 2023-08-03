var platform = new H.service.Platform({
    'apikey': 'xSRg7dV_QxWVD-UCVrPh1RavZqMHqW7bdGwfPj19sWA'
  });

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      zoom: 13.5,
      center: { lat: 55.67, lng: 12.59 }
    });

 const ui = H.ui.UI.createDefault(map, defaultLayers);

var mapEvents = new H.mapevents.MapEvents(map);

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position => {
    console.log(position);

let browserPosition = {lat:position.coords.latitiude, lng:position.coords.longitude};
let marker = new H.map.Marker(browserPosition, {icon:pos});
map.addObject(marker);
}
); 
} else {
  alert("Geolocation not supported");
}

map.addEventListener('tap', function(evt) {
  console.log(evt)
  console.log(evt.type, evt.currentPointer.type);
  if(evt.target instanceof H.map.Marker){
    var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
      content: evt.target.getData()
    });
    ui.addBubble(bubble);   
}

  else {

    let pointer = evt.currentPointer;
    let pointerPosition = map.screenToGeo(pointer.viewportX, pointer.viewportY);
    let pointerMarker = new H.map.Marker(pointerPosition);
    pointerMarker.setData('That is a good spot!');
    map.addObject(pointerMarker);
}
});

var behavior = new H.mapevents.Behavior(mapEvents);
