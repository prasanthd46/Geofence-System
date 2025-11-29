import { Request, Response } from "express"
import { processLocation } from "../services/geofence.services";
import { Coordinate } from "../models/zone.model";
import { vehicleStore } from "../store/vehicle.store";
import { get } from "http";
import { getZoneNameById } from "../helpers/geo.utils";

export const updateLocation = (req: Request, res: Response) => {
  try {
    const { vehicleId, latitude, longitude } = req.body;

    if (!vehicleId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        error: "Invalid input: vehicleId (string), latitude (number), longitude (number) required.",
      });
    }
    
    const updatedState = processLocation(vehicleId, { latitude,longitude});

    return res.status(200).json({
      success:true,
      data:{
        ...updatedState,
      }
    });
  } catch (error) {
    console.error("Error in updateLocation:", error);
    return res.status(500).json({
      success:false,
      error: "Internal server error",
    });
  }
};

export const getVehicleStatus = (req: Request, res: Response) => {
  const { vehicleId } = req.params;

  if (!vehicleId) {
    return res.status(400).json({ success:false,error: "vehicleId is required" });
  }

  const state = vehicleStore.getVehicleState(vehicleId);

  if (!state) {
    return res.status(404).json({ success:false,error: "Vehicle not found" });
  }
  const zoneName = state?.currentZoneId ? getZoneNameById(state?.currentZoneId) : null;

  return res.status(200).json({
    success:true,
    data:{
        vehicleId,
        currentZoneId: state.currentZoneId,
        zone: zoneName,
        lastLocation: state.location,
        lastUpdated: state.lastUpdated
    }
  });
};

