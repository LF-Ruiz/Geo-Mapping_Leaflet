# Geo-Mapping
   #### Objetive:
   - Build a map that shows earthquakes around the world using the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
   #### Solutions:
   [GitHub Repository](https://github.com/LF-Ruiz/leaflet-challenge) |-|
   [Deployed Page](https://lf-ruiz.github.io/leaflet-challenge/)

   #### Tools:
   - JavaScript:
      - Leaflet, D3.
   - HTML, CSS
#
## Leaflet
Leaflet is the library I'm using in this assignment. Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps. Leaflet is designed with simplicity, performance and usability in mind. It works efficiently across all major desktop and mobile platforms, can be extended with lots of plugins, has a beautiful, easy to use and well-documented API and a simple, readable source code.
#
## Assignment
Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.
#

## Level 1: Basic Visualization

### First task is to visualize an earthquake data set.

### 1. **Get your data set**
   Dataset extract from [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
   Dataset chosen [Earthquakes more than 2.5 in the las month](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson)


### 2. **Import & Visualize the Data**

   Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

   * Your data markers should reflect the magnitude of the earthquake by their size and  depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

      - For the radius size steps I've followed the [Ritcher Scale](http://www.geo.mtu.edu/UPSeis/magnitude.html) parameters to make sure the size reflects fairly the magnitud

      - For the color I've followed the [Earth's layers](https://en.wikipedia.org/wiki/Structure_of_Earth) to set the steps.
      I've extract the Color scale from [Color Brewer 2.0](https://colorbrewer2.org/#type=sequential&scheme=YlGnBu&n=5).
      I've decided to reverse the order of the color scale since the closer to the surface the more intense and dangerous is the earthquake, 
      so you are going to find that the less the depth of the earthquake the darker the color in the map. [More Information here](https://www.usgs.gov/natural-hazards/earthquake-hazards/science/earthquake-magnitude-energy-release-and-shaking-intensity?qt-science_center_objects=0#qt-science_center_objects)

   * Include popups that provide additional information about the earthquake when a marker is clicked.
   
   ![PopUp]('images/popUp.jpg')


   * Create a legend that will provide context for your map data.
   
   ![Legend]("./images/legend.jpg")


   Solutions:

   [GitHub](https://github.com/LF-Ruiz/leaflet-challenge/blob/main/Level1/static/js/level1.js) - [Deployed Page Level 1](https://lf-ruiz.github.io/leaflet-challenge/Level1/index.html)

   ![Level1](images/level1.jpg)
#
## Level 2: More Data (Optional)

The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it along side your original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>. Data source credit and recognition: Hugo Ahlenius, Nordpil and Peter Bird.

* Plot a second data set on our map.

* Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

* Add layer controls to our map.

   Solutions: [GitHub](https://github.com/LF-Ruiz/leaflet-challenge/blob/main/static/js/logic.js)-[Deployed Page Level 2](https://lf-ruiz.github.io/leaflet-challenge/)

![LevelTwoPicture](./images/level2.jpg)
#