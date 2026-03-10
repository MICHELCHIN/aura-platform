import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env["PORT"] || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    message: "✅ Backend de Aura funcionando!",
    timestamp: new Date().toISOString(),
    environment: process.env["NODE_ENV"] || "development"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Endpoint de prueba: http://localhost:${PORT}/api/health`);
});