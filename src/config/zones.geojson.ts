import GeoJSONRbush from "geojson-rbush";
import { FeatureCollection, Polygon } from "geojson";
import { zones } from "./zones";

export const zonesGeoJSON: FeatureCollection<Polygon> = {
  type: "FeatureCollection",
  features: zones.map((z) => ({
    type: "Feature",
    properties: {
      id: z.id,
      name: z.name
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          ...z.vertices.map(v => [v.longitude, v.latitude]),
          [z.vertices[0].longitude, z.vertices[0].latitude] 
        ]
      ]
    }
  }))
};


export const zoneIndex = GeoJSONRbush();
zoneIndex.load(zonesGeoJSON);
