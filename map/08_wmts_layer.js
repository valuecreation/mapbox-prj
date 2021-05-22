
mapboxgl.accessToken = 'pk.eyJ1IjoidmFsdWVjcmVhdGlvbiIsImEiOiJja2swcm9pdWMwazk2MnB0ZzZ5NTVwMXAxIn0.9klPq_GB5cZ0lRZVdZR2_g';

const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
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

const countyLegendEl = document.getElementById('county-legend');

document.getElementById('listing-group').addEventListener('change', function(e) {
  let layerId = e.target.id;
  let layer = map.getLayer(layerId);
  if (layer.visibility === 'visible') {
    map.setLayoutProperty(layer.id, 'visibility', 'none');
  } else {
    map.setLayoutProperty(layer.id, 'visibility', 'visible');
  }
});

map.on('mousemove', 'FassLayer', function (e) {
  popup.remove();
});

map.on('mousemove', 'cigarLayer', function (e) {
  popup.remove();
});

map.on('click', 'FassLayer', function (e) {
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

map.on('click', 'cigarLayer', function (e) {
  map.getCanvas().style.cursor = 'pointer';
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "方向 : " + e.features[0].properties.Direction +
      "<br/> 動作中 : " + e.features[0].properties.InOperating + 
      "<br/> Datetime : " + e.features[0].properties.Datetime)
    .addTo(map);
});

const getD6NPoints = (d6N) => {
  let mPoints = d6N.map((d, i) => turf.point(
    [d.Location.Longitude, d.Location.Latitude], 
    { 
      Direction: d.Direction,
      InOperating: d.InOperating,
      Datetime: d.Datetime,
      id: i 
    }  
    ));
  return mPoints;
};

const getD6RPoints = (d6R) => {
  let mPoints = d6R.map((d, i) => turf.point(
    [d.Location.Longitude, d.Location.Latitude], 
    { 
      Direction: d.Direction,
      InOperating: d.InOperating,
      Datetime: d.Datetime,
      id: i 
    }  
    ));
  return mPoints;
};

const getZH200Points = (zH200) => {
  let mPoints = zH200.map((d, i) => turf.point(
    [d.Location.Longitude, d.Location.Latitude], 
    { 
      Direction: d.Direction,
      InOperating: d.InOperating,
      Datetime: d.Datetime,
      id: i 
    }  
    ));
  return mPoints;
};

const getZH470Points = (zH470) => {
  let mPoints = zH470.map((d, i) => turf.point(
    [d.Location.Longitude, d.Location.Latitude], 
    { 
      Direction: d.Direction,
      InOperating: d.InOperating,
      Datetime: d.Datetime,
      id: i 
    }  
    ));
  return mPoints;
};

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

const wmtsLayerToMap = () => {

  map.addLayer({
    'id': 'wmts-layer',
    'type': 'raster',
      'source': {
        'type': 'raster',
        'tiles': [
          'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png'
        ],
        'tileSize': 256
      }
    });

};

const faasToMap = (faasData) => {

    if (map.getLayer('FassLayer')){
      map.removeLayer('FassLayer');
    }
  
    if (map.getSource('faasData')){
      map.removeSource('faasData');
    }

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

const cigarToMap = (cigarData) => {

    if (map.getLayer('cigarLayer')){
      map.removeLayer('cigarLayer');
    }

    if (map.getSource('cigarData')){
      map.removeSource('cigarData');
    }

    map.addSource('cigarData', {
      type: 'geojson',
      data: cigarData
    });

    map.addLayer({
      id: 'cigarLayer',
      source: 'cigarData',
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-opacity': 0.3,
        'circle-color': "red",
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
      }

    });

};

const handleGetData = (err, d37PXI, d61PXI, hm400, pc138, pc200, pc350, d6n, d6r, zh200, zh470) => {

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

    // シガー
    let d6nPoints = getD6NPoints(d6n);
    let d6rPoints = getD6RPoints(d6r);
    let zh200Points = getZH200Points(zh200);
    let zh470Points = getZH470Points(zh470);

    let cigarData = d6nPoints.concat(d6rPoints);
    cigarData = cigarData.concat(zh200Points);
    cigarData = cigarData.concat(zh470Points);

    let cigarDataCollection = turf.featureCollection(cigarData);

    wmtsLayerToMap();
    faasToMap(faasDataCollection);
    cigarToMap(cigarDataCollection);

}


// Faas Data
let d37pxiJsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/D37PXI.json";
let d61pxiJsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/D61PXI.json";
let hm400JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/HM400.json";
let pc138JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/PC138.json";
let pc200JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/PC200.json";
let pc350JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/PC350.json";

// cigar Data
let d6nJsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/cigarData/D6N_data.canread.json";
let d6rJsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/cigarData/D6R_data.canread.json";
let zh200JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/cigarData/ZH200_data.canread.json";
let zh470JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/cigarData/ZX470.canread.json";

d3.queue()
  .defer(d3.json, d37pxiJsonURL)
  .defer(d3.json, d61pxiJsonURL)
  .defer(d3.json, hm400JsonURL)
  .defer(d3.json, pc138JsonURL)
  .defer(d3.json, pc200JsonURL)
  .defer(d3.json, pc350JsonURL)
  .defer(d3.json, d6nJsonURL)
  .defer(d3.json, d6rJsonURL)
  .defer(d3.json, zh200JsonURL)
  .defer(d3.json, zh470JsonURL)
  .await(handleGetData);
  
