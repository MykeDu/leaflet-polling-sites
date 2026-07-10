      let map = L.map("mapid").setView([35.932335, -85.469837], 10);

      L.tileLayer("https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        attribution: "&copy; Google",
      }).addTo(map);

      var redIcon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      // Load GeoJSON via AJAX
      var precinctLayer = new L.GeoJSON.AJAX("assets/data/precincts.geojson", {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, { icon: redIcon });
        },
        onEachFeature: function (feature, layer) {
          // Optional: bind popup with feature properties
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(
              "site: " +
                feature.properties.name +
                "<br> address:" +
                feature.properties.address +
                "<br> Precinct: " +
                feature.properties.precint,
            );
          }
        },
        middleware: function (data) {
          // Optional: modify data before adding to map
          return data;
        },
      });
      precinctLayer.addTo(map);

      let districtLayer = new L.GeoJSON.AJAX("assets/data/spartaDistricts.geojson", {
        onEachFeature: function (feature, layer) {
          if (feature.properties) {
            layer.bindPopup("Name: " + feature.properties.NAME);
            // layer.bindPopup(
            //   Object.keys(feature.properties)
            //     .map(
            //       (key) =>
            //         `<strong>${key}:</strong> ${feature.properties[key]}`,
            //     )
            //     .join("<br>"),
            // );
          }
        },
      });
      districtLayer.addTo(map);

      // Add legend Control
      // Function to create the legend HTML
      function createLegend() {
        const legendHtml = `
        <div class="legend">
            <h3>Map Legend</h3>
            <div class="legend-item">
                <img src="assets/images/district-icon.png" alt="Districts" title="Sparta Districts">
                <span>District</span>
            </div>
            <div class="legend-item">
                <img src="assets/images/precinct-icon2.png" alt="Precinct" title="Sparta Polling Sites">
                <span>Precinct</span>
            </div>
            </div>
        </div>
    `;
        return legendHtml;
      }

      // Create a custom legend control
      const legendControl = L.Control.extend({
        onAdd: function (map) {
          // Create a div element for the control
          const div = L.DomUtil.create("div", "legend-control");
          // Add the legend HTML to the div
          div.innerHTML = createLegend();
          return div;
        },
        onRemove: function (map) {
          // Optional: Cleanup code when control is removed
        },
      });

      // Add the legend control to the map (position: top-right)
      map.addControl(new legendControl({ position: "topright" }));

      // TODO Add North Arrow