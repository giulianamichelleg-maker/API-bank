import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import userRoutes from "./routes/users/userRoutes.js";
import accountsRoutes from "./routes/users/accountsRoutes.js";
import transactionRoutes from "./routes/users/transactionRoutes.js"
import adminRoutes from "./routes/admin/adminRoutes.js"
import authRoutes from "./routes/users/authRoutes.js";
import accountsAdminRoutes from "./routes/admin/accountsAdminRoutes.js";
import userAdminRoutes from "./routes/admin/userAdminRoutes.js";
import transactionsAdminRoutes from "./routes/admin/transactionAdminRoutes.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de BANCO com JWTfuncionando" });
});

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/accounts", accountsRoutes);

app.use("/transactions", transactionRoutes);

app.use("/admin", adminRoutes);

app.use("/users", userAdminRoutes);

app.use("/accounts", accountsAdminRoutes);

app.use("/transactions", transactionsAdminRoutes);









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