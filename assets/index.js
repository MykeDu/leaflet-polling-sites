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