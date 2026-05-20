import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import accountsRoutes from "./routes/accountsRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import authRoutes from "./routes/authRoutes.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de BANCO funcionando" });
});

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/accounts", accountsRoutes);

app.use("/transactions", transactionRoutes);

app.use("/admin", adminRoutes);



const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(` Servidor rodando na porta ${PORT} `);
    });
  } catch (error) {
    console.log("Erro ao iniciar o servidor:", error.message);
  }
};

startServer();