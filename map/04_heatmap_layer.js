
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

map.on('click', 'cigar-point', function (e) {
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

const faasToMap = (faasData) => {

    map.addSource('faasData', {
      type: 'geojson',
      data: faasData
    });

    map.addLayer({
      "id": "faasData-heat",
      "type": "heatmap",
      "source": "faasData",
      "maxzoom": 9,
      "paint": {
        // Increase the heatmap weight based on frequency and property magnitude
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["get", "FuelUsed"],
          0, 0,
          6, 1
        ],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        "heatmap-intensity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0, 1,
          9, 3
        ],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0, "rgba(33,102,172,0)",
          0.2, "rgb(103,169,207)",
          0.4, "rgb(209,229,240)",
          0.6, "rgb(253,219,199)",
          0.8, "rgb(239,138,98)",
          1, "rgb(178,24,43)"
        ],
        // Adjust the heatmap radius by zoom level
        "heatmap-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0, 2,
          9, 20
        ],
        // Transition from heatmap to circle layer by zoom level
        "heatmap-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7, 1,
          9, 0
        ],
      }
    }, 'waterway-label');

    map.addLayer({
      "id": "faas-point",
      "type": "circle",
      "source": "faasData",
      "minzoom": 7,
      "paint": {
        // Size circle radius by earthquake magnitude and zoom level
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7, [
            "interpolate",
            ["linear"],
            ["get", "FuelUsed"],
            1, 1,
            6, 4
          ],
          16, [
            "interpolate",
            ["linear"],
            ["get", "FuelUsed"],
            1, 5,
            6, 50
          ]
        ],
        // Color circle by faasData FuelUsed
        "circle-color": [
          "interpolate",
          ["linear"],
          ["get", "FuelUsed"],
          1, "rgba(33,102,172,0)",
          2, "rgb(103,169,207)",
          3, "rgb(209,229,240)",
          4, "rgb(253,219,199)",
          5, "rgb(239,138,98)",
          6, "rgb(178,24,43)"
        ],
        "circle-stroke-color": "white",
        "circle-stroke-width": 1,
        // Transition from heatmap to circle layer by zoom level
        "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7, 0,
          8, 1
        ]
      }
    }, 'waterway-label');
};

const cigarToMap = (cigarData) => {

    map.addSource('cigarData', {
      type: 'geojson',
      data: cigarData,
    });

    map.addLayer({
      "id": "cigarData-heat",
      "type": "heatmap",
      "source": "cigarData",
      "maxzoom": 9,
      "paint": {
        // Increase the heatmap weight based on frequency and property magnitude
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["get", "Direction"],
          0, 0,
          6, 1
        ],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        "heatmap-intensity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0, 1,
          9, 3
        ],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0, "rgba(33,102,172,0)",
          0.2, "rgb(103,169,207)",
          0.4, "rgb(209,229,240)",
          0.6, "rgb(253,219,199)",
          0.8, "rgb(239,138,98)",
          1, "rgb(178,24,43)"
        ],
        // Adjust the heatmap radius by zoom level
        "heatmap-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0, 2,
          9, 20
        ],
        // Transition from heatmap to circle layer by zoom level
        "heatmap-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7, 1,
          9, 0
        ],
      }
    }, 'waterway-label');

    map.addLayer({
      "id": "cigar-point",
      "type": "circle",
      "source": "cigarData",
      "minzoom": 7,
      "paint": {
        // Size circle radius by cigarData Direction and zoom level
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7, [
            "interpolate",
            ["linear"],
            ["get", "Direction"],
            1, 1,
            6, 4
          ],
          16, [
            "interpolate",
            ["linear"],
            ["get", "Direction"],
            1, 5,
            6, 50
          ]
        ],
        // Color circle by cigarData Direction
        "circle-color": [
          "interpolate",
          ["linear"],
          ["get", "Direction"],
          1, "rgba(33,102,172,0)",
          2, "rgb(103,169,207)",
          3, "rgb(209,229,240)",
          4, "rgb(253,219,199)",
          5, "rgb(239,138,98)",
          6, "rgb(178,24,43)"
        ],
        "circle-stroke-color": "white",
        "circle-stroke-width": 1,
        // Transition from heatmap to circle layer by zoom level
        "circle-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7, 0,
          8, 1
        ]
      }
    }, 'waterway-label');
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
  