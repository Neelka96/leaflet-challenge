// Leaflet Challenge JS Logic

// Create the 'basemap' tile layer that will be the background of our map.
const streetTile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const streetAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
let streetLayer = L.tileLayer(streetTile, {attribution: streetAttr});

// OPTIONAL: Step 2
// Create additional tile layers for backgrounds of the map

// Satellite Tile Layer
const satTile = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const satAttr = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USGS, AFRGC, Geoscience Australia, METI, GPF';
let satLayer = L.tileLayer(satTile, {attribution: satAttr});

// Topography Tile Layer
const topoTile = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
const topoAttr = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';
let topoLayer = L.tileLayer(topoTile, {attribution: topoAttr});

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

// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
// Add a control to the map that will allow the user to change which layers are visible.
let baseMaps = {
  'Street': streetLayer,
  'Satellite': satLayer,
  'Topography': topoLayer
};

let earthquakes = new L.LayerGroup();
let tectonic_plates = new L.LayerGroup();
let overlayMaps = {
  'Earthquakes': earthquakes,
  'Tectonic Plates': tectonic_plates
};
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// Default Visibility on Earthquake overlay
earthquakes.addTo(myMap);


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
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(overlayMaps['Earthquakes']);

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


  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  const tectonicPlates_API = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json';
  d3.json(tectonicPlates_API).then(plate_data => {
    
    // Save the geoJSON data, along with style information, to the tectonic_plates layer.
    let plate_geoJson = L.geoJson(plate_data, {
      style: () => {
        return {
          color: 'violet',
          weight: 3.5
        };
      }
    });
    let plate_interaction = L.geoJson(plate_data, {
      style: () => {
        return {
          color: 'transparent',
          weight: 30,
          opacity: 0
        };
      },
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.Name)
          return layer.bindPopup(`<h3>${feature.properties.Name}</h3>`);
      }
    });

    // Then add the tectonic_plates layer to the map.
    plate_geoJson.addTo(overlayMaps['Tectonic Plates']);
    plate_interaction.addTo(overlayMaps['Tectonic Plates']);
  });
});