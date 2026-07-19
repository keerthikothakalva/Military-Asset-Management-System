import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import baseRoutes from "./routes/baseRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js"; 
import userRoutes from "./routes/userRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import transferRoutes from "./routes/transferRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import expenditureRoutes from "./routes/expenditureRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import openingBalanceRoutes from "./routes/OpeningBalanceRoutes.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://military-asset-management-system-e7zame5h7.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());

app.use("/api/bases", baseRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/expenditures", expenditureRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(
  "/api/opening-balances",
  openingBalanceRoutes
);

app.get("/",(req,res)=>{
    res.send("Military Asset ManagmentAPI is Running...");

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});