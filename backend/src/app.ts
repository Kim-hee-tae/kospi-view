import express from "express";
import tokenRouter from "./routes/token.route";

const app = express();

app.use(express.json());

app.use("/api", tokenRouter);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "KOSPI-VIEW Backend Running"
  });
});

export default app;