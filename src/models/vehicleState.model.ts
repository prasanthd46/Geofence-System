import { Coordinate } from "./zone.model";

export interface VehicleState {
  vehicleId: string;
  currentZoneId: string | null;
  location: Coordinate;
  lastUpdated: string;
}

export type  GeoFenceEvent = 
    "ENTER"|
    "EXIT"|
    "ZONE_CHANGE"|
    "NO_CHANGE"


