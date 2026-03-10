"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = require("cors");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/api/health", (req, res) => {
    res.json({
        message: "✅ Backend de Aura funcionando!",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development"
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📝 Endpoint de prueba: http://localhost:${PORT}/api/health`);
});
//# sourceMappingURL=index.js.map