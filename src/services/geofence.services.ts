import { point } from "@turf/helpers";
import { GeoFenceEvent, VehicleState } from "../models/vehicleState.model";
import { Coordinate } from "../models/zone.model";
import { vehicleStore } from "../store/vehicle.store";
import { zoneIndex } from "../config/zones.geojson";
import { Feature, Polygon } from "geojson";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { computeEvent } from "../helpers/geo.utils";




export function processLocation(vehicleId:string,location:Coordinate):{updatedState:VehicleState,event:GeoFenceEvent} {
    
    const prevState  = vehicleStore.getVehicleState(vehicleId);
    const previousZone = prevState?.currentZoneId ?? null;
    
    const geopoint = point([location.longitude, location.latitude]);


    const candidates = zoneIndex.search(geopoint);

    let currentZoneId:string | null = null;

    for(const feature of candidates.features as Feature<Polygon>[]){
        if(booleanPointInPolygon(geopoint,feature)){
            currentZoneId = feature.properties!.id;
            break;
        }
    }
    
    const event:GeoFenceEvent = computeEvent(previousZone, currentZoneId);

    console.log(
        `[EVENT] Vehicle ${vehicleId} -> ${event} (prev: ${previousZone}, curr: ${currentZoneId})`
    );

    const newState: VehicleState = {
        vehicleId,
        currentZoneId,
        location,
        lastUpdated: new Date().toISOString()
    };

    vehicleStore.setVehicleState(newState);

    return {updatedState:newState,event:event}
}