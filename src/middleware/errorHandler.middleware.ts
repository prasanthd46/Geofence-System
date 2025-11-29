import { Response } from "express";

export function errorHandler(
  err: any,
  res: Response,
) {
  console.error(" ERROR:", err);

  res.status(500).json({
    error: "Internal server error",
    details: err?.message ?? null,
  });
}
