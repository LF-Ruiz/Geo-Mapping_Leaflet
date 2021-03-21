// Store our API endpoint inside queryUrl
let earthquakesUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"
//  https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=+2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337

// Perform a GET request to the query URL
d3.json(earthquakesUrl).then(data => {
    // define earthquake Data
    let earthquakeData = data.features;
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(earthquakeData);
});

// Define a function we want to run once for each feature in the features array
function createFeatures(earthquakeData) {

    // Create circle markers for each feature using the map function

    let earthquakesMarkers = earthquakeData.map((feature) =>
        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            radius: radius(feature.properties.mag),
            stroke: true,
            color: color(feature.geometry.coordinates[2]),
            opacity: 1,
            weight: 0.5,
            fill: true,
            fillColor: color(feature.geometry.coordinates[2]),
            fillOpacity: 0.60
        })
            // Give each feature a popup describing the place and time of the earthquake
            .bindPopup(`<strong>Magnitud:</strong> ${feature.properties.mag} Ritcher||
            <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km <br>
            ${feature.properties.place}<br>
            Date: ${new Date(feature.properties.time)}<br>
            `)
            
    )
    // // Create a layer containing the features array on the earthquakeData object 
    let earthquakes = L.layerGroup(earthquakesMarkers);

    createMap(earthquakes);
}

function createMap(earthquakes) {
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    let myMap = L.map("map", {
        center: [
            // 37.09, -95.71
            15,0
        ],
        zoom: 3,
        layers: [earthquakes]
        
    });
    // Define maps
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
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
    }).addTo(myMap);

    
    

    // Set up the legend
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");
        let limits = [0, 10, 25, 50, 100];
        let colors = ['#253494','#2c7fb8', '#41b6c4', '#a1dab4','#ffffcc'];
        let labels = [];

        // Add min & max
        let legendInfo = "<h1>Depth</h1>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0]+' km'+ "</div>" +
            "<div class=\"max\">"  + ">"+ limits[limits.length - 1]+" km" + "</div>" +
            "</div>";

        div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);
};

// Earthquake magnitud scale: => http://www.geo.mtu.edu/UPSeis/magnitude.html -- also --

// Ritcher Scale
// 2.5 or less	Usually not felt, but can be recorded by seismograph
// 2.5 to 5.4	Often felt, but only causes minor damage.
// 5.5 to 6.0	Slight damage to buildings and other structures.
// 6.1 to 6.9	May cause a lot of damage in very populated areas.
// 7.0 to 7.9	Major earthquake. Serious damage.
// 8.0 or greater	Great earthquake. Can totally destroy communities near the epicenter.

// Create a function to get the magnitude
function radius(mag) {
    //return mag * 30000
    if (mag < 5.5) {
        return mag * 30000
    }
    else if (mag < 6.1) {
        return mag * 35000
    }
    else if (mag < 7) {
        return mag * 40000
    }
    else if (mag < 8) {
        return mag * 45000
    }
    else {
        return mag * 50000
    }
}


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

// define a function to get the color depending on the depth
// the steps are related to the Earth's crust layers https://en.wikipedia.org/wiki/Structure_of_Earth
function color(depth) {
    // let color = ""
    
    if (depth > 220) {
        return "#ffffcc"
    } // step 1: mantle, Mesospheric mantle
    else if (depth > 80) {
        return "#a1dab4"
    } // step 2: mantle, Asthenosphere
    else if (depth > 20) {
        return "#41b6c4"
    }// step 3: LID
    else if (depth > 10) {
        return "#2c7fb8"
    }// step 4: lower crust
    else {
        return "#253494"
    }// step 5: upper crust
}


// Luis Fernando Ruiz Lopez
// Rice University Data Analysis and Visualization Boot Camp