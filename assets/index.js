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
      // add north arrow
      const NorthArrowControl = L.Control.extend({
        onAdd: function () {
          const container = L.DomUtil.create("div", "north-arrow-control");
          container.title = "North";
          container.setAttribute("role", "img");
          container.setAttribute("aria-label", "Map north arrow, pointing up");

          container.style.width = "44px";
          container.style.height = "54px";
          container.style.background = "white";
          container.style.border = "1px solid rgba(0,0,0,0.2)";
          container.style.borderRadius = "4px";
          container.style.display = "flex";
          container.style.alignItems = "center";
          container.style.justifyContent = "center";
          container.style.boxShadow = "0 1px 4px rgba(0,0,0,0.2)";
          container.style.userSelect = "none";
          container.style.cursor = "default";

          // SVG: filled arrow (half-white/half-black classic style) + bold "N"
          container.innerHTML = `
      <svg width="34" height="46" viewBox="0 0 34 46" xmlns="http://www.w3.org/2000/svg">
        <!-- Arrow: right half filled, left half outlined, like a compass rose -->
        <polygon points="17,2 24,26 17,21" fill="#222" />
        <polygon points="17,2 10,26 17,21" fill="#fff" stroke="#222" stroke-width="1"/>
        <line x1="17" y1="21" x2="17" y2="30" stroke="#222" stroke-width="1.5"/>
        <text x="17" y="43" text-anchor="middle"
              font-family="Arial, sans-serif" font-size="14" font-weight="700"
              fill="#222">N</text>
      </svg>
    `;

          // Prevent map drag/zoom when interacting with control
          L.DomEvent.disableClickPropagation(container);

          return container;
        },
        onRemove: function () {},
      });

      map.addControl(new NorthArrowControl({ position: "topright" }));
    // END - add north arrow
    