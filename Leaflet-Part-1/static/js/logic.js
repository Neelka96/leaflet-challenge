// Leaflet Challenge JS Logic

// Create the 'basemap' tile layer that will be the background of our map.
const streetTile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const streetAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
let streetLayer = L.tileLayer(streetTile, {attribution: streetAttr});

// Create the map object with center and zoom options.
let myMap = L.map('map', {
    center: [37.09, -95.71],
    zoom: 5,
    maxBounds: [
      [-170, -260],
      [170, 260]
    ]
  }
);

// Then add the 'basemap' tile layer to the map.
streetLayer.addTo(myMap);

// Make a request that retrieves the earthquake geoJSON data.
const earthquake_API = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
d3.json(earthquake_API).then(data => {

  // Function to automate rounding based on rounding function and digit placeholder #
  function rounder(value, trans_func, digits) {
    let tens = 0;
    if (digits >= 0) {
      tens = 10 ** digits;
      return trans_func(value / tens) * tens;
    }
    else {
      tens = 10 ** (digits * -1);
      return trans_func(value * tens) / tens;
    }
  };

  // Create an Color threshold switcher using rounded extremes and two end colors

  // Round extremes to nearest 10th using 
  let depth_extremes = d3.extent(data.features, feat => feat.geometry.coordinates[2]);
  let min = rounder(depth_extremes[0], Math.ceil, 1);
  let max;
  if (max < 200)
    max = rounder(depth_extremes[1], Math.floor, 1);
  else
    max = 120;
  
  // Round step length too and create domain for scale threshold
  const steps = 5;
  let length = rounder((max - min) / steps, Math.ceil, 1);
  let scale = [];
  let lastNum = min;
  for (let i = 0; i < steps; i++) {
    scale.push(lastNum);
    lastNum += length;
  };

  // Create range based of domain length (binning) using d3's hex interpolation
  const startColor = '#98ee00';
  const endColor = '#ea2c2c';
  const colorRange = d3.interpolateRgb(startColor, endColor);
  const colors = d3.quantize(colorRange, steps + 1);

  // Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius to be called in `styleInfo()`
  // This function determines the color of the marker based on the depth of the earthquake.
  const getColor = d3.scaleThreshold()
    .domain(scale)
    .range(colors);

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    let mag = magnitude ** 2.5;
    let min = 3;
    let max = 75;
    if (mag < min) mag = min
    else if (mag > max) mag = max
    return mag;
  };

  // This function returns the style data for each of the earthquakes we plot on
  // the map.
  function styleInfo(feature) {
    return {
      color: 'black',
      fillColor: getColor(feature.geometry.coordinates[2]),
      fillOpacity: 0.5,
      weight: 1,
      radius: getRadius(feature.properties.mag)
    }
  };

  // Add a GeoJSON layer to the earthquake layer once the file is loaded.
  L.geoJson(data, {

    // Turn each feature into a circleMarker on the map.
    pointToLayer: (_, latlng) => {
      return L.circleMarker(latlng);
    },

    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,

    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: (feature, layer) => {
      let mag = feature.properties.mag;
      let coords = feature.geometry.coordinates;
      return layer.bindPopup(
        `<h3>Magnitude: ${rounder(mag, Math.round, -3)}</h3>
        <h3>Depth: ${rounder(coords[2], Math.round, -3)} km</h3>
        <h3>Coords: ${rounder(coords[1], Math.round, -3)}, ${rounder(coords[0], Math.round, -3)}</h3>`
      );
    }
  }).addTo(myMap);

  // Create a legend control object.
  let legend = L.control({
    position: 'bottomright'
  });

  // Then add all the details for the legend
  legend.onAdd = () => {
    let div = L.DomUtil.create('div', 'info legend');

    // Loop through our depth intervals to generate a label with a colored square for each interval.
    div.innerHTML += 'Depth Legend<br>';
    div.innerHTML += `<i style="background: ${colors[0]}"></i> < ${scale[0]}<br>`;
    for (let i = 0; i < scale.length - 1; i++) {
      let depth = scale[i];
      let color = colors[i+1];
      div.innerHTML += `<i style="background: ${color}"></i> ${depth}-${scale[i+1]}<br>`;
    };
    div.innerHTML += `<i style="background: ${colors.at(-1)}"></i> > ${scale.at(-1)}`;

    return div;
  };

  // Finally, add the legend to the map.
  legend.addTo(myMap);
});