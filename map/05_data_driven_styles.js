
mapboxgl.accessToken = 'pk.eyJ1IjoidmFsdWVjcmVhdGlvbiIsImEiOiJjanM0Z21xamQwNHRrM3lueXZrOHBxZmNmIn0.oF6cKsx1z4NzUNiJ7RTXNQ';

const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v9', // stylesheet location
    center: [140.5122, 37.2819],
    zoom: 8 // starting zoom
});

/************** Map Control *******************/
map.addControl(new mapboxgl.NavigationControl());

let scale = new mapboxgl.ScaleControl({
  maxWidth: 250,
  unit: 'metric'
});
map.addControl(scale);

// Store an array of quantiles
let max = 34615;
let fifth = 34615 / 5;
let quantiles = [];
for (i = 0; i < 5; i++) {
  let quantile = (i + 1) * fifth;
  quantiles.push(quantile);
}

// Create a popup, but don't add it to the map yet.
let popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

map.on('click', 'faas-point', function (e) {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "残燃料 : " + e.features[0].properties.FuelRemaining + " %" +
      "<br/> 燃料消費量 : " + e.features[0].properties.FuelUsed + " リットル" +
      "<br/> 燃料消費量 (24時間) : " + e.features[0].properties.FuelUsedLast24 + " リットル" +
      "<br/> Datetime : " + e.features[0].properties.datetime)
    .addTo(map);
});

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['faas-point']
  });
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
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
      id: 'faas-point',
      type: 'circle',
      source: 'faasData',
      paint: {
        'circle-color': '#D49A66',
        // Add data-driven styles for circle radius
        'circle-radius': {
          property: 'FuelUsed',
          type: 'exponential',
          stops: [
            [124, 2],
            [34615, 10]
          ]
        },
        'circle-opacity': 0.8
      }
    });

    // By default, exponential property functions have a base of 1.
    // Exponential functions with a base of 1 are linear.
    // The relationship between the radius of any point and the number of pedestrians is:
    // radius = rateOfChange * numberOfPedestrians + radiusAtZero
    let minRadius = 2;
    let maxRadius = 10;
    let minPedestrians = 124;
    let maxPedestrians = 34615;

    // Find the rateOfChange using two points
    let rateOfChange = (maxRadius - minRadius) / (maxPedestrians - minPedestrians);

    // Use the rateOfChange to solve for for radiusAtZero
    // radius = rateOfChange * numberOfPedestrians + radiusAtZero
    let radiusAtZero = maxRadius - (rateOfChange * maxPedestrians);

    let legend = document.getElementById('legend');

    function circleSize(quantile) {
      let radius = (rateOfChange * quantile) + radiusAtZero;
      let diameter = radius * 2;
      return diameter;
    }
    quantiles.forEach(function (quantile) {
      legend.insertAdjacentHTML('beforeend', '<div><span style="width:' + circleSize(quantile) + 'px;height:' + circleSize(quantile) + 'px;margin: 0 ' + [(20 - circleSize(quantile)) / 2] + 'px"></span><p>' + quantile + '</p></div>');
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
  