import express from "express";
import tokenRouter from "./routes/token.route";
import priceRouter from "./routes/price.route";
import watchlistRouter from "./routes/watchlist.route";
import stockRouter from "./routes/stock.route";
import chartRouter from "./routes/chart.route";



const app = express();

app.use(express.json());

app.use("/api", tokenRouter);
app.use("/api", priceRouter);
app.use("/api", watchlistRouter);
app.use("/api", stockRouter);
app.use("/api", chartRouter);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "KOSPI-VIEW Backend Running"
  });
});

export default app;