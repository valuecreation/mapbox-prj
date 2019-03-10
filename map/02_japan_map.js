
mapboxgl.accessToken = 'pk.eyJ1IjoidmFsdWVjcmVhdGlvbiIsImEiOiJjanM0Z21xamQwNHRrM3lueXZrOHBxZmNmIn0.oF6cKsx1z4NzUNiJ7RTXNQ';

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

// Create a popup, but don't add it to the map yet.
let popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

map.on('mousemove', 'japanLayer', function (e) {
  map.getCanvas().style.cursor = 'pointer';

  popup.setLngLat(e.lngLat)
    .setHTML(e.features[0].properties.KEN + e.features[0].properties.SIKUCHOSON + "<br> 人口 : " + e.features[0].properties.P_NUM + "<br> 世帯数 : " + e.features[0].properties.H_NUM)
    .addTo(map);
});

map.on('mouseleave', 'japanLayer', function () {
  map.getCanvas().style.cursor = '';
  popup.remove();
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

const japanToMap = (japan) => {

    map.addSource('japan',{
      type: 'geojson',
      data: japan,
    });
    map.addLayer({
      'id': 'japanLayer',
      'type': 'fill',
      'source': 'japan',
      'layout': {},
      'paint': {
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'P_NUM'],
          0, '#F2F12D',
          100, '#EED322',
          1000, '#E6B71E',
          5000, '#DA9C20',
          10000, '#CA8323',
          50000, '#B86B25',
          100000, '#A25626',
          500000, '#8B4225',
          1000000, '#723122'
        ],      
        'fill-opacity': 0.65,
        "fill-outline-color": "#fff"
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

const handleGetData = (err, japan, d37PXI, d61PXI, hm400, pc138, pc200, pc350, d6n, d6r, zh200, zh470) => {

    // 建機位置情報
    let d37PXIPoints = getD37PXIPoints(d37PXI);
    let d61PXIPoints = getD37PXIPoints(d61PXI);
    let hm400Points = getD37PXIPoints(hm400);
    let pc138Points = getD37PXIPoints(pc138);
    let pc200Points = getD37PXIPoints(pc200);
    let pc350Points = getD37PXIPoints(pc350);

    let faasData = d37PXIPoints.concat(d61PXIPoints);
    faasData = faasData.concat(hm400Points);
    faasData = faasData.concat(pc138Points);
    faasData = faasData.concat(pc200Points);
    faasData = faasData.concat(pc350Points);

    let aasDataCollection = turf.featureCollection(faasData);

    // シガー
    let d6nPoints = getD6NPoints(d6n);
    let d6rPoints = getD6RPoints(d6r);
    let zh200Points = getZH200Points(zh200);
    let zh470Points = getZH470Points(zh470);

    let cigarData = d6nPoints.concat(d6rPoints);
    cigarData = cigarData.concat(zh200Points);
    cigarData = cigarData.concat(zh470Points);

    let cigarDataCollection = turf.featureCollection(cigarData);

    japanToMap(japan);
    faasToMap(faasDataCollection);
    cigarToMap(cigarDataCollection);

}

let japanGeoJsonURL = 'https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/japan.geojson';

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
  .defer(d3.json, japanGeoJsonURL)
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
  