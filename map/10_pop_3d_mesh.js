
mapboxgl.accessToken = 'pk.eyJ1IjoidmFsdWVjcmVhdGlvbiIsImEiOiJjanM0Z21xamQwNHRrM3lueXZrOHBxZmNmIn0.oF6cKsx1z4NzUNiJ7RTXNQ';

const {DeckGL, GeoJsonLayer} = deck;
const COLOR_SCALE = [
  [215, 25, 28], // 0 - 4000
  [232, 91, 58], // 4000 - 8000
  [249, 158, 89], // 8000 - 12000
  [254, 201, 128], // 12000 - 16000
  [255, 237, 170], // 16000 - 20000
  [237, 247, 201], // 20000 - 24000
  [199, 230, 219], // 24000 - 28000
  [157, 207, 228], // 28000 - 32000
  [100, 165, 205], // 32000 - 36000
  [44, 123, 182] //  36000 - 40000
];

const geojsonLayer = new GeoJsonLayer({
    data: 'https://raw.githubusercontent.com/valuecreation/mapbox-prj/b014b62e2c4db92726ca35ca8ec9a52b2acd5f28/data/1km_mesh_2018_13.geojson',
    opacity: 0.3,
    stroked: false,
    filled: true,
    extruded: true,
    wireframe: true,
    fp64: true,
    getElevation: f => f.properties.PT0_2050,
    getFillColor: f => colorScale(f.properties.PT0_2050),
    getLineColor: [255, 255, 255],
    pickable: true,
    onHover: updateTooltip
});

new DeckGL({
    mapboxApiAccessToken: mapboxgl.accessToken,
    mapStyle: 'mapbox://styles/mapbox/dark-v9',
    latitude: 35.681236,
    longitude: 139.767125,
    zoom: 9,
    maxZoom: 16,
    pitch: 45,
    layers: [geojsonLayer]
});

function colorScale(x) {

  if (0 >= x && x < 4000) {
    return COLOR_SCALE[0];
  } else if (4000 >= x && x < 8000) {
    return COLOR_SCALE[1];
  } else if (8000 >= x && x < 8000) {
    return COLOR_SCALE[2];
  } else if (12000 >= x && x < 16000) {
    return COLOR_SCALE[3];
  } else if (16000 >= x && x < 20000) {
    return COLOR_SCALE[4];
  } else if (20000 >= x && x < 24000) {
    return COLOR_SCALE[5];
  } else if (24000 >= x && x < 28000) {
    return COLOR_SCALE[6];
  } else if (28000 >= x && x < 32000) {
    return COLOR_SCALE[7];
  } else if (32000 >= x && x < 36000) {
    return COLOR_SCALE[8];
  } else if (36000 >= x && x < 40000) {
    return COLOR_SCALE[9];
  } else if (40000 > x) {
    return COLOR_SCALE[9];
  }
}

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

