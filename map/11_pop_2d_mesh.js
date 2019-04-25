mapboxgl.accessToken = 'pk.eyJ1IjoidmFsdWVjcmVhdGlvbiIsImEiOiJjanM0Z21xamQwNHRrM3lueXZrOHBxZmNmIn0.oF6cKsx1z4NzUNiJ7RTXNQ';

const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/dark-v9',
  center: [139.657125, 35.661236],
  zoom: 10, // starting zoom
  pitch: 40
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

let hoveredStateId = null;

map.on("mousemove", "2DmeshLayer", function(e) {

  map.getCanvas().style.cursor = 'pointer';

  if (e.features.length > 0) {
      if (hoveredStateId) {
        map.setFeatureState({source: 'meshdata', id: hoveredStateId}, { hover: false});
      }
      hoveredStateId = e.features[0].layer.id;
      map.setFeatureState({source: 'meshdata', id: hoveredStateId}, { hover: true});
  }

  popup.setLngLat(e.lngLat)
    .setHTML(
      "<div><b>市区町村コード &nbsp;</b>" + e.features[0].properties.SHICODE + "</div>" + 
      "<div><b>2050年 総人口数（男女計）</b></div>" + 
      "<div>" + Math.round(e.features[0].properties.PT0_2050) + "人</div>")
    .addTo(map);

});
   
// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
map.on("mouseleave", "2DmeshLayer", function() {
  map.getCanvas().style.cursor = '';
  popup.remove();
  if (hoveredStateId) {
    map.setFeatureState({source: 'meshdata', id: hoveredStateId}, { hover: false});
  }
  hoveredStateId =  null;
});

let PT0_2050_1 = ["<", ["get", "PT0_2050"], 4000];
let PT0_2050_2 = ["all", [">=", ["get", "PT0_2050"], 4000], ["<", ["get", "PT0_2050"], 8000]];
let PT0_2050_3 = ["all", [">=", ["get", "PT0_2050"], 8000], ["<", ["get", "PT0_2050"], 12000]];
let PT0_2050_4 = ["all", [">=", ["get", "PT0_2050"], 12000], ["<", ["get", "PT0_2050"], 16000]];
let PT0_2050_5 = ["all", [">=", ["get", "PT0_2050"], 16000], ["<", ["get", "PT0_2050"], 20000]];
let PT0_2050_6 = ["all", [">=", ["get", "PT0_2050"], 20000], ["<", ["get", "PT0_2050"], 24000]];
let PT0_2050_7 = ["all", [">=", ["get", "PT0_2050"], 24000], ["<", ["get", "PT0_2050"], 28000]];
let PT0_2050_8 = ["all", [">=", ["get", "PT0_2050"], 28000], ["<", ["get", "PT0_2050"], 32000]];
let PT0_2050_9 = ["all", [">=", ["get", "PT0_2050"], 32000], ["<", ["get", "PT0_2050"], 36000]];
let PT0_2050_10 = ["all", [">=", ["get", "PT0_2050"], 36000], ["<", ["get", "PT0_2050"], 40000]];

let colors = ['rgb(215, 25, 28)',   'rgb(232, 91, 58)', 
              'rgb(249, 158, 89)',  'rgb(254, 201, 128)',
              'rgb(255, 237, 170)', 'rgb(237, 247, 201)',
              'rgb(199, 230, 219)', 'rgb(157, 207, 228)',
              'rgb(100, 165, 205)', 'rgb(44, 123, 182)'] 

const meshToMap = (meshdata) => {
 
  map.addSource('meshdata',{
    type: 'geojson',
    data: meshdata,
  });

  map.addLayer({
    'id': '2DmeshLayer',
    'type': 'fill',
    'source': 'meshdata',
    'layout': {},
    'paint': {
        "fill-color": 
          ["case",
            PT0_2050_1, colors[0],
            PT0_2050_2, colors[1],
            PT0_2050_3, colors[2],
            PT0_2050_4, colors[3], 
            PT0_2050_5, colors[4], 
            PT0_2050_6, colors[5], 
            PT0_2050_7, colors[6], 
            PT0_2050_8, colors[7], 
            PT0_2050_9, colors[8], 
            PT0_2050_10, colors[9], 
            colors[9]
          ],
        "fill-outline-color": "white",
        "fill-opacity": ["case",
              ["boolean", ["feature-state", "hover"], false],
              1,
              0.5
        ]
      }
  });

};

let meshGeoJsonURL = 'https://raw.githubusercontent.com/valuecreation/mapbox-prj/b014b62e2c4db92726ca35ca8ec9a52b2acd5f28/data/1km_mesh_2018_13.geojson';

const handleGetData = (err, meshdata) => {
  meshToMap(meshdata);
}

d3.queue()
  .defer(d3.json, meshGeoJsonURL)
  .await(handleGetData);

function updateTooltip({x, y, object}) {
  const tooltip = document.getElementById('tooltip');
  if (object) {
    tooltip.style.top = `${y}px`;
    tooltip.style.left = `${x}px`;
    tooltip.innerHTML = `
      <div><b>市区町村コード &nbsp;</b></div>
      <div><div>${object.properties.SHICODE}</div></div>
      <div><b>2050年 総人口数（男女計）</b></div>
      <div>${Math.round(object.properties.PT0_2050)}人</div>
      `;
  } else { 
    tooltip.innerHTML = '';
  }
}

