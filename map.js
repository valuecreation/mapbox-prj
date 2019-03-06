
mapboxgl.accessToken = 'pk.eyJ1IjoidmFsdWVjcmVhdGlvbiIsImEiOiJjanM0Z21xamQwNHRrM3lueXZrOHBxZmNmIn0.oF6cKsx1z4NzUNiJ7RTXNQ';

const map = new mapboxgl.Map({
    container: 'map', // container id
    //style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
    style: 'mapbox://styles/valuecreation/cjsrap48e5oyz1fseqkhv2r24',
    center: [138.915150, 37.033030],
    zoom: 7, // starting zoom
    pitch: 50 // pitch in degrees
});

/************** Map Control *******************/
map.addControl(new mapboxgl.NavigationControl());

let scale = new mapboxgl.ScaleControl({
  maxWidth: 250,
  unit: 'metric'
});
map.addControl(scale);

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
});

map.addControl(geocoder, 'top-left');
/************** Map Control *******************/

// Create a popup, but don't add it to the map yet.
let popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

map.on('mousemove', 'japanLayer', function (e) {
  map.getCanvas().style.cursor = 'pointer';

  popup.setLngLat(e.lngLat)
    .setHTML(e.features[0].properties.KEN + e.features[0].properties.SIKUCHOSON + "<br> 人口 : " + e.features[0].properties.P_NUM +  "<br> 世帯数 : " + e.features[0].properties.H_NUM)
    .addTo(map);
});

map.on('mouseleave', 'japanLayer', function() {
  map.getCanvas().style.cursor = '';
  popup.remove();
});

map.on('mousemove', 'FassCluster', function (e) {
  popup.remove();
});

map.on('mousemove', 'FassLayer', function (e) {
  popup.remove();
});

map.on('mousemove', 'unclustered-point', function (e) {
  popup.remove();
});

map.on('click', 'FassCluster', function (e) {
  
  let features = map.queryRenderedFeatures(e.point, { layers: ['FassCluster'] });
  let clusterId = features[0].properties.cluster_id;
  map.getSource('cluster').getClusterExpansionZoom(clusterId, function (err, zoom) {
    if (err)
      return;
   
    map.easeTo({
      center: features[0].geometry.coordinates,
      zoom: zoom
    });

  });
});

map.on('click', 'unclustered-point', function (e) {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "残燃料 : " + e.features[0].properties.FuelRemaining +
      "<br/> 燃料使用量 : " + e.features[0].properties.FuelUsed + 
      "<br/> 燃料消費量 : " + e.features[0].properties.FuelConsumed +
      "<br/> Datetime : " + e.features[0].properties.datetime)
    .addTo(map);
});

map.on('click', 'FassLayer', function (e) {
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "残燃料 : " + e.features[0].properties.FuelRemaining +
      "<br/> 燃料使用量 : " + e.features[0].properties.FuelUsed + 
      "<br/> 燃料消費量 : " + e.features[0].properties.FuelConsumed +
      "<br/> Datetime : " + e.features[0].properties.datetime)
    .addTo(map);
});

// Listen for the `result` event from the MapboxGeocoder that is triggered when a user
// makes a selection and add a symbol that matches the result.
geocoder.on('result', function(ev) {
  map.getSource('single-point').setData(ev.result.geometry);
});

document.getElementById('listing-group').addEventListener('change', function(e) {

  let layerId = e.target.id;
  let layer = map.getLayer(layerId);

  if (layer.visibility === 'visible') {
    if (layerId == 'FassCluster') {
      map.setLayoutProperty('cluster-count', 'visibility', 'none');
      map.setLayoutProperty('unclustered-point', 'visibility', 'none');
    }
    map.setLayoutProperty(layer.id, 'visibility', 'none');
  } else {
    if (layerId == 'FassCluster') {
      map.setLayoutProperty('cluster-count', 'visibility', 'visible');
      map.setLayoutProperty('unclustered-point', 'visibility', 'visible');
    }
    map.setLayoutProperty(layer.id, 'visibility', 'visible');
  }

});

document.getElementById('slider').addEventListener('input', function(e) {
  let hour = parseInt(e.target.value);
  
  let filters = ['==', 'Hour', hour];
  map.setFilter('FassLayer', filters);

  // converting 0-23 hour to AMPM format
  let ampm = hour >= 12 ? 'PM' : 'AM';
  let hour12 = hour % 12 ? hour % 12 : 12;

  // update text in the UI
  document.getElementById('active-hour').innerText = hour12 + ampm;

});

let japanGeoJsonURL = 'https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/japan.geojson';
// Faas Data
let d37pxiJsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/D37PXI.json";
let d61pxiJsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/D61PXI.json";
let hm400JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/HM400.json";
let pc138JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/PC138.json";
let pc200JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/PC200.json";
let pc350JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/faasData/PC350.json";

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
      'fill-opacity': 0.75,
      "fill-outline-color": "#fff"
    }
  });
};

const featureCollectionToMap = (collection) => {
  map.addSource('cluster', {
    type: 'geojson',
    data: collection,
    cluster: true,
    clusterRadius: 50
  });

  map.addSource('collection', {
    type: 'geojson',
    data: collection
  });

  map.addLayer({
    id: 'FassLayer',
    type: 'circle',
    source: 'collection',
    paint: {
      'circle-radius': [
        '/',
        ['-', 10, ['number', ['get', 'Hour'], 10]],
        0.5
      ],
      'circle-opacity': 0.6,
      'circle-color': "lime",
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff"
    }
  });

  map.addLayer({
    id: 'FassCluster',
    type: 'circle',
    source: 'cluster',
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6", 100,
        "#f1f075", 300,
        "#f28cb1"
        ],
        "circle-radius": [
          "step",
          ["get", "point_count"],
          20, 100, 30, 300, 40
        ]
    }
  });

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "cluster",
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
    source: "cluster",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 10,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff"
    }
  });

  map.setLayoutProperty('FassCluster', 'visibility', 'none');
  map.setLayoutProperty('cluster-count', 'visibility', 'none');
  map.setLayoutProperty('unclustered-point', 'visibility', 'none');

};

const handleGetData = (err, japan, d37PXI, d61PXI, hm400, pc138, pc200, pc350) => {

  let d37PXIPoints = getD37PXIPoints(d37PXI);
  let d61PXIPoints = getD37PXIPoints(d61PXI);
  let hm400Points = getD37PXIPoints(hm400);
  let pc138Points = getD37PXIPoints(pc138);
  let pc200Points = getD37PXIPoints(pc200);
  let pc350Points = getD37PXIPoints(pc350);

  let result_concat = d37PXIPoints.concat(d61PXIPoints);
  result_concat = result_concat.concat(hm400Points);
  result_concat = result_concat.concat(pc138Points);
  result_concat = result_concat.concat(pc200Points);
  result_concat = result_concat.concat(pc350Points);

  let collection = turf.featureCollection(result_concat);

  collection.features = collection.features.map(function(d) {
    d.properties.Hour = Math.floor( Math.random() * 24 );
    return d;
  });

  japanToMap(japan);
  featureCollectionToMap(collection);

  map.addSource('single-point', {
    "type": "geojson",
    "data": {
    "type": "FeatureCollection",
      "features": []
    }
  });
   
  map.addLayer({
    "id": "point",
    "source": "single-point",
    "type": "circle",
    "paint": {
      "circle-radius": 10,
      "circle-color": "#007cbf"
    }
  });

}

d3.queue()
  .defer(d3.json, japanGeoJsonURL)
  .defer(d3.json, d37pxiJsonURL)
  .defer(d3.json, d61pxiJsonURL)
  .defer(d3.json, hm400JsonURL)
  .defer(d3.json, pc138JsonURL)
  .defer(d3.json, pc200JsonURL)
  .defer(d3.json, pc350JsonURL)
  .await(handleGetData);
  