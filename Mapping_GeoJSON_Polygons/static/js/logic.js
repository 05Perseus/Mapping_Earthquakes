// Add console.log to check to see if our code is working.
console.log("workingSinglePoints");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [43.7,-79.3],
    zoom:11,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


let torontoHoods = "https://raw.githubusercontent.com/05Perseus/Mapping_Earthquakes/main/torontoNeighborhoods.json";

d3.json(torontoHoods).then(function(data){
    console.log(data);
    // create geojson level
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            layer
            .setStyle({
                color: "blue",
                weight:1,
                fillColor:"lightyellow"
            })            
            .bindPopup("<h3>Neighborhood: "+ feature.properties.AREA_NAME +"</h3>");
        }
    })
    .addTo(map);
});
