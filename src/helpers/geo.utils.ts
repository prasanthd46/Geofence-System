import { isPointInPolygon } from "geolib";
import { Coordinate } from "../models/zone.model";
import { zones } from "../config/zones";

export function isCoordinateInZone(point: Coordinate, coordinate: Coordinate[]): boolean {
    return isPointInPolygon(point,coordinate);
}

export function computeEvent(
  prev: string | null,
  curr: string | null
): "ENTER" | "EXIT" | "ZONE_CHANGE" | "NO_CHANGE" {

  if (prev === null && curr !== null) return "ENTER";
  if (prev !== null && curr === null) return "EXIT";
  if (prev !== null && curr !== null && prev !== curr) return "ZONE_CHANGE";

  return "NO_CHANGE";
}


export function isValidLatLon(lat: number, lon: number): boolean {
  return (lat >= -90 && lat <= 90) && (lon >= -180 && lon <= 180);
}

export function getZoneNameById(zoneId: string): string | null {
    const zone = zones.find(z => z.id === zoneId);
    return zone ? zone.name : null;
} 
