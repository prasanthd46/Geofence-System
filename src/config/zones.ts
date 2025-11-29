import { Zone } from "../models/zone.model";

export const zones: Zone[] = [
  {
    id: "zone1",
    name: "North Park",
    vertices: [
      { latitude: 12.971, longitude: 77.594 },
      { latitude: 12.976, longitude: 77.602 },
      { latitude: 12.968, longitude: 77.608 },
      { latitude: 12.963, longitude: 77.598 }
    ]
  },

  {
    id: "zone2",
    name: "Central District",
    vertices: [
      { latitude: 12.950, longitude: 77.580 },
      { latitude: 12.955, longitude: 77.590 },
      { latitude: 12.945, longitude: 77.595 },
      { latitude: 12.940, longitude: 77.585 }
    ]
  },

  {
    id: "zone3",
    name: "Lakeside Area",
    vertices: [
      { latitude: 12.980, longitude: 77.620 },
      { latitude: 12.985, longitude: 77.630 },
      { latitude: 12.973, longitude: 77.635 },
      { latitude: 12.968, longitude: 77.625 }
    ]
  },

  {
    id: "zone4",
    name: "West Industrial Zone",
    vertices: [
      { latitude: 12.960, longitude: 77.560 },
      { latitude: 12.965, longitude: 77.570 },
      { latitude: 12.955, longitude: 77.575 },
      { latitude: 12.950, longitude: 77.565 }
    ]
  }
];
