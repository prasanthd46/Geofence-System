import express from "express";
import locationRoutes from "./routes/location.route";
import dotenv from "dotenv";
import { logger } from "./middleware/logger.middleware";
import { errorHandler } from "./middleware/errorHandler.middleware";
dotenv.config();
const app = express();


app.use(express.json());

app.use(logger);

app.get("/", (_req, res) => {
    res.json({ message: "Geofence Service Running" });
});

app.use("/api/location", locationRoutes);
app.use(errorHandler);

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`🚀 Geofence service running on port ${PORT}`);
});


export default app;
