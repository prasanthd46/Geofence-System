import { Router } from "express";
import { getVehicleStatus, updateLocation } from "../controllers/geofence.controller";

const router = Router();


router.post("/update", updateLocation);
router.get("/vehicle/:vehicleId/status", getVehicleStatus);

export default router;
