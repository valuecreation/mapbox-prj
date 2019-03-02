
mapboxgl.accessToken = 'pk.eyJ1IjoidmFsdWVjcmVhdGlvbiIsImEiOiJjanM0Z21xamQwNHRrM3lueXZrOHBxZmNmIn0.oF6cKsx1z4NzUNiJ7RTXNQ';

var map = new mapboxgl.Map({
    container: 'map', // container id
    //style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
    style: 'mapbox://styles/valuecreation/cjsrap48e5oyz1fseqkhv2r24',
    center: [138.915150, 37.033030],
    zoom: 5 // starting zoom
});

const japanGeoJsonURL = 'https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/japan.geojson';

const d37pxiJsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/Faas-selected/D37PXI.json";
const d61pxiJsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/Faas-selected/D61PXI.json";
const hm400JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/Faas-selected/HM400.json";
const pc138JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/Faas-selected/PC138.json";
const pc200JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/Faas-selected/PC200.json";
const pc350JsonURL = "https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/Faas-selected/PC350.json";


const getD37PXIPoints = (d37PXI) => {
  const mPoints = d37PXI.map((d, i) => turf.point([d.Location.Longitude, d.Location.Latitude], { datetime: d.Location.datetime, id: i }));
  return mPoints;
};

const getD61PXIPoints = (d61PXI) => {
  const mPoints = d61PXI.map((d, i) => turf.point([d.Location.Longitude, d.Location.Latitude], { datetime: d.Location.datetime, id: i }));
  return mPoints;
};

const getHM400Points = (hm400) => {
  const mPoints = hm400.map((d, i) => turf.point([d.Location.Longitude, d.Location.Latitude], { datetime: d.Location.datetime, id: i }));
  return mPoints;
};

const getPC138Points = (pc138) => {
  const mPoints = pc138.map((d, i) => turf.point([d.Location.Longitude, d.Location.Latitude], { datetime: d.Location.datetime, id: i }));
  return mPoints;
};

const getPC200Points = (pc200) => {
  const mPoints = pc200.map((d, i) => turf.point([d.Location.Longitude, d.Location.Latitude], { datetime: d.Location.datetime, id: i }));
  return mPoints;
};

const getPC350Points = (pc350) => {
  const mPoints = pc350.map((d, i) => turf.point([d.Location.Longitude, d.Location.Latitude], { datetime: d.Location.datetime, id: i }));
  return mPoints;
};

const japanToMap = (japan) => {
  map.addSource('japan',{
    type: 'geojson',
    data: japan,
  });
  map.addLayer({
    'id': 'japan-layer',
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
      }
    });
};

const featureCollectionToMap = (collection) => {
  map.addSource('collection', {
    type: 'geojson',
    data: collection,
    cluster: true,
    clusterRadius: 50
  });
  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'collection',
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
    source: "collection",
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
    source: "collection",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 15,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff"
    }
  });
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

  japanToMap(japan);
  featureCollectionToMap(collection);

  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
  }),'top-left');

  map.on('click', 'japan-layer', function (e) {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(e.features[0].properties.KEN + e.features[0].properties.SIKUCHOSON + " 人口 : " + e.features[0].properties.P_NUM)
      .addTo(map);
  });

  map.on('click', 'unclustered-point', function (e) {
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML("Datetime : " + e.features[0].properties.datetime)
      .addTo(map);
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
  