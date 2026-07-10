# leaflet-polling-sites
Demonstrate how open source technologies can be used to create a simple location site map

## The question

Where are Election polling places and Election Districts located in Sparta TN (White County)?

## The data

- **White County Districts:** 8 polygons (Source: TN Open Data)
- **White County Polling Sites:** 8 points (Source: TN Open Data)
- License: TN Open Data Terms of Use
- All data in EPSG:4326

## Methodology

I followed the official Leaflet documention to layout a basic map.  The Getting started maps did not use external JavaScript (JS) or CSS files, which took me a little time to remove the inline JS and CSS.

## Findings

## How to run it

## What I learned

It has been a long time since I created a Leaflet map. I was not aware that Leaflet was expecting a coordinate reference system of EPSG:4326, which cause me confusion when I could not visualize layer when trying to add the geoJSON files to the map.  This was fustrating because I knew the geoJSON files rendered in QGIS and ArcGIS Pro.

Finding the voting districts was also fustrating.  I reached to a data reference on a static webmap that ultimate provided me with a shapefile.  

## Stack

- Leaflet
- GitHub
- geoJSON data
