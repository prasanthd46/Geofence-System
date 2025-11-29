# Geofence Tracking Service

A lightweight location-based geofencing service built for a taxi fleet.  
The system processes realtime GPS locations from vehicles, detects when they
cross geographic zone boundaries and allows querying the current zone for any vehicle.

This is a clean, minimal, production-style implementation focusing on:
- code quality
- correctness
- simplicity
- performance
- engineering judgment

---

## Features

-> Accept real-time GPS location updates  
-> Detect **ENTER**, **EXIT**, and **ZONE_CHANGE** events  
-> Query a vehicles current zone status  
-> Efficient polygon lookup using a spatial index (geojson-rbush)  
-> Structured project with clear separation of concerns  
-> Logging middleware for observability  
-> Global error handler for robustness  
-> Extensible & easy to maintain  

---

## Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **geojson-rbush** (spatial index for fast zone lookup)
- **Turf.js** (polygon operations)
- **In-memory store** for vehicle states

---

## Folder Structure

```
geofence-service/
│
├── src/
│   ├── config/
│   │   ├── zones.ts              # zone definitions
│   │   └── zones.geojson.ts      # geojson + spatial index
│   │
│   ├── controllers/
│   │   └── geofence.controller.ts
│   │
│   ├── services/
│   │   └── geofence.service.ts
│   │
│   ├── helpers/
│   │   └── geo.utils.ts
│   │
│   ├── models/
│   │   ├── zone.model.ts
│   │   └── vehicleState.model.ts
│   │
│   ├── middleware/
│   │   ├── logger.middleware.ts
│   │   └── errorHandler.middleware.ts
│   │
│   ├── routes/
│   │   └── geofence.routes.ts
│   │
│   ├── store/
│   │   └── vehicle.store.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## Setup Instructions

### Install dependencies
```bash
npm install
```

###  Create .env  
Copy `.env.example`:

```
PORT=3000
```

###  Start in development mode
```bash
npm run dev
```

###  Build & run production
```bash
npm run build
npm start
```

Service should now be running at:

```
http://localhost:3000
```

---

##  API Endpoints

### **1. Update vehicle location**  
**POST** `/api/location/update`

#### Sample Request Body:
```json
{
  "vehicleId": "v1",
  "latitude": 12.972,
  "longitude": 77.600
}
```

#### Sample Response:
```json
{
    "success": true,
    "data": {
        "updatedState": {
            "vehicleId": "v1",
            "currentZoneId": "zone1",
            "location": {
                "latitude": 12.972,
                "longitude": 77.6
            },
            "lastUpdated": "2025-11-29T18:26:14.580Z"
        },
        "event": "ENTER"
    }
}
```

---

### **2. Get vehicle zone status**  
**GET** `/api/location/vehicle/:vehicleId/status`

Example:
```
GET /api/location/vehicle/v1/status
```

#### Sample Response:
```json
{
    "success": true,
    "data": {
        "vehicleId": "v1",
        "currentZoneId": "zone1",
        "zone": "North Park",
        "lastLocation": {
            "latitude": 12.972,
            "longitude": 77.6
        },
        "lastUpdated": "2025-11-29T18:26:14.580Z"
    }
}
```

---

## Design Decisions

### **1. Why spatial index (geojson-rbush)?**
- A naive loop over all zones is **O(n)**
- Spatial index reduces lookup to **O(log n)**
- Scales to thousands of zones

### **2. Why separate controllers/services/helpers?**
- Keeps business logic organized
- Easier to test
- Cleaner architecture

---

## Edge Cases Handled

-> Vehicle starts outside zones  
-> Enter zone  
-> Exit zone  
-> Move inside zone  
-> Move between zones  
-> Invalid coordinates  
-> Missing fields  
-> Unknown vehicle  
-> No matching zone  

---

## Operational & Performance Considerations

- Logger middleware → Request visibility  
- Global error handler → Consistent errors  
- Spatial index → Minimal lookup overhead  
- JSON validation → Avoids malformed input  
- Efficient enough for real-time GPS updates  

---

## Improvements with More Time

### 🔹 Add Redis/Postgres
Store:
- vehicle states  
- history of zone events  
- replay movement  
So that system will be fault tolerant and can handle scale.

### 🔹 Add Kafka/SQS ingestion  
Scale to thousands of vehicle updates/second.

### 🔹 Add unit & integration tests  
Better reliability.

### 🔹 Add Prometheus metrics  
Track latency, throughput, error rates.

### 🔹 Add Dockerfile  
Portable deployment.

### 🔹 Add GPS noise smoothing  
Handle jittering location signals.

### 🔹 Add map visualization  
Better debugging experience.

---
