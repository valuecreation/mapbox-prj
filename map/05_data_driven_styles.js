
mapboxgl.accessToken = 'pk.eyJ1IjoidmFsdWVjcmVhdGlvbiIsImEiOiJjanM0Z21xamQwNHRrM3lueXZrOHBxZmNmIn0.oF6cKsx1z4NzUNiJ7RTXNQ';

const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v9', // stylesheet location
    center: [138.915150, 37.033030],
    zoom: 5, // starting zoom
});

/************** Map Control *******************/
map.addControl(new mapboxgl.NavigationControl());

let scale = new mapboxgl.ScaleControl({
  maxWidth: 250,
  unit: 'metric'
});
map.addControl(scale);

// Create a popup, but don't add it to the map yet.
let popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

map.on('click', 'faas-point', function (e) {
  map.getCanvas().style.cursor = 'pointer';
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "残燃料 : " + e.features[0].properties.FuelRemaining + " %" +
      "<br/> 燃料消費量 : " + e.features[0].properties.FuelUsed + " リットル" +
      "<br/> 燃料消費量 (24時間) : " + e.features[0].properties.FuelUsedLast24 + " リットル" +
      "<br/> Datetime : " + e.features[0].properties.datetime)
    .addTo(map);
});

const getD37PXIPoints = (d37PXI) => {
  let mPoints = d37PXI.map((d, i) => turf.point(
    [d.Location.Longitude, d.Location.Latitude], 
    { 
      FuelRemaining: d.FuelRemaining.Percent,
      FuelUsed: d.FuelUsed.FuelConsumed,
      FuelUsedLast24: d.FuelUsedLast24.FuelConsumed,
      datetime: d.Location.datetime,
      id: i 
    }  
    ));
  return mPoints;
};

const getD61PXIPoints = (d61PXI) => {
  let mPoints = d61PXI.map((d, i) => turf.point(
    [d.Location.Longitude, d.Location.Latitude],
    { 
      FuelRemaining: d.FuelRemaining.Percent,
      FuelUsed: d.FuelUsed.FuelConsumed,
      FuelUsedLast24: d.FuelUsedLast24.FuelConsumed,
      datetime: d.Location.datetime,
      id: i 
    }  
    ));
  return mPoints;
};

const getHM400Points = (hm400) => {
  let mPoints = hm400.map((d, i) => turf.point(
    [d.Location.Longitude, d.Location.Latitude], 
    { 
      FuelRemaining: d.FuelRemaining.Percent,
      FuelUsed: d.FuelUsed.FuelConsumed,
      FuelUsedLast24: d.FuelUsedLast24.FuelConsumed,
      datetime: d.Location.datetime,
      id: i 
    }  
    ));
  return mPoints;
};

const getPC138Points = (pc138) => {
  let mPoints = pc138.map((d, i) => turf.point(
    [d.Location.Longitude, d.Location.Latitude], 
    { 
      FuelRemaining: d.FuelRemaining.Percent,
      FuelUsed: d.FuelUsed.FuelConsumed,
      FuelUsedLast24: d.FuelUsedLast24.FuelConsumed,
      datetime: d.Location.datetime,
      id: i 
    }  
    ));
  return mPoints;
};

const getPC200Points = (pc200) => {
  let mPoints = pc200.map((d, i) => turf.point(
    [d.Location.Longitude, d.Location.Latitude],
    { 
      FuelRemaining: d.FuelRemaining.Percent,
      FuelUsed: d.FuelUsed.FuelConsumed,
      FuelUsedLast24: d.FuelUsedLast24.FuelConsumed,
      datetime: d.Location.datetime,
      id: i 
    }
    ));
  return mPoints;
};

const getPC350Points = (pc350) => {
  let mPoints = pc350.map((d, i) => turf.point(
    [d.Location.Longitude, d.Location.Latitude],
    { 
      FuelRemaining: d.FuelRemaining.Percent,
      FuelUsed: d.FuelUsed.FuelConsumed,
      FuelUsedLast24: d.FuelUsedLast24.FuelConsumed,
      datetime: d.Location.datetime,
      id: i
    }  
    ));
  return mPoints;
};

const faasToMap = (faasData) => {

    map.addSource('faasData', {
      type: 'geojson',
      data: faasData
    });

    map.addLayer({
      id: 'FassLayer',
      type: 'circle',
      source: 'faasData',
      paint: {
        'circle-radius': 10,
        'circle-opacity': 0.3,
        'circle-color': "blue",
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
      }
    });

};

const handleGetData = (err, d37PXI, d61PXI, hm400, pc138, pc200, pc350) => {

    // 建機位置情報
    let d37PXIPoints = getD37PXIPoints(d37PXI);
    let d61PXIPoints = getD61PXIPoints(d61PXI);
    let hm400Points = getHM400Points(hm400);
    let pc138Points = getPC138Points(pc138);
    let pc200Points = getPC200Points(pc200);
    let pc350Points = getPC350Points(pc350);

    let faasData = d37PXIPoints.concat(d61PXIPoints);
    faasData = faasData.concat(hm400Points);
    faasData = faasData.concat(pc138Points);
    faasData = faasData.concat(pc200Points);
    faasData = faasData.concat(pc350Points);

    let faasDataCollection = turf.featureCollection(faasData);

    faasToMap(faasDataCollection);

}

// Faas Data
let d37pxiJsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/D37PXI.json";
let d61pxiJsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/D61PXI.json";
let hm400JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/HM400.json";
let pc138JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/PC138.json";
let pc200JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/PC200.json";
let pc350JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/PC350.json";

d3.queue()
  .defer(d3.json, d37pxiJsonURL)
  .defer(d3.json, d61pxiJsonURL)
  .defer(d3.json, hm400JsonURL)
  .defer(d3.json, pc138JsonURL)
  .defer(d3.json, pc200JsonURL)
  .defer(d3.json, pc350JsonURL)
  .await(handleGetData);
  