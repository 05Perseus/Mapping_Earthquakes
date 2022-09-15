// Add console.log to check to see if our code is working.
console.log("workingSinglePoints");

// We create the tile layer that will be the background of our map.
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);
let baseMaps = {
    "Day Nav": day,
    "Night Nav": night
};

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [44.0,-80.0],
    zoom:3,
    layers: [night]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


let torontoData = "https://raw.githubusercontent.com/05Perseus/Mapping_Earthquakes/main/torontoRoutes.json";

d3.json(torontoData).then(function(data){
    console.log(data);
    // create geojson level
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            layer
            .setStyle({
                color: "lightyellow",
                weight:2
            })            
            .bindPopup("<h3>Airline: "+ feature.properties.airline +"</h3><hr><h4>Destination: "+ feature.properties.dst +"</h4>");
        }
    })
    .addTo(map);
});
