// Leaflet Challenge JS Logic

// Create the 'basemap' tile layer that will be the background of our map.
const streetTile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const streetAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
let streetLayer = L.tileLayer(streetTile, {attribution: streetAttr});

// Create the map object with center and zoom options.
let myMap = L.map('map', {
    center: [37.09, -95.71],
    zoom: 5
  }
);

// Then add the 'basemap' tile layer to the map.
streetLayer.addTo(myMap);

// Make a request that retrieves the earthquake geoJSON data.
const earthquake_API = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
d3.json(earthquake_API).then(data => {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {

  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {

  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {

  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: (feature, latlng) => {

    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: (feature, layer) => {

    }
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(map);

  // Create a legend control object.
  let legend = L.control({
    position: 'bottomright'
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend');

    // Initialize depth intervals and colors for the legend


    // Loop through our depth intervals to generate a label with a colored square for each interval.


    return div;
  };

  // Finally, add the legend to the map.

});
