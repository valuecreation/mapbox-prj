
mapboxgl.accessToken = 'pk.eyJ1IjoidmFsdWVjcmVhdGlvbiIsImEiOiJjanM0Z21xamQwNHRrM3lueXZrOHBxZmNmIn0.oF6cKsx1z4NzUNiJ7RTXNQ';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
    center: [139, 35], // starting position [lng, lat]
    zoom: 5 // starting zoom
});

const japanGeoJsonURL = 'https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/japan.geojson';
const macdonaldsJsonURL = 'https://raw.githubusercontent.com/valuecreation/mapbox-prj/master/data/mcdonalds_setana.json';

map.on('load', function () {

    map.addSource('japan', {
        type: 'geojson',
        data: japanGeoJsonURL,
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

    map.on('click', 'japan-layer', function (e) {
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(e.features[0].properties.KEN + e.features[0].properties.SIKUCHOSON + " 人口 : " + e.features[0].properties.P_NUM)
        .addTo(map);
    });

});

