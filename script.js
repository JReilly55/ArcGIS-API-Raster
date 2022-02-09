require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/ImageryLayer",
        "esri/layers/support/RasterFunction"
      ], function (Map, MapView, ImageryLayer, RasterFunction) {

  // Got stuck on figuring out calculating NDVI.*//
  const imagePopupTemplate = {
          title: "Data from Landsat 8 satellite",
          content: `
            Rendered RGB values: <b>{Raster.ServicePixelValue} </b>
            <br>NDVI values: <b>{Raster.ItemPixelValue}</b> 
            `
        };
  
  const NDVI = new RasterFunction({
          functionName: "NDVI Colorized",
          description: "Normalized difference vegetation index (NDVI) computed as (b5 - b4) / (b5 + b4) on apparent reflectance.",
          variableName: "Raster"
  });
  
          var layer = new ImageryLayer({
          url:
            "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
            renderingRule: NDVI,
            format: "jpgpng",
            popupTemplate: imagePopupTemplate// server exports in either jpg or png format
        });

        var map = new Map({
          basemap: "gray-vector",
          layers: [layer]
        });

        var view = new MapView({
          container: "viewDiv",
          map: map,
          center: [-90, 37],
          zoom: 6,
          popup: {
            actions: []
          }
        });
      });
