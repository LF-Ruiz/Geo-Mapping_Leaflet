// Store our API endpoint inside queryUrl
let earthquakesUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"
let platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
//  https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=+2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337
// Perform a GET request to the query URL
d3.json(earthquakesUrl).then(data => {
    let earthquakeData = data.features;
    
    d3.json(platesUrl).then(function(json) {
        let platesData = json.features
    });
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(earthquakeData, platesData);
    //preventDefault();
});

function createFeatures(earthquakeData, platesData) {

    // Create circle markers for each feature
    let depthArray = []
    let earthquakesMarkers = earthquakeData.map((feature) =>
        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            radius: radius(feature.properties.mag),
            stroke: true,
            color: black,
            opacity: 0.75,
            weight: 0.5,
            fill: true,
            fillColor: color(feature.geometry.coordinates[2]),
            fillOpacity: 0.75
        })
            .bindPopup(`Magnitud: ${feature.properties.mag} <br>
            ${feature.properties.place}<br>
            Date: ${new Date(feature.properties.time)}`),
            depthArray.push(feature.geometry.coordinates[2])
            
    )
    console.log(depthArray)
    // 
    let earthquakes = L.layerGroup(earthquakesMarkers)
    
    
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    

    // function onEachFeature(feature, layer) {
    //     layer.bindPopup("<h3>" + feature.properties.place +
    //         "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        // L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0], { //lat and lon
        //     color: "green", //default
        //     fillColor: color(depth), // depending on the depth, higher depth darker color
        //     fillOpacity: 0.75, // default
        //     radius: radius(magnitud) // depending on the magnitud, more magnitud, bigger.
        // }).addTo(myMap);
    // }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    // let earthquakes = L.geoJSON(earthquakeData, {
    //     onEachFeature: onEachFeature
    // });
        // create line function
    
    function platesLine(feature, layer) {
        L.polyLine(feature.geometry.coordinates)
    };
    let tectonicPlates = L.geoJSON(platesData, {
        onEachFeature: platesLine,
        style: {
            color: 'orange',
            opacity: 0.9
        }
    })

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes, tectonicPlates);
}

function createMap(earthquakes) {

    // Define maps
    let satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/satellite-v9",
        accessToken: API_KEY,
        "terrain": {
            "source": "mapbox-raster-dem",
            "exaggeration": 5,
        }
    });

    let streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 500,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    let lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });

    let outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/outdoors-v11",
        accessToken: API_KEY
    });

    let darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    let baseMaps = {
        "Satellite": satelliteMap,
        "Street Map": streetMap,
        "Light Map": lightMap,
        "Outdoors Map": outdoorsMap,
        "Dark Map": darkMap
    };

    // Create overlay object to hold our overlay layer
    let overlayMaps = {
        "Earthquakes": earthquakes,
        // "Tectonic Plates": tectonicPlates
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    let myMap = L.map("map", {
        center: [
            37.09, -95.71
            // 0,0
        ],
        zoom: 3,
        layers: [streetMap, earthquakes]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}

// Earthquake magnitud scale: => http://www.geo.mtu.edu/UPSeis/magnitude.html -- also --

// Ritcher Scale
// 2.5 or less	Usually not felt, but can be recorded by seismograph
// 2.5 to 5.4	Often felt, but only causes minor damage.
// 5.5 to 6.0	Slight damage to buildings and other structures.
// 6.1 to 6.9	May cause a lot of damage in very populated areas.
// 7.0 to 7.9	Major earthquake. Serious damage.
// 8.0 or greater	Great earthquake. Can totally destroy communities near the epicenter.


function radius (mag) {
    return mag * 10  
}

// if (mag < 5.5){
//     return mag * 5
// }
// else if (mag < 6.1) {
//     return 200
// }
// else if (mag < 7) {
//     return 300
// }
// else if (mag < 8) {
//     return 400
// }
// else {
//     return 500
// }
// Although the assignment asks me to make the color darker if the earthquake is deeper, 
// since the closer to the surface the more intense and dangerous is the earthquake, I've decided to invert that order. For more info: 
//https://www.usgs.gov/natural-hazards/earthquake-hazards/science/earthquake-magnitude-energy-release-and-shaking-intensity?qt-science_center_objects=0#qt-science_center_objects
// color scale from Color Brewer 2.0:  https://colorbrewer2.org/#type=sequential&scheme=YlGnBu&n=5
// https://www.usgs.gov/faqs/what-does-it-mean-earthquake-occurred-a-depth-0-km-how-can-earthquake-have-a-negative-depth?qt-news_science_products=0#qt-news_science_products

// #ffffcc
// #a1dab4
// #41b6c4
// #2c7fb8
// #253494
function color(depth){
    let color = ""
    if (depth < 5.5){
        return "#ffffcc"
    }
    else if (depth < 6.1) {
        return "#a1dab4"
    }
    else if (depth < 7) {
        return "#41b6c4"
    }
    else if (depth < 8) {
        return "#2c7fb8"
    }
    else {
        return "#253494"
    }
}