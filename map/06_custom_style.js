
mapboxgl.accessToken = 'pk.eyJ1IjoidmFsdWVjcmVhdGlvbiIsImEiOiJjanM0Z21xamQwNHRrM3lueXZrOHBxZmNmIn0.oF6cKsx1z4NzUNiJ7RTXNQ';

const map = new mapboxgl.Map({
    container: 'map', // container id
    style: {"version":8,"name":"Mapbox Style","metadata":{"mapbox:origin":"basic-template-v1","mapbox:autocomposite":true,"mapbox:type":"template","mapbox:sdk-support":{"js":"0.45.0","android":"6.0.0","ios":"4.0.0"}},"center":[-122.4080683594193,37.744170160022705],"zoom":10,"bearing":0,"pitch":0,"sources":{"mapbox-streets":{"url":"mapbox:\/\/mapbox.mapbox-streets-v7","type":"vector"}},"sprite":"mapbox:\/\/sprites\/examples\/cji3d7gpt1i8m2rn7l7w0vl99","glyphs":"mapbox:\/\/fonts\/examples\/{fontstack}\/{range}.pbf","layers":[{"id":"background","type":"background","layout":{},"paint":{"background-color":["interpolate",["linear"],["zoom"],5,"#a9b6ef",12,"#edf0fd"]}},{"layout":{},"filter":["==","class","national_park"],"type":"fill","source":"mapbox-streets","id":"national_park","paint":{"fill-color":"#e8f5ee","fill-opacity":["interpolate",["linear"],["zoom"],5,0,6,0.5]},"source-layer":"landuse_overlay"},{"layout":{},"filter":["in","class","hospital","park","pitch","school"],"type":"fill","source":"mapbox-streets","id":"landuse","paint":{"fill-color":"#e8f5ee","fill-opacity":["interpolate",["linear"],["zoom"],5,0,6,1]},"source-layer":"landuse"},{"minzoom":8,"layout":{"line-join":"round","line-cap":"round"},"filter":["all",["==","$type","LineString"],["in","class","canal","river"]],"type":"line","source":"mapbox-streets","id":"waterway","paint":{"line-color":"hsl(205, 76%, 70%)","line-width":["interpolate",["exponential",1.3],["zoom"],8.5,0.1,20,8],"line-opacity":["interpolate",["linear"],["zoom"],8,0,8.5,1]},"source-layer":"waterway"},{"id":"water","type":"fill","source":"mapbox-streets","source-layer":"water","layout":{},"paint":{"fill-color":"#314ccd"}},{"layout":{},"filter":["all",["==","$type","Polygon"],["in","type","helipad","runway","taxiway"]],"type":"fill","source":"mapbox-streets","id":"aeroway-polygon","paint":{"fill-color":"hsl(0, 0%, 77%)"},"source-layer":"aeroway"},{"layout":{},"filter":["all",["==","$type","LineString"],["in","type","runway","taxiway"]],"type":"line","source":"mapbox-streets","id":"aeroway-line","paint":{"line-width":["interpolate",["exponential",1.5],["zoom"],10,0.5,18,20],"line-color":"hsl(0, 0%, 77%)"},"source-layer":"aeroway"},{"minzoom":15,"layout":{},"filter":["all",["!=","type","building:part"],["==","underground","false"]],"type":"fill","source":"mapbox-streets","id":"building","paint":{"fill-color":["interpolate",["linear"],["zoom"],15,"hsla(211, 24%, 49%, 0)",16,"hsl(211, 24%, 49%)"],"fill-opacity":["interpolate",["linear"],["zoom"],15.5,0,16,1]},"source-layer":"building"},{"minzoom":14,"layout":{"line-join":"round","line-cap":"round"},"filter":["all",["==","$type","LineString"],["all",["!=","type","platform"],["in","class","path","pedestrian"]]],"type":"line","source":"mapbox-streets","id":"pedestrian-path","paint":{"line-width":["interpolate",["exponential",1.5],["zoom"],14,["match",["get","class"],"pedestrian",1,"path",0.75,0.75],20,["match",["get","class"],"pedestrian",8,"path",5,5]],"line-color":["match",["get","type"],"sidewalk","hsl(38, 35%, 80%)","crossing","hsl(38, 35%, 80%)","hsl(38, 28%, 70%)"]},"source-layer":"road"},{"layout":{"line-join":"round"},"filter":["all",["==","$type","LineString"],["all",["!=","type","service:parking_aisle"],["==","structure","tunnel"],["in","class","link","motorway","motorway_link","primary","secondary","service","street","street_limited","tertiary","track","trunk"]]],"type":"line","source":"mapbox-streets","id":"tunnel","paint":{"line-width":["interpolate",["exponential",1.5],["zoom"],5,["match",["get","class"],"motorway",0.5,"trunk",0.5,"primary",0.5,"secondary",0.01,"tertiary",0.01,"street",0,"street_limited",0,"motorway_link",0,"service",0,"track",0,"link",0,0],12,["match",["get","class"],"motorway",3,"trunk",3,"primary",3,"secondary",2,"tertiary",2,"street",0.5,"street_limited",0.5,"motorway_link",0.5,"service",0,"track",0,"link",0,0],18,["match",["get","class"],"motorway",30,"trunk",30,"primary",30,"secondary",24,"tertiary",24,"street",12,"street_limited",12,"motorway_link",12,"service",10,"track",10,"link",10,10]],"line-color":["match",["get","class"],"street","hsl(38, 100%, 98%)","street_limited","hsl(38, 100%, 98%)","service","hsl(38, 100%, 98%)","track","hsl(38, 100%, 98%)","link","hsl(38, 100%, 98%)","hsl(0, 0%, 100%)"],"line-dasharray":[0.2,0.2]},"source-layer":"road"},{"layout":{"line-join":"round","line-cap":"round"},"filter":["all",["==","$type","LineString"],["all",["!=","type","service:parking_aisle"],["!in","structure","bridge","tunnel"],["in","class","link","motorway","motorway_link","primary","secondary","service","street","street_limited","tertiary","track","trunk"]]],"type":"line","source":"mapbox-streets","id":"road","paint":{"line-width":["interpolate",["exponential",1.5],["zoom"],5,["match",["get","class"],"motorway",0.5,"trunk",0.5,"primary",0.5,"secondary",0.01,"tertiary",0.01,"street",0,"street_limited",0,"motorway_link",0,"service",0,"track",0,"link",0,0],12,["match",["get","class"],"motorway",3,"trunk",3,"primary",3,"secondary",2,"tertiary",2,"street",0.5,"street_limited",0.5,"motorway_link",0.5,"service",0,"track",0,"link",0,0],18,["match",["get","class"],"motorway",30,"trunk",30,"primary",30,"secondary",24,"tertiary",24,"street",12,"street_limited",12,"motorway_link",12,"service",10,"track",10,"link",10,10]],"line-color":["match",["get","class"],"street","hsl(38, 100%, 98%)","street_limited","hsl(38, 100%, 98%)","service","hsl(38, 100%, 98%)","track","hsl(38, 100%, 98%)","link","hsl(38, 100%, 98%)","hsl(0, 0%, 100%)"]},"source-layer":"road"},{"layout":{"line-join":"round"},"filter":["all",["==","$type","LineString"],["all",["!=","type","service:parking_aisle"],["==","structure","bridge"],["in","class","link","motorway","motorway_link","primary","secondary","service","street","street_limited","tertiary","track","trunk"]]],"type":"line","source":"mapbox-streets","id":"bridge-case","paint":{"line-width":["interpolate",["exponential",1.5],["zoom"],10,1,16,2],"line-color":"hsl(38, 48%, 86%)","line-gap-width":["interpolate",["exponential",1.5],["zoom"],5,["match",["get","class"],"motorway",0.5,"trunk",0.5,"primary",0.5,"secondary",0.01,"tertiary",0.01,"street",0,"street_limited",0,"motorway_link",0,"service",0,"track",0,"link",0,0],12,["match",["get","class"],"motorway",3,"trunk",3,"primary",3,"secondary",2,"tertiary",2,"street",0.5,"street_limited",0.5,"motorway_link",0.5,"service",0,"track",0,"link",0,0],18,["match",["get","class"],"motorway",30,"trunk",30,"primary",30,"secondary",24,"tertiary",24,"street",12,"street_limited",12,"motorway_link",12,"service",10,"track",10,"link",10,10]]},"source-layer":"road"},{"layout":{"line-join":"round","line-cap":"round"},"filter":["all",["==","$type","LineString"],["all",["!=","type","service:parking_aisle"],["==","structure","bridge"],["in","class","link","motorway","motorway_link","primary","secondary","service","street","street_limited","tertiary","track","trunk"]]],"type":"line","source":"mapbox-streets","id":"bridge","paint":{"line-width":["interpolate",["exponential",1.5],["zoom"],5,["match",["get","class"],"motorway",0.5,"trunk",0.5,"primary",0.5,"secondary",0.01,"tertiary",0.01,"street",0,"street_limited",0,"motorway_link",0,"service",0,"track",0,"link",0,0],12,["match",["get","class"],"motorway",3,"trunk",3,"primary",3,"secondary",2,"tertiary",2,"street",0.5,"street_limited",0.5,"motorway_link",0.5,"service",0,"track",0,"link",0,0],18,["match",["get","class"],"motorway",30,"trunk",30,"primary",30,"secondary",24,"tertiary",24,"street",12,"street_limited",12,"motorway_link",12,"service",10,"track",10,"link",10,10]],"line-color":["match",["get","class"],"street","hsl(38, 100%, 98%)","street_limited","hsl(38, 100%, 98%)","service","hsl(38, 100%, 98%)","track","hsl(38, 100%, 98%)","link","hsl(38, 100%, 98%)","hsl(0, 0%, 100%)"]},"source-layer":"road"},{"minzoom":2,"layout":{"line-join":"round","line-cap":"round"},"filter":["all",["==","maritime",0],[">=","admin_level",3]],"type":"line","source":"mapbox-streets","id":"admin-state-province","paint":{"line-dasharray":["step",["zoom"],["literal",[2,0]],7,["literal",[2,2,6,2]]],"line-width":["interpolate",["linear"],["zoom"],7,0.75,12,1.5],"line-opacity":["interpolate",["linear"],["zoom"],2,0,3,1],"line-color":["step",["zoom"],"hsl(0, 0%, 80%)",4,"hsl(0, 0%, 65%)"]},"source-layer":"admin"},{"minzoom":1,"layout":{"line-join":"round","line-cap":"round"},"filter":["all",["<=","admin_level",2],["==","disputed",0],["==","maritime",0]],"type":"line","source":"mapbox-streets","id":"admin-country","paint":{"line-color":"hsl(0, 0%, 50%)","line-width":["interpolate",["linear"],["zoom"],3,0.5,10,2]},"source-layer":"admin"},{"minzoom":1,"layout":{"line-join":"round"},"filter":["all",["<=","admin_level",2],["==","disputed",1],["==","maritime",0]],"type":"line","source":"mapbox-streets","id":"admin-country-disputed","paint":{"line-color":"hsl(0, 0%, 50%)","line-width":["interpolate",["linear"],["zoom"],3,0.5,10,2],"line-dasharray":[1.5,1.5]},"source-layer":"admin"},{"minzoom":12,"layout":{"text-size":["interpolate",["linear"],["zoom"],9,["match",["get","class"],"motorway",10,"trunk",10,"primary",10,"secondary",10,"tertiary",10,9],20,["match",["get","class"],"motorway",15,"trunk",15,"primary",15,"secondary",15,"tertiary",15,14]],"text-max-angle":30,"text-font":["Roboto Medium","Arial Unicode MS Regular"],"symbol-placement":"line","text-padding":1,"text-rotation-alignment":"map","text-pitch-alignment":"viewport","text-field":["get","name_en"]},"filter":["in","class","link","motorway","pedestrian","primary","secondary","street","street_limited","tertiary","trunk"],"type":"symbol","source":"mapbox-streets","id":"road-label","paint":{"text-color":"#ee4e8b","text-halo-color":"hsl(0, 0%, 100%)","text-halo-width":1},"source-layer":"road_label"},{"layout":{"text-line-height":1.1,"text-size":["interpolate",["linear"],["zoom"],10,11,18,13],"icon-image":["concat",["get","maki"],"-11"],"text-max-angle":38,"text-font":["Roboto Medium","Arial Unicode MS Regular"],"text-padding":2,"text-offset":[0,0.75],"text-anchor":"top","text-field":["get","name_en"],"text-max-width":8},"filter":["<=","scalerank",3],"type":"symbol","source":"mapbox-streets","id":"poi-label","paint":{"text-color":"#aab7ef","text-halo-color":"hsla(0, 0%, 100%, 0.75)","text-halo-width":1,"text-halo-blur":0.5,"icon-opacity":0},"source-layer":"poi_label"},{"layout":{"text-line-height":1.1,"text-size":["interpolate",["linear"],["zoom"],10,12,18,18],"icon-image":["step",["zoom"],["concat",["get","maki"],"-11"],13,["concat",["get","maki"],"-15"]],"text-font":["Roboto Medium","Arial Unicode MS Regular"],"text-padding":2,"text-offset":[0,0.75],"text-anchor":"top","text-field":["step",["zoom"],["get","ref"],14,["get","name_en"]],"text-max-width":9},"filter":["<=","scalerank",2],"type":"symbol","source":"mapbox-streets","id":"airport-label","paint":{"text-color":"#fff","text-halo-color":"#273d56","text-halo-width":1,"icon-opacity":0},"source-layer":"airport_label"},{"minzoom":12,"layout":{"text-field":["get","name_en"],"text-transform":"uppercase","text-letter-spacing":0.15,"text-max-width":8,"text-font":["Roboto Medium","Arial Unicode MS Regular"],"text-padding":3,"text-size":["interpolate",["linear"],["zoom"],12,11,16,16]},"maxzoom":15,"filter":["in","type","neighbourhood","suburb"],"type":"symbol","source":"mapbox-streets","id":"place-neighborhood-suburb-label","paint":{"text-halo-color":"hsl(0, 0%, 100%)","text-halo-width":1,"text-color":"#273d56"},"source-layer":"place_label"},{"minzoom":6,"layout":{"text-size":["interpolate",["linear"],["zoom"],5,["match",["get","type"],"town",9.5,8],16,["match",["get","type"],"town",20,16]],"text-font":["step",["zoom"],["literal",["Roboto Regular","Arial Unicode MS Regular"]],12,["match",["get","type"],"town",["literal",["Roboto Medium","Arial Unicode MS Regular"]],["literal",["Roboto Regular","Arial Unicode MS Regular"]]]],"text-max-width":7,"text-field":["get","name_en"]},"maxzoom":14,"filter":["in","type","hamlet","town","village"],"type":"symbol","source":"mapbox-streets","id":"place-town-village-hamlet-label","paint":{"text-color":"#314ccd","text-halo-blur":0.5,"text-halo-color":"#ffffff","text-halo-width":1},"source-layer":"place_label"},{"minzoom":1,"layout":{"text-size":["interpolate",["linear"],["zoom"],5,12,16,22],"text-font":["literal",["Roboto Medium","Arial Unicode MS Regular"]],"text-max-width":10,"text-field":["get","name_en"]},"maxzoom":14,"filter":["all",["!has","scalerank"],["==","type","city"]],"type":"symbol","source":"mapbox-streets","id":"place-city-label-minor","paint":{"text-color":"#314ccd","text-halo-blur":0.5,"text-halo-color":"#ffffff","text-halo-width":1.25},"source-layer":"place_label"},{"minzoom":1,"layout":{"text-size":["interpolate",["linear"],["zoom"],5,["step",["get","scalerank"],14,4,12],16,["step",["get","scalerank"],30,4,22]],"text-font":["step",["zoom"],["literal",["Roboto Medium","Arial Unicode MS Regular"]],10,["step",["get","scalerank"],["literal",["Roboto Bold","Arial Unicode MS Bold"]],5,["literal",["Roboto Medium","Arial Unicode MS Regular"]]]],"text-max-width":10,"text-field":["get","name_en"]},"maxzoom":14,"filter":["all",["==","type","city"],["has","scalerank"]],"type":"symbol","source":"mapbox-streets","id":"place-city-label-major","paint":{"text-color":"#fff","text-halo-blur":0.5,"text-halo-color":"#273d56","text-halo-width":1.25},"source-layer":"place_label"},{"minzoom":4,"layout":{"text-line-height":1.2,"text-size":["interpolate",["linear"],["zoom"],4,["step",["get","area"],8,20000,9,80000,10],9,["step",["get","area"],14,20000,18,80000,23]],"text-transform":"uppercase","text-font":["Roboto Condensed Bold","Arial Unicode MS Bold"],"text-padding":1,"text-field":["step",["zoom"],["step",["get","area"],["get","abbr"],80000,["get","name_en"]],5,["get","name_en"]],"text-letter-spacing":0.2,"text-max-width":6},"maxzoom":8,"type":"symbol","source":"mapbox-streets","id":"state-label","paint":{"text-color":"#ee4e8b","text-halo-width":1,"text-halo-color":"hsl(0, 0%, 100%)"},"source-layer":"state_label"},{"minzoom":1,"layout":{"text-field":["get","name_en"],"text-max-width":["interpolate",["linear"],["zoom"],0,5,3,6],"text-font":["step",["zoom"],["literal",["Roboto Medium","Arial Unicode MS Regular"]],4,["literal",["Roboto Bold","Arial Unicode MS Bold"]]],"text-size":["interpolate",["linear"],["zoom"],2,["step",["get","scalerank"],13,3,11,5,9],9,["step",["get","scalerank"],35,3,27,5,22]]},"maxzoom":8,"type":"symbol","source":"mapbox-streets","id":"country-label","paint":{"text-halo-width":1.5,"text-halo-color":"#134ccd","text-color":"#fff"},"source-layer":"country_label"}],"created":"2018-06-06T17:06:22.250Z","id":"cji3d7gpt1i8m2rn7l7w0vl99","modified":"2018-06-06T17:39:52.125Z","owner":"examples","visibility":"public","draft":false},
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

const faasToMap = (faasData) => {

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
        'circle-color': "#CAFF70",
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
      }
    });

    
};

const cigarToMap = (cigarData) => {

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
        'circle-color': "#e7ef60",
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
  