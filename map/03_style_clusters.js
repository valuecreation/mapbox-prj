
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

map.on('click', 'FaasCluster', function (e) {
  map.getCanvas().style.cursor = 'pointer';
  let features = map.queryRenderedFeatures(e.point, {
    layers: ['FaasCluster']
  });
  let clusterId = features[0].properties.cluster_id;
  map.getSource('faasData').getClusterExpansionZoom(clusterId, function (err, zoom) {
    if (err)
      return;

    map.easeTo({
      center: features[0].geometry.coordinates,
      zoom: zoom
    });

  });
});

map.on('click', 'cigarCluster', function (e) {
  map.getCanvas().style.cursor = 'pointer';
  let features = map.queryRenderedFeatures(e.point, {
    layers: ['cigarCluster']
  });
  let clusterId = features[0].properties.cluster_id;
  map.getSource('cigarData').getClusterExpansionZoom(clusterId, function (err, zoom) {
    if (err)
      return;

    map.easeTo({
      center: features[0].geometry.coordinates,
      zoom: zoom
    });

  });
});

map.on('click', 'unclustered-point', function (e) {
  map.getCanvas().style.cursor = 'pointer';
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "残燃料 : " + e.features[0].properties.FuelRemaining +
      "<br/> 燃料使用量 : " + e.features[0].properties.FuelUsed +
      "<br/> 燃料消費量 : " + e.features[0].properties.FuelConsumed +
      "<br/> Datetime : " + e.features[0].properties.datetime)
    .addTo(map);
});

map.on('click', 'cigar-unclustered-point', function (e) {
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
      FuelRemaining: d.FuelRemaining.Percent + "%",
      FuelUsed: d.FuelUsed.FuelConsumed,
      FuelConsumed: d.FuelUsedLast24.FuelConsumed, 
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
      FuelRemaining: d.FuelRemaining.Percent + "%",
      FuelUsed: d.FuelUsed.FuelConsumed,
      FuelConsumed: d.FuelUsedLast24.FuelConsumed, 
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
      FuelRemaining: d.FuelRemaining.Percent + "%",
      FuelUsed: d.FuelUsed.FuelConsumed,
      FuelConsumed: d.FuelUsedLast24.FuelConsumed, 
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
      FuelRemaining: d.FuelRemaining.Percent + "%",
      FuelUsed: d.FuelUsed.FuelConsumed,
      FuelConsumed: d.FuelUsedLast24.FuelConsumed, 
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
      FuelRemaining: d.FuelRemaining.Percent + "%",
      FuelUsed: d.FuelUsed.FuelConsumed,
      FuelConsumed: d.FuelUsedLast24.FuelConsumed, 
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
      FuelRemaining: d.FuelRemaining.Percent + "%",
      FuelUsed: d.FuelUsed.FuelConsumed,
      FuelConsumed: d.FuelUsedLast24.FuelConsumed, 
      datetime: d.Location.datetime,
      id: i
    }  
    ));
  return mPoints;
};

const faasToMap = (faasData) => {

    map.addSource('faasData', {
      type: 'geojson',
      data: faasData,
      cluster: true,
      clusterRadius: 50
    });

    map.addLayer({
      id: 'FaasCluster',
      type: 'circle',
      source: 'faasData',
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6", 100,
          "#f1f075", 750,
          "#f28cb1"
        ],
        "circle-radius": [
          "step",
          ["get", "point_count"],
          20, 100, 30, 750, 40
        ]
      }
    });

    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "faasData",
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
      }
    });

    map.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "faasData",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#11b4da",
        "circle-radius": 10,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
      }
    });    
};

const cigarToMap = (cigarData) => {

    map.addSource('cigarData', {
      type: 'geojson',
      data: cigarData,
      cluster: true,
      clusterRadius: 50
    });

    map.addLayer({
      id: 'cigarCluster',
      type: 'circle',
      source: 'cigarData',
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6", 100,
          "#f1f075", 750,
          "#f28cb1"
        ],
        "circle-radius": [
          "step",
          ["get", "point_count"],
          20, 100, 30, 750, 40
        ]
      }
    });

    map.addLayer({
      id: "cigar-cluster-count",
      type: "symbol",
      source: "cigarData",
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
      }
    });

    map.addLayer({
      id: "cigar-unclustered-point",
      type: "circle",
      source: "cigarData",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#11b4da",
        "circle-radius": 10,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
      }
    });
 
};

const handleGetData = (err, d37PXI, d61PXI, hm400, pc138, pc200, pc350, d6n, d6r, zh200, zh470) => {

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

    faasDataCollection = turf.featureCollection(faasData);

    // シガー
    let d6nPoints = getD6NPoints(d6n);
    let d6rPoints = getD6RPoints(d6r);
    let zh200Points = getZH200Points(zh200);
    let zh470Points = getZH470Points(zh470);

    let cigarData = d6nPoints.concat(d6rPoints);
    cigarData = cigarData.concat(zh200Points);
    cigarData = cigarData.concat(zh470Points);

    cigarDataCollection = turf.featureCollection(cigarData);

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
  