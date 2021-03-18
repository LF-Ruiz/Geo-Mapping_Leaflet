//createMap function
// Create a map object
function createMap(earthquakes) {
    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [streetMap, earthquakes]
    });


    let streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11", //style id: https://docs.mapbox.com/api/maps/styles/
        accessToken: API_KEY
    })
    // .addTo(myMap);

    let overlayMaps = {
        Earthquakes: earthquakes
    }

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}

//createFeatures function
function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
}
function createCricle(earthquake) {
    // Create a circle and pass in some initial options
    L.circle([29.744, -95.461], { //lat and lon
        color: "green", //default
        fillColor: color, // depending on the depth, higher depth darker color
        fillOpacity: 0.75, // default
        radius: radius // depending on the magnitud, more magnitud, bigger.
    }).addTo(myMap);
}

// query url using d3.json
// visit https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php and select a dataset
let url = ' https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson ' //M2.5+ Earthquakes past 30 days

// Perform a GET request to the query URL
d3.json(url).then(data => {
    console.log(data)
    let features = data.features
    console.log(features)
    let coordinates = [], depth = [], magnitud = []
    features.forEach( earthquake => {
        let properties = earthquake.properties;
        let geometry = earthquake.geometry;
        coordinates.push([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]] );
        depth.push(earthquake.geometry.coordinates[2]); // if a number is negative, that means that the earthquake was in a mountain.
        magnitud.push(earthquake.properties.mag)

        
    })

    // get depth range

    // get magnitud range, minimun is 2.5 because of the dataset, if using Ritcher scale max is 14.
    console.log(coordinates)
    console.log(depth)
    console.log(magnitud)

    function radius(magnitud){
        switch (magnitud){
            case (magnitud > 10):
                return 500
                break;
            case (magnitud > 10):
                return 500
                break;
            case (magnitud > 10):
                return 500;
                break;
            case (magnitud > 10):
                return 500;
                break;
        }
         
    }
    //console.log(properties)
    // let coordsArray = features.map(earthquake => features.geometry.coordinates )
    // console.log(coordsArray)
    // Once we get a response, send the data.features object to the createFeatures function
    // createFeatures(data.features);
});

