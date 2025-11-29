import { VehicleState } from "../models/vehicleState.model";

class VehicleStore {
    private vehicles:Map<string, VehicleState> = new Map()

    getVehicleState(vehicleId: string): VehicleState | undefined {
        return this.vehicles.get(vehicleId);
    }

    setVehicleState(vehicleState: VehicleState): void {
        this.vehicles.set(vehicleState.vehicleId, vehicleState);
    }

    exists(vehicleId:string):boolean{
        return this.vehicles.has(vehicleId) 
    }
}

export const vehicleStore = new VehicleStore();